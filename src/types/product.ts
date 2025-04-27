
export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  featured: boolean;
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
