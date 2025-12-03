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

  if (loading) return <div className="p-6">장바구니 불러오는 중...</div>;

  if (items.length === 0)
    return <div className="p-6">장바구니가 비어 있습니다.</div>;

  return <div></div>;
};

export default CartPage;
