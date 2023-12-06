export interface Product {
  _id: number;
  title: string;
  isNew: boolean;
  oldPrice: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: number;
  quantity?: number;
}
