"use client";

import React, { useEffect, useState } from "react";
import { Book } from "../types/book";

const CartPage = () => {
  const [items, setItems] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("http://localhost:4000/cart");
        const data: Book[] = await res.json();
        setItems(data);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  if (loading)
    return (
      <div className="p-6 text-center text-gray-600">
        장바구니 불러오는 중...
      </div>
    );

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
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-gray-500">저자 - {item.author}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartPage;
