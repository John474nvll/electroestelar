import { useState } from "react";
import { Order } from "@/types/product";
import { toast } from "@/components/ui/use-toast";
import AdminLayout from "@/components/AdminLayout";
import { OrdersControls } from "@/components/admin/orders/OrdersControls";
import { OrdersTable } from "@/components/admin/orders/OrdersTable";
import { OrderDetailsDialog } from "@/components/admin/orders/OrderDetailsDialog";

// Mock data for orders
const mockOrders: Order[] = [
  {
    id: "ORD001",
    customer: "Ana Martínez",
    email: "ana@example.com",
    date: "2024-04-28",
    total: 1250000,
    status: "pending",
    items: ["Smart TV 55\"", "Soundbar"],
  },
  {
    id: "ORD002",
    customer: "Carlos Pérez",
    email: "carlos@example.com",
    date: "2024-04-27",
    total: 899000,
    status: "approved",
    items: ["Laptop Gaming"],
  },
  {
    id: "ORD003",
    customer: "Sofia García",
    email: "sofia@example.com",
    date: "2024-04-26",
    total: 450000,
    status: "shipped",
    items: ["Silla Ergonómica", "Mesa de Centro"],
  },
  {
    id: "ORD004",
    customer: "Luis Rodríguez",
    email: "luis@example.com",
    date: "2024-04-25",
    total: 1750000,
    status: "delivered",
    items: ["Refrigerador Side by Side"],
  },
  {
    id: "ORD005",
    customer: "María López",
    email: "maria@example.com",
    date: "2024-04-24",
    total: 349000,
    status: "pending",
    items: ["Audífonos Inalámbricos", "Parlante Bluetooth"],
  },
];

const OrdersManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || order.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (orderId: string, newStatus: "pending" | "approved" | "shipped" | "delivered") => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus } 
          : order
      )
    );
    
    toast({
      title: "Estado actualizado",
      description: `El estado del pedido ${orderId} ha sido actualizado.`,
    });

    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const showOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsDialogOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-electroestelar-blue">Gestión de Pedidos</h1>
        </div>
        
        <OrdersControls 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterStatus={filterStatus}
          onFilterChange={setFilterStatus}
        />
        
        <OrdersTable 
          orders={filteredOrders}
          onViewDetails={showOrderDetails}
        />

        <OrderDetailsDialog
          order={selectedOrder}
          isOpen={isDetailsDialogOpen}
          onClose={() => setIsDetailsDialogOpen(false)}
          onStatusChange={handleStatusChange}
        />
      </div>
    </AdminLayout>
  );
};

export default OrdersManagement;
