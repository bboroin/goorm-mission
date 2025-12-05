import React from "react";
import { BASE_URL } from "../constansts/api";
import { Book } from "@/types/books";
import { removeItemCart, updateCartQuantity } from "../server-action";
import { CartItem } from "@/types/cart";

const CartPage = async () => {
  const [cartRes, booksRes] = await Promise.all([
    fetch(`${BASE_URL}/cart`, { cache: "no-store" }),
    fetch(`${BASE_URL}/books`, { cache: "no-store" }),
  ]);
  const cart: CartItem[] = await cartRes.json();
  const books: Book[] = await booksRes.json();

  const items = cart.map((item) => {
    const book = books.find((b) => Number(b.id) === Number(item.bookId));

    return {
      ...item,
      book,
    };
  });

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">장바구니</h1>

      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl shadow-sm bg-white"
          >
            {/* 책 이미지 */}
            <img
              src={item.book?.coverImage}
              alt={item.book?.title}
              className="w-24 h-32 object-cover rounded-md"
            />

            {/* 책 정보 */}
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{item.book?.title}</h2>
              <p className="text-gray-600 text-sm mb-1">{item.book?.author}</p>
            </div>

            <div className="flex flex-col items-end gap-3">
              {/* 수량 변경 */}
              <form
                action={updateCartQuantity}
                className="flex items-center gap-2"
              >
                <input type="hidden" name="id" value={item.id} />
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">수량</span>
                  <input
                    type="number"
                    name="quantity"
                    defaultValue={item.quantity}
                    min={1}
                    className="w-16 px-2 py-1 border rounded-lg text-sm text-center
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1 text-xs font-medium rounded-full
                      border border-blue-500 text-blue-600
                      hover:bg-blue-50 active:bg-blue-100
                      transition-colors"
                  >
                    변경
                  </button>
                </div>
              </form>

              {/* 삭제 버튼 */}
              <form action={removeItemCart}>
                <input type="hidden" name="id" value={item.id} />
                <button
                  type="submit"
                  className="px-3 py-1 text-xs font-medium rounded-full
                   border border-gray-300 text-gray-500
                   hover:bg-gray-100 active:bg-gray-200
                   transition-colors"
                >
                  삭제
                </button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartPage;
