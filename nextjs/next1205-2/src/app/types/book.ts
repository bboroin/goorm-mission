export interface BookPrice {
  amount: string; // "32000"
  currencyCode: string; // "KRW"
}

export interface Book {
  id: number;
  slug: string;
  title: string;
  author: string;
  category: string;
  description: string;
  descriptionHtml: string;
  price: BookPrice;
  coverImage: string;
  isNew: boolean;
  rating: number;
  tags: string[];
}
