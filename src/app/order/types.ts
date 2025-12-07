export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price?: number;
  currency?: string;
  imageUrl?: string;
}
