
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { IProduct } from "@/types/product";
import { formatPrice } from "@/utils/formatters";

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
      <TableHeader>
        <TableRow>
          <TableHead>Imagen</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Categoría</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead>Destacado</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
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
                {product.featured ? (
                  <span className="px-2 py-1 rounded-full bg-green-100 text-green-600 text-xs">Sí</span>
                ) : (
                  <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-xs">No</span>
                )}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => onEdit(product)}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-red-500" 
                    onClick={() => onDelete(product.id)}
                  >
                    <Trash size={16} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-8 text-gray-500">
              No se encontraron productos que coincidan con los criterios de búsqueda
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
