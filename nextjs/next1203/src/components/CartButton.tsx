"use client";

import { Book } from "@/app/types/book";
import React from "react";

const CartButton = ({ book }: { book: Book }) => {
  const handleAdd = async () => {
    await fetch("http://localhost:4000/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });

    alert("장바구니에 담았습니다.");
  };

  return (
    <button
      onClick={handleAdd}
      className="px-3 py-1 text-sm rounded bg-gray-400 hover:bg-green-700 text-white"
    >
      장바구니
    </button>
  );
};

export default CartButton;
