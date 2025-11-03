"use server";

import { redirect } from "next/navigation";
import { fetchGraphQL } from "../fetchGraphQL";
import { CREATE_USER_MUTATION, SIGN_IN_MUTATION } from "../gqlQueries";
import { SignUpFormState } from "../types/formState";
import { SignUpFormSchema } from "../zodSchemas/signUpFormSchema";
import { print } from "graphql";
import { LoginInFormSchema } from "../zodSchemas/loginInFormSchema";
import { revalidatePath } from "next/cache";
import { createSession } from "../session";

export async function signUp(
  state: SignUpFormState,
  formData: FormData//Form Data is of Map type
): Promise<SignUpFormState> {
    const validatedFields=SignUpFormSchema.safeParse(Object.fromEntries(formData.entries()))
    if(!validatedFields.success){
      return {
        data: Object.fromEntries(formData.entries()),
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }
    const data = await fetchGraphQL(
      print(CREATE_USER_MUTATION),
      {
        input: {
          ...validatedFields.data,
        },
      }
    );
  
    if(data.errors) 
      return { 
        errors:{},
        data: Object.fromEntries(formData.entries()), 
        message: "Something went wrong" 
      };
    redirect("/auth/signin");
}

export async function signIn(state: SignUpFormState,formData: FormData):Promise<SignUpFormState>{
  const validatedFields=LoginInFormSchema.safeParse(Object.fromEntries(formData.entries()))
  if(!validatedFields.success){
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  const data = await fetchGraphQL(print(SIGN_IN_MUTATION), {
    input: {
      ...validatedFields.data,
    },
  });

  if(data.errors){
    return {
      errors: {},
      data: Object.fromEntries(formData.entries()),
      message: "Invalid Credentials",
    };
  }
  //create a session
  await createSession({
    user:{
      id:data.signIn.id ,
      name:data.signIn.name,
      avatar:data.signIn.avatar
    },
    accessToken:data.signIn.accessToken
  });
  revalidatePath("/");
  redirect("/");
}