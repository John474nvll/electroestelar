
import { useState } from "react";
import { 
  Table, TableHeader, TableRow, TableHead, 
  TableBody, TableCell 
} from "@/components/ui/table";
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Package, PackageCheck, Truck, Search, Filter } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";

// Mock data for orders
const mockOrders = [
  {
    id: "ORD001",
    customer: "Ana Martínez",
    email: "ana@example.com",
    date: "2024-04-28",
    total: 1250000,
    status: "approved",
    items: ["Smart TV 55\"", "Soundbar"],
  },
  {
    id: "ORD002",
    customer: "Carlos Pérez",
    email: "carlos@example.com",
    date: "2024-04-27",
    total: 899000,
    status: "shipped",
    items: ["Laptop Gaming"],
  },
  {
    id: "ORD003",
    customer: "Sofia García",
    email: "sofia@example.com",
    date: "2024-04-26",
    total: 450000,
    status: "delivered",
    items: ["Silla Ergonómica", "Mesa de Centro"],
  },
  {
    id: "ORD004",
    customer: "Luis Rodríguez",
    email: "luis@example.com",
    date: "2024-04-25",
    total: 1750000,
    status: "approved",
    items: ["Refrigerador Side by Side"],
  },
  {
    id: "ORD005",
    customer: "María López",
    email: "maria@example.com",
    date: "2024-04-24",
    total: 349000,
    status: "shipped",
    items: ["Audífonos Inalámbricos", "Parlante Bluetooth"],
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

const OrdersManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || order.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-electroestelar-blue">Gestión de Pedidos</h1>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="w-full md:w-1/3">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por orden o cliente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="w-full md:w-1/4">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full">
                <div className="flex items-center gap-2">
                  <Filter size={16} />
                  <SelectValue placeholder="Filtrar por estado" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="approved">Pago Aprobado</SelectItem>
                <SelectItem value="shipped">En Camino</SelectItem>
                <SelectItem value="delivered">Entregado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
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
              {filteredOrders.map((order) => (
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
                    <Button size="sm" variant="outline">Ver detalles</Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredOrders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    No se encontraron órdenes que coincidan con los criterios de búsqueda
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default OrdersManagement;
