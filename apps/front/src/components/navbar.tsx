import Link from "next/link";
type Props = {};

const Navbar = (props: Props) => {
  return (
    <>
      <div className="flex-shrink-0">
        <h1 className="text-2xl font-bold">My Modern Blog</h1>
      </div>
      <div className="flex gap-2 [&>a]:py-2 [&>a]:px-4 [&>a]:transition [&>a]:rounded-md [&>a:hover]:text-sky-100 [&>a:hover]:bg-sky-500">
        <Link href="/">Blog</Link>
        <Link href="#about">About</Link>
        <Link href="#contact">Contact</Link>
      </div>
    </>
  );
};

export default Navbar;