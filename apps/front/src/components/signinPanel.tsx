import Link from "next/link";

type Props = {};

const SignInPanel = (props: Props) => {
  return (
    <>
    <Link href={"/auth/signin"}>SignIn</Link>
    <Link href={"/auth/signup"}>SignUp</Link>
    </>
  );
};

export default SignInPanel;