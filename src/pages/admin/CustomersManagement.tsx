
import { useState } from "react";
import { 
  Table, TableHeader, TableRow, TableHead, 
  TableBody, TableCell 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Mail, Phone } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";

// Mock customers data
const mockCustomers = [
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

const CustomersManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = mockCustomers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                    <Button size="sm" variant="outline">Ver detalles</Button>
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
    </AdminLayout>
  );
};

export default CustomersManagement;
