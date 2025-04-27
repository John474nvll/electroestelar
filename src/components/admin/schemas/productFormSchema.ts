
import * as z from "zod";

export const productFormSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  price: z.string().regex(/^\d+$/, "El precio debe ser un número válido"),
  stock: z.string().regex(/^\d+$/, "El stock debe ser un número válido"),
  category: z.string().min(1, "Selecciona una categoría"),
  featured: z.boolean().default(false),
});

export type ProductFormSchema = z.infer<typeof productFormSchema>;
