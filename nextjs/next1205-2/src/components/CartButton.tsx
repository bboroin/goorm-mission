"use client";

import { addItemCart } from "@/app/server-actions/cartActions";
import { Book } from "@/app/types/book";
import React from "react";

const CartButton = ({ book }: { book: Book }) => {
  return (
    <form
      action={addItemCart}
      className="mt-4 flex items-center justify-between gap-3"
    >
      <input type="hidden" name="id" value={book.id} />
      <input
        type="number"
        name="quantity"
        defaultValue={1}
        min={1}
        className="w-16 px-2 py-1 border rounded-lg text-sm text-center
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-1.5 text-sm font-medium rounded-full
               border border-blue-500 text-blue-600
               hover:bg-blue-50 active:bg-blue-100
               transition-colors"
      >
        장바구니
      </button>
    </form>
  );
};

export default CartButton;
