import React from "react";
import { BASE_URL } from "../constansts/api";
import { CartItem } from "../types/cart";
import { Book } from "../types/book";
import {
  removeItemCart,
  updateCartQuantity,
} from "../server-actions/cartActions";

const CartPage = async () => {
  const [cartRes, booksRes] = await Promise.all([
    fetch(`${BASE_URL}/cart`, { cache: "no-store" }),
    fetch(`${BASE_URL}/books`, { cache: "no-store" }),
  ]);

  const cart: CartItem[] = await cartRes.json();
  const books: Book[] = await booksRes.json();

  const items = cart.map((item) => {
    const book = books.find((b) => b.id === item.bookId)!;
    const price = Number(book.price.amount);
    const totalPrice = price * item.quantity;

    return { ...item, book, price, totalPrice };
  });

  const cartTotal = items.reduce((sum, item) => sum + item.totalPrice, 0);

  if (items.length === 0)
    return (
      <div className="p-6 text-center text-gray-600">
        장바구니가 비어 있습니다.
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">내 장바구니</h1>
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="border border-gray-300 rounded p-4 flex items-center justify-between"
          >
            <div>
              <p className="font-semibold">{item.book.title}</p>
              <p className="text-sm text-gray-500">저자 - {item.book.author}</p>
              <p className="text-sm font-semibold text-blue-800 mb-2">
                ₩ {item.price.toLocaleString()}
              </p>
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
                        border border-blue-300 text-blue-500
                        hover:bg-blue-100 active:bg-blue-200
                        transition-colors"
                  >
                    변경
                  </button>
                </div>
              </form>
              <form action={removeItemCart}>
                <input type="hidden" name="id" value={item.id} />
                <button
                  type="submit"
                  className="px-3 py-1 text-xs font-medium rounded-full
                     border border-red-300 text-red-500
                     hover:bg-red-100 active:bg-red-200
                     transition-colors"
                >
                  삭제
                </button>
              </form>
              <div className="text-sm text-gray-700 mt-1">
                합계{" "}
                <span className="font-semibold">
                  {item.totalPrice.toLocaleString()}원
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {/* 총 결제 금액 */}
      {items.length > 0 && (
        <div className="mt-8 border-t pt-4 flex items-center justify-between">
          <span className="text-sm text-gray-600">총 결제 금액</span>
          <span className="text-xl font-bold text-blue-600">
            {cartTotal.toLocaleString()}원
          </span>
        </div>
      )}
    </div>
  );
};

export default CartPage;
