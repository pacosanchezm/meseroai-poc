export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  category?: string;
  price?: number;
  currency?: string;
  available?: boolean;
  tags?: string[];
  imageUrl?: string;
}
