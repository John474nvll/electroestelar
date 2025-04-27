
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "@/types/product";

interface ProductCategorySelectProps {
  form: UseFormReturn<ProductFormValues>;
}

const ProductCategorySelect = ({ form }: ProductCategorySelectProps) => {
  return (
    <FormField
      control={form.control}
      name="category"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Categoría</FormLabel>
          <FormControl>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              {...field}
            >
              <option value="">Seleccionar</option>
              <option value="furniture">Muebles</option>
              <option value="appliances">Electrodomésticos</option>
              <option value="technology">Tecnología</option>
            </select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ProductCategorySelect;
