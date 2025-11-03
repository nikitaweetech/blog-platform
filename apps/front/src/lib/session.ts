
import {jwtVerify, SignJWT} from 'jose'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
const secretKey=process.env.SECRET_KEY;
const encodedKey=new TextEncoder().encode(secretKey);
export type SessionUser={
    id?:string;
    name?:string;
    avatar?:string;
}
export type Session={
    user:SessionUser;
    accessToken:string;
}
export async function createSession(payload:Session) {
    const session=await new SignJWT(payload)
                .setProtectedHeader({alg:"HS256"})
                .setIssuedAt()
                .setExpirationTime('7d')
                .sign(encodedKey);

    const expiresAt=new Date(7*24*60*60*1000);
   (await cookies()).set("session",session,{
        httpOnly:true,
        secure:true,
        sameSite:"lax",
        expires:expiresAt,
        path:'/'
   })
}       

export async function getSession() {
    const cookie=(await cookies()).get("session")?.value;
    if(!cookie){
        return null;
    }
    try{
        const {payload}=await jwtVerify(cookie,encodedKey,{
            algorithms:["HS256"]
        })
        return payload as Session;
    }
    catch(err){
        console.error("Unable to find details");
        redirect('/auth/signin');
    }
}

export async function deleteSession() {
    ((await cookies()).delete("session"));
}