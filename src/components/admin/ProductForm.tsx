
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import * as z from "zod";
import ProductImageUpload from "./ProductImageUpload";
import ProductCategorySelect from "./ProductCategorySelect";
import { ProductFormValues } from "@/types/product";

const formSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  price: z.string().regex(/^\d+$/, "El precio debe ser un número válido"),
  stock: z.string().regex(/^\d+$/, "El stock debe ser un número válido"),
  category: z.string().min(1, "Selecciona una categoría"),
  featured: z.boolean().default(false),
});

const ProductForm = () => {
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      stock: "",
      category: "",
      featured: false,
    },
  });

  const onSubmit = async (data: ProductFormValues) => {
    const formattedData = {
      ...data,
      price: Number(data.price),
      stock: Number(data.stock),
      mainImage: mainImage ? URL.createObjectURL(mainImage) : "",
      additionalImages: additionalImages.map(img => URL.createObjectURL(img)),
      id: crypto.randomUUID(),
    };

    console.log("Nuevo producto:", formattedData);
    form.reset();
    setMainImage(null);
    setAdditionalImages([]);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <ProductImageUpload
          mainImage={mainImage}
          additionalImages={additionalImages}
          onMainImageChange={setMainImage}
          onAdditionalImagesChange={setAdditionalImages}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: Smart TV 55'" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <ProductCategorySelect form={form} />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe las características del producto..."
                  className="resize-none h-20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio (COP)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Ej: 1299900" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Ej: 10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="featured"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-2 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="text-sm font-normal">Marcar como producto destacado</FormLabel>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-electroestelar-orange hover:bg-electroestelar-orange/90">
          <Plus className="mr-2 h-4 w-4" /> Añadir Producto
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
