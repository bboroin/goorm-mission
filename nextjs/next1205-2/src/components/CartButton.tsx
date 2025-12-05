"use client";

import { addItemCart } from "@/app/server-actions/cartActions";
import { Book } from "@/app/types/book";
import React from "react";

const CartButton = ({ book }: { book: Book }) => {
  return (
    <form action={addItemCart}>
      <input type="hidden" name="id" value={book.id} />
      <input type="hidden" name="quantity" value={1} />
      <button
        type="submit"
        className="px-3 py-1 text-sm rounded bg-gray-400 hover:bg-green-700 text-white"
      >
        장바구니
      </button>
    </form>
  );
};

export default CartButton;
