
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Package, PackageCheck, Truck } from "lucide-react";

// Mock data - this would come from your backend in a real application
const orders = [
  {
    id: "ORD001",
    date: "2024-04-26",
    total: 1250000,
    status: "approved",
    items: ["Smart TV 55\"", "Soundbar"],
  },
  {
    id: "ORD002",
    date: "2024-04-25",
    total: 899000,
    status: "shipped",
    items: ["Laptop Gaming"],
  },
  {
    id: "ORD003",
    date: "2024-04-24",
    total: 450000,
    status: "delivered",
    items: ["Silla Ergonómica", "Mesa de Centro"],
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
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

const OrdersList = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-electroestelar-blue mb-4">
        Mis Pedidos
      </h2>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Orden #</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Productos</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default OrdersList;
