import React from "react";
import { Book } from "../types/book";

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
    <div>
      <ul>
        {books.map((b) => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </div>
  );
}
