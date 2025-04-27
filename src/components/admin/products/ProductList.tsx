
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { IProduct } from "@/types/product";
import { formatPrice } from "@/utils/formatters";
import { ProductTableHeader } from "./ProductTableHeader";
import { ProductFeaturedBadge } from "./ProductFeaturedBadge";
import { ProductRowActions } from "./ProductRowActions";
import { ProductEmptyState } from "./ProductEmptyState";

interface ProductListProps {
  products: IProduct[];
  onEdit: (product: IProduct) => void;
  onDelete: (productId: string) => void;
}

export const ProductList = ({ products, onEdit, onDelete }: ProductListProps) => {
  const getCategoryName = (categoryId: string): string => {
    switch(categoryId) {
      case "furniture": return "Muebles";
      case "appliances": return "Electrodomésticos";
      case "technology": return "Tecnología";
      default: return categoryId;
    }
  };

  return (
    <Table>
      <ProductTableHeader />
      <TableBody>
        {products.length > 0 ? (
          products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <img 
                  src={product.mainImage} 
                  alt={product.name} 
                  className="w-12 h-12 object-cover rounded"
                />
              </TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{getCategoryName(product.category)}</TableCell>
              <TableCell>{formatPrice(product.price)}</TableCell>
              <TableCell>
                <ProductFeaturedBadge featured={product.featured} />
              </TableCell>
              <TableCell>
                <ProductRowActions 
                  onEdit={() => onEdit(product)}
                  onDelete={() => onDelete(product.id)}
                />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <ProductEmptyState />
        )}
      </TableBody>
    </Table>
  );
};
