
import { useState, useEffect } from "react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductFormValues, IProduct } from "@/types/product";
import { productFormSchema } from "./schemas/productFormSchema";
import { ProductDetailsFields } from "./ProductDetailsFields";
import { ProductFormActions } from "./ProductFormActions";
import ProductImageUpload from "./ProductImageUpload";

interface ProductFormProps {
  productToEdit?: IProduct;
  onSubmitSuccess: (product: IProduct) => void;
  onCancel: () => void;
}

const ProductForm = ({ productToEdit, onSubmitSuccess, onCancel }: ProductFormProps) => {
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [mainImageUrl, setMainImageUrl] = useState<string>("");

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: productToEdit?.name || "",
      description: productToEdit?.description || "",
      price: productToEdit?.price ? String(productToEdit.price) : "",
      stock: productToEdit?.stock ? String(productToEdit.stock) : "",
      category: productToEdit?.category || "",
      featured: productToEdit?.featured || false,
    },
  });

  useEffect(() => {
    if (productToEdit) {
      form.reset({
        name: productToEdit.name,
        description: productToEdit.description,
        price: String(productToEdit.price),
        stock: String(productToEdit.stock || 10),
        category: productToEdit.category,
        featured: productToEdit.featured,
      });
      
      setMainImageUrl(productToEdit.mainImage);
    }
  }, [productToEdit, form]);

  const onSubmit = async (data: ProductFormValues) => {
    const productId = productToEdit ? productToEdit.id : crypto.randomUUID();
    
    const formattedData: IProduct = {
      id: productId,
      name: data.name,
      description: data.description,
      price: Number(data.price),
      stock: Number(data.stock),
      category: data.category,
      featured: data.featured,
      mainImage: mainImage ? URL.createObjectURL(mainImage) : (mainImageUrl || "https://images.unsplash.com/photo-1595428774223-ef52624120d2"),
      additionalImages: productToEdit?.additionalImages || [],
    };

    onSubmitSuccess(formattedData);
    
    if (!productToEdit) {
      form.reset();
      setMainImage(null);
      setAdditionalImages([]);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <ProductImageUpload
          mainImage={mainImage}
          additionalImages={additionalImages}
          onMainImageChange={setMainImage}
          onAdditionalImagesChange={setAdditionalImages}
          existingMainImageUrl={mainImageUrl}
        />

        <ProductDetailsFields form={form} />

        <ProductFormActions 
          isEditing={!!productToEdit} 
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
};

export default ProductForm;
