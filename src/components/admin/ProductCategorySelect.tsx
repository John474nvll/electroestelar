
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="furniture">Muebles</SelectItem>
                <SelectItem value="appliances">Electrodomésticos</SelectItem>
                <SelectItem value="technology">Tecnología</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ProductCategorySelect;
