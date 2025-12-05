"use server";

import { BASE_URL } from "./constansts/api";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Book } from "../types/books";

export async function getBooks() {
  const res = await fetch(`${BASE_URL}/books`, {
    cache: "no-store",
  });

  const data: Book[] = await res.json();
  return { data };
}

export async function addItemCart(formData: FormData) {
  const bookId = Number(formData.get("id"));
  const quantity = Number(formData.get("quantity"));
  console.log("bookId:", bookId, "quantity:", quantity);

  await fetch(`${BASE_URL}/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bookId, quantity }),
  });

  redirect("/cart");
}

export async function removeItemCart(formData: FormData) {
  const cartId = formData.get("id");
  await fetch(`${BASE_URL}/cart/${cartId}`, {
    method: "DELETE",
  });

  revalidatePath("/cart");
}
