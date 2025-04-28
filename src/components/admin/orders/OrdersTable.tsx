
import { 
  Table, TableHeader, TableRow, TableHead, 
  TableBody, TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Clock, Package, PackageCheck, Truck } from "lucide-react";
import { Order } from "@/types/product";

interface OrdersTableProps {
  orders: Order[];
  onViewDetails: (order: Order) => void;
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "pending":
      return <Clock className="text-yellow-500" />;
    case "approved":
      return <Package className="text-blue-500" />;
    case "shipped":
      return <Truck className="text-orange-500" />;
    case "delivered":
      return <PackageCheck className="text-green-500" />;
    default:
      return null;
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "pending":
      return "Pendiente";
    case "approved":
      return "Pago Aprobado";
    case "shipped":
      return "En Camino";
    case "delivered":
      return "Entregado";
    default:
      return status;
  }
};

export const OrdersTable = ({ orders, onViewDetails }: OrdersTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Orden #</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Productos</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                No se encontraron órdenes que coincidan con los criterios de búsqueda
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{order.customer}</div>
                    <div className="text-sm text-gray-500">{order.email}</div>
                  </div>
                </TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.items.join(", ")}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat("es-CO", {
                    style: "currency",
                    currency: "COP",
                    minimumFractionDigits: 0,
                  }).format(order.total)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <span>{getStatusText(order.status)}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => onViewDetails(order)}
                  >
                    Ver detalles
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
