
import { TableRow, TableCell } from "@/components/ui/table";

export const ProductEmptyState = () => {
  return (
    <TableRow>
      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
        No se encontraron productos que coincidan con los criterios de búsqueda
      </TableCell>
    </TableRow>
  );
};
