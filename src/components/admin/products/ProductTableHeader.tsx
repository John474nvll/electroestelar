
import { TableHeader, TableRow, TableHead } from "@/components/ui/table";

export const ProductTableHeader = () => {
  return (
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
  );
};
