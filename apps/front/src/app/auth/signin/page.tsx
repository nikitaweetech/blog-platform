import Link from "next/link";


const SignInPage = () => {
  return (
    <div className="bg-white p-8 border rounded-md shadow-md w-96 flex flex-col justify-center items-center">
        <h1 className="text-center text-2xl font-bold mb-4">Sign In Page</h1>
        {/* Put Sign In Form here */}
        <Link href={"/auth/forgot"}>Forgot Your Password ?</Link>
    </div>
  );
};

export default SignInPage;