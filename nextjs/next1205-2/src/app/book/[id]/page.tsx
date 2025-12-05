import { Book } from "@/app/types/book";
import { notFound } from "next/navigation";
import React from "react";

type DetailPageProps = {
  params: Promise<{ id: number }>;
};

const DetailPage = async ({ params }: DetailPageProps) => {
  const { id } = await params;
  const res = await fetch(`http://localhost:4000/books/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  const book: Book = await res.json();

  return (
    <div className="max-w-3xl mx-auto py-10">
      <div className="mt-6 flex gap-8">
        <div className="shrink-0">
          <img
            src={book.coverImage}
            alt={book.title}
            width={240}
            height={360}
            className="rounded shadow-md object-cover"
          />
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <p className="text-sm text-gray-500">{book.category}</p>
          <h1 className="text-3xl font-bold">{book.title}</h1>
          <p className="text-gray-700">저자 : {book.author}</p>
          <p className="text-sm mb-2">평점 : {book.rating} / 5</p>
          <p className="font-semibold">
            {Number(book.price.amount).toLocaleString()}원
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {book.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block px-2 py-1 text-xs rounded bg-gray-100 text-gray-600"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-3">책 소개</h2>

        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: book.descriptionHtml }}
        />
      </div>
    </div>
  );
};

export default DetailPage;
