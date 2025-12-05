import React from "react";
import { Book } from "../types/books";
import { addItemCart } from "../app/server-action";

const BookList = ({ books }: { books: Book[] }) => {
  return (
    <div className="mt-8 p-4">
      <h1 className="text-3xl font-bold mb-2">BookList</h1>
      <p className="text-gray-600 mb-8">개발 서적 목록입니다.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-3">
        {books.map((book) => (
          <div key={book.id} className="shadow-md p-4 ">
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-1">{book.title}</h2>
              <p className="text-sm text-gray-600 mb-2">{book.author}</p>
              <p className="text-sm text-gray-800">{book.description}</p>
            </div>

            <form
              action={addItemCart}
              className="mt-4 flex items-center justify-between gap-3"
            >
              <input type="hidden" name="id" value={book.id} />

              {/* 수량 입력 */}
              <input
                type="number"
                name="quantity"
                defaultValue={1}
                min={1}
                className="w-16 px-2 py-1 border rounded-lg text-sm text-center
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />

              {/* 장바구니 버튼 */}
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
