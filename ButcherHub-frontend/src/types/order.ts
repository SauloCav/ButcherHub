export type Currency = "BRL" | "USD" | "EUR";

export interface OrderItem {
  meatId: number;
  price: number;
  currency: string;
}
export interface Order {
  id: number;
  orderDate: string;
  buyerId: number;
  buyer: { id: number; name: string };
  items: OrderItem[];
}