
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image, Plus, FileImage } from "lucide-react";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  price: z.string().regex(/^\d+$/, "El precio debe ser un número válido"),
  stock: z.string().regex(/^\d+$/, "El stock debe ser un número válido"),
  category: z.string().min(1, "Selecciona una categoría"),
});

export type ProductFormValues = z.infer<typeof formSchema>;

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
    },
  });

  const onSubmit = (data: ProductFormValues) => {
    // Handle form submission here
    console.log("Form data:", data);
    console.log("Main image:", mainImage);
    console.log("Additional images:", additionalImages);
  };

  const handleMainImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setMainImage(e.target.files[0]);
    }
  };

  const handleAdditionalImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      if (additionalImages.length + newImages.length <= 3) {
        setAdditionalImages([...additionalImages, ...newImages]);
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Imagen Principal */}
        <div className="space-y-2">
          <FormLabel>Imagen Principal</FormLabel>
          <div className="flex items-center gap-4">
            <div
              className={`w-32 h-32 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:border-electroestelar-orange transition-colors ${
                mainImage ? "border-electroestelar-blue" : "border-gray-300"
              }`}
            >
              <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
                {mainImage ? (
                  <img
                    src={URL.createObjectURL(mainImage)}
                    alt="Vista previa"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Image className="w-8 h-8 text-gray-400" />
                    <span className="text-sm text-gray-500">Subir imagen</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleMainImageUpload}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Imágenes Adicionales */}
        <div className="space-y-2">
          <FormLabel>Imágenes Adicionales (máx. 3)</FormLabel>
          <div className="flex items-center gap-4">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className={`w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:border-electroestelar-orange transition-colors ${
                  additionalImages[index] ? "border-electroestelar-blue" : "border-gray-300"
                }`}
              >
                <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
                  {additionalImages[index] ? (
                    <img
                      src={URL.createObjectURL(additionalImages[index])}
                      alt={`Imagen adicional ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-1">
                      <FileImage className="w-6 h-6 text-gray-400" />
                      <span className="text-xs text-gray-500">Imagen {index + 1}</span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAdditionalImagesUpload}
                    disabled={additionalImages.length >= 3 && !additionalImages[index]}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Nombre del Producto */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del Producto</FormLabel>
              <FormControl>
                <Input placeholder="Ej: Refrigerador Samsung Digital Inverter" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Descripción */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe las características principales del producto..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Precio */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Precio (COP)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Ej: 1299900"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Stock */}
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock Disponible</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Ej: 10"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Categoría */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoría</FormLabel>
              <FormControl>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  {...field}
                >
                  <option value="">Seleccionar categoría</option>
                  <option value="furniture">Muebles</option>
                  <option value="appliances">Electrodomésticos</option>
                  <option value="technology">Tecnología</option>
                </select>
              </FormControl>
              <FormMessage />
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
