import React from "react";
import { Book } from "../types/book";
import Link from "next/link";

async function getBooks(): Promise<Book[]> {
  const res = await fetch("http://localhost:4000/books", {
    next: { revalidate: 10 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }
  return res.json();
}

export default async function ListPage() {
  const books = await getBooks();

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">책 목록</h1>
      <p className="text-gray-600 mb-6">
        일정 주기마다 최신 목록으로 갱신되는 책 리스트입니다.
      </p>

      <ul className="space-y-4">
        {books.map((book) => (
          <li
            key={book.id}
            className="border border-gray-300 rounded p-4 flex items-center justify-between"
          >
            <div>
              <h2 className="font-semibold">{book.title}</h2>
              <p className="text-sm text-gray-500">저자 - {book.author}</p>
            </div>
            <Link
              href={`/book/${book.id}`}
              className="px-3 py-1 text-sm rounded bg-gray-400 hover:bg-blue-600 text-white"
            >
              자세히 보기
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
