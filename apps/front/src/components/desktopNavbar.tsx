"use client";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";

type Props = PropsWithChildren;

const DesktopNavBar = (props: Props) => {
  const [scrollPostion, setScrollPosition] = useState(0);

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  const pathName = usePathname();

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const isScrollDown = scrollPostion > 10;
  const isHome = pathName == "/";

  return (
    <nav
      className={cn(
        "hidden fixed transition-colors w-full z-50 top-0 text-white md:block",
        {
          "bg-white text-gray-700 shadow-md": isScrollDown || !isHome,
        }
      )}
    >
      <div className="w-full flex items-center justify-between px-4 py-4">
        {props.children}
      </div>
      <hr className="border-b border-gray-100 opacity-25" />
    </nav>
  );
};

export default DesktopNavBar;