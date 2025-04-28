
import { useState } from "react";
import { 
  Table, TableHeader, TableRow, TableHead, 
  TableBody, TableCell 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Mail, Phone, User, MapPin, ShoppingBag } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { Customer } from "@/types/product";

// Mock customers data
const mockCustomers: Customer[] = [
  {
    id: 1,
    name: "Ana Martínez",
    email: "ana.martinez@example.com",
    phone: "+57 300 123 4567",
    city: "Bogotá",
    orders: 5,
    totalSpent: 2450000,
  },
  {
    id: 2,
    name: "Carlos Pérez",
    email: "carlos.perez@example.com",
    phone: "+57 311 987 6543",
    city: "Medellín",
    orders: 3,
    totalSpent: 1750000,
  },
  {
    id: 3,
    name: "Sofia García",
    email: "sofia.garcia@example.com",
    phone: "+57 315 456 7890",
    city: "Cali",
    orders: 7,
    totalSpent: 3200000,
  },
  {
    id: 4,
    name: "Luis Rodríguez",
    email: "luis.rodriguez@example.com",
    phone: "+57 320 789 0123",
    city: "Barranquilla",
    orders: 2,
    totalSpent: 980000,
  },
  {
    id: 5,
    name: "María López",
    email: "maria.lopez@example.com",
    phone: "+57 312 345 6789",
    city: "Cartagena",
    orders: 4,
    totalSpent: 1650000,
  },
];

// Mock order history for customers
const mockOrderHistory = [
  {
    id: "ORD001",
    customerId: 1,
    date: "2024-04-28",
    total: 650000,
    status: "delivered",
    items: ["Smart TV 55\""]
  },
  {
    id: "ORD002",
    customerId: 1,
    date: "2024-04-15",
    total: 450000,
    status: "delivered",
    items: ["Soundbar", "Audífonos Inalámbricos"]
  },
  {
    id: "ORD003",
    customerId: 2,
    date: "2024-04-26",
    total: 899000,
    status: "shipped",
    items: ["Laptop Gaming"]
  },
  {
    id: "ORD004",
    customerId: 3,
    date: "2024-04-25",
    total: 450000,
    status: "delivered",
    items: ["Silla Ergonómica", "Mesa de Centro"]
  },
];

const getStatusText = (status: string): string => {
  switch(status) {
    case "approved": return "Pago Aprobado";
    case "shipped": return "En Camino";
    case "delivered": return "Entregado";
    default: return status;
  }
};

const CustomersManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  const filteredCustomers = mockCustomers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showCustomerDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDetailsDialogOpen(true);
  };

  // Get order history for a specific customer
  const getCustomerOrders = (customerId: number) => {
    return mockOrderHistory.filter(order => order.customerId === customerId);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-electroestelar-blue">Gestión de Clientes</h1>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="w-full md:w-1/3">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar clientes por nombre, email o ciudad..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Ciudad</TableHead>
                <TableHead>Pedidos</TableHead>
                <TableHead>Total Comprado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail size={14} className="mr-2 text-gray-500" />
                        {customer.email}
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone size={14} className="mr-2 text-gray-500" />
                        {customer.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{customer.city}</TableCell>
                  <TableCell>{customer.orders}</TableCell>
                  <TableCell>
                    {new Intl.NumberFormat("es-CO", {
                      style: "currency",
                      currency: "COP",
                      minimumFractionDigits: 0,
                    }).format(customer.totalSpent)}
                  </TableCell>
                  <TableCell>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => showCustomerDetails(customer)}
                    >
                      Ver detalles
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredCustomers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No se encontraron clientes que coincidan con los criterios de búsqueda
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Customer Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Detalles del Cliente</DialogTitle>
          </DialogHeader>

          {selectedCustomer && (
            <Tabs defaultValue="info" className="mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="info">Información Personal</TabsTrigger>
                <TabsTrigger value="orders">Historial de Compras</TabsTrigger>
              </TabsList>
              <TabsContent value="info" className="space-y-4 py-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="mr-2 h-5 w-5" /> Datos Personales
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-500">Nombre</p>
                        <p>{selectedCustomer.name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-500">Ciudad</p>
                        <p className="flex items-center">
                          <MapPin size={16} className="mr-1 text-gray-400" />
                          {selectedCustomer.city}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500">Email</p>
                      <p className="flex items-center">
                        <Mail size={16} className="mr-1 text-gray-400" />
                        {selectedCustomer.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500">Teléfono</p>
                      <p className="flex items-center">
                        <Phone size={16} className="mr-1 text-gray-400" />
                        {selectedCustomer.phone}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <ShoppingBag className="mr-2 h-5 w-5" /> Resumen de Compras
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Total Pedidos</p>
                      <p className="text-2xl font-bold text-blue-600">{selectedCustomer.orders}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Total Gastado</p>
                      <p className="text-2xl font-bold text-green-600">
                        {new Intl.NumberFormat("es-CO", {
                          style: "currency",
                          currency: "COP",
                          minimumFractionDigits: 0,
                        }).format(selectedCustomer.totalSpent)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders" className="py-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Historial de Compras</CardTitle>
                  </CardHeader>
                  <CardContent>
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
                          {getCustomerOrders(selectedCustomer.id).map(order => (
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
                                <span className={
                                  order.status === "delivered" 
                                    ? "px-2 py-1 rounded-full bg-green-100 text-green-600 text-xs"
                                    : order.status === "shipped"
                                      ? "px-2 py-1 rounded-full bg-orange-100 text-orange-600 text-xs"
                                      : "px-2 py-1 rounded-full bg-blue-100 text-blue-600 text-xs"
                                }>
                                  {getStatusText(order.status)}
                                </span>
                              </TableCell>
                            </TableRow>
                          ))}
                          {getCustomerOrders(selectedCustomer.id).length === 0 && (
                            <TableRow>
                              <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                                No hay compras registradas para este cliente
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default CustomersManagement;
