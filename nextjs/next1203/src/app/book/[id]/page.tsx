import { Book } from "@/app/types/book";
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
    throw new Error("Failed to fetch book detail");
  }

  const book: Book = await res.json();

  return <div></div>;
};

export default DetailPage;
