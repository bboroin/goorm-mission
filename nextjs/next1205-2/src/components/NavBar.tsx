import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <nav className="w-full flex justify-center gap-4 mt-4">
      <Link
        href="/"
        className="px-4 py-2 rounded border border-gray-300 hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:font-medium"
      >
        홈
      </Link>
      <Link
        href="/books"
        className="px-4 py-2 rounded border border-gray-300 hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:font-medium"
      >
        책 목록
      </Link>
      <Link
        href="/cart"
        className="px-4 py-2 rounded border border-gray-300 hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:font-medium"
      >
        장바구니
      </Link>
    </nav>
  );
};

export default NavBar;
