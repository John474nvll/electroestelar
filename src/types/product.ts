
export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  featured: boolean; // This remains required, but we'll ensure all products have it
  mainImage: string;
  additionalImages: string[];
}

export interface ProductFormValues {
  name: string;
  description: string;
  price: string;
  stock: string;
  category: string;
  featured: boolean;
}

export interface Order {
  id: string;
  customer: string;
  email: string;
  date: string;
  total: number;
  status: "approved" | "shipped" | "delivered";
  items: string[];
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  orders: number;
  totalSpent: number;
}
