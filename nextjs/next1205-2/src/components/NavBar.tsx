"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavBar = () => {
  const pathname = usePathname();

  const baseStyle =
    "px-4 py-2 rounded border border-gray-300 hover:bg-blue-300 hover:border-blue-300 hover:text-white hover:font-medium";

  const activeStyle =
    "px-4 py-2 rounded border border-blue-500 bg-blue-500 text-white font-medium";

  return (
    <nav className="w-full flex justify-center gap-4 mt-4">
      <Link href="/" className={pathname === "/" ? activeStyle : baseStyle}>
        홈
      </Link>

      <Link
        href="/books"
        className={pathname.startsWith("/books") ? activeStyle : baseStyle}
      >
        책 목록
      </Link>

      <Link
        href="/cart"
        className={pathname === "/cart" ? activeStyle : baseStyle}
      >
        장바구니
      </Link>
    </nav>
  );
};

export default NavBar;
