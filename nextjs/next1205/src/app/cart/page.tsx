import React from "react";
import { BASE_URL } from "../constansts/api";
import { Book } from "@/types/books";
import { removeItemCart, updateCartQuantity } from "../server-action";
import { CartItem } from "@/types/cart";
import Link from "next/link";

const CartPage = async () => {
  const [cartRes, booksRes] = await Promise.all([
    fetch(`${BASE_URL}/cart`, { cache: "no-store" }),
    fetch(`${BASE_URL}/books`, { cache: "no-store" }),
  ]);
  const cart: CartItem[] = await cartRes.json();
  const books: Book[] = await booksRes.json();

  const items = cart.map((item) => {
    const book = books.find((b) => Number(b.id) === item.bookId);
    const price = book ? Number(book.price.amount) : 0;
    const totalPrice = price * item.quantity;

    return {
      ...item,
      book,
      price,
      totalPrice,
    };
  });

  const cartTotal = items.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">장바구니</h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <p className="text-lg mb-2">장바구니가 비어있습니다.</p>
          <Link
            href="/"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm
                 hover:bg-blue-700 transition-colors"
          >
            책 보러 가기
          </Link>
        </div>
      ) : (
        <>
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
                  <p className="text-gray-600 text-sm mb-1">
                    {item.book?.author}
                  </p>
                  <p className="text-sm font-semibold text-gray-900 mb-2">
                    {item.price.toLocaleString()}원
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
                        border border-blue-500 text-blue-600
                        hover:bg-blue-50 active:bg-blue-100
                        transition-colors"
                      >
                        변경
                      </button>
                    </div>
                  </form>

                  <div className="text-sm text-gray-700 mt-1">
                    합계{" "}
                    <span className="font-semibold">
                      {item.totalPrice.toLocaleString()}원
                    </span>
                  </div>

                  {/* 삭제 버튼 */}
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
        </>
      )}
    </div>
  );
};

export default CartPage;
