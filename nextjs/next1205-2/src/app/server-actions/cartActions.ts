"use server";

import { Book } from "@/app/types/book";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { BASE_URL } from "../constansts/api";
import { CartItem } from "../types/cart";

export async function getBooks() {
  const res = await fetch(`${BASE_URL}/books`, {
    cache: "no-store",
  });

  const data: Book[] = await res.json();
  return { data };
}

export async function getCart() {
  const res = await fetch(`${BASE_URL}/cart`, { cache: "no-store" });
  return res.json();
}

// 추가
export async function addItemCart(formData: FormData) {
  const bookId = Number(formData.get("id"));
  const quantity = Number(formData.get("quantity"));

  // 현재 장바구니 가져오기
  const cart: CartItem[] = await getCart();

  // 이미 같은 bookId가 존재하는지 확인
  const existing = cart.find((item) => item.bookId === bookId);

  if (existing) {
    // 있으면 → 수량 누적해서 PATCH
    const newQuantity = existing.quantity + quantity;

    await fetch(`${BASE_URL}/cart/${existing.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: newQuantity }),
    });
  } else {
    // 없으면 → 새 아이템으로 POST
    await fetch(`${BASE_URL}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookId, quantity }),
    });
  }
  redirect("/cart");
}
