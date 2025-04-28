
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Package, PackageCheck, Truck } from "lucide-react";
import { Order } from "@/types/product";
import { useToast } from "@/hooks/use-toast";

interface OrderDetailsDialogProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (orderId: string, newStatus: "pending" | "approved" | "shipped" | "delivered") => void;
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

export const OrderDetailsDialog = ({ order, isOpen, onClose, onStatusChange }: OrderDetailsDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detalles del Pedido</DialogTitle>
          <DialogDescription>
            Información completa y gestión del pedido #{order?.id}
          </DialogDescription>
        </DialogHeader>
        
        {order && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Cliente</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">{order.customer}</p>
                  <p className="text-sm text-gray-500">{order.email}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Pedido</CardTitle>
                </CardHeader>
                <CardContent>
                  <p><span className="font-medium">Fecha:</span> {order.date}</p>
                  <p>
                    <span className="font-medium">Total:</span>{" "}
                    {new Intl.NumberFormat("es-CO", {
                      style: "currency",
                      currency: "COP",
                      minimumFractionDigits: 0,
                    }).format(order.total)}
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Productos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1">
                  {order.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Estado del Pedido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <span className="font-medium">{getStatusText(order.status)}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Cambiar estado:</p>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      size="sm" 
                      variant={order.status === "pending" ? "default" : "outline"}
                      onClick={() => onStatusChange(order.id, "pending")}
                      className={order.status === "pending" ? "bg-yellow-500 hover:bg-yellow-600" : ""}
                    >
                      <Clock className="h-4 w-4 mr-2" /> 
                      Pendiente
                    </Button>
                    <Button 
                      size="sm" 
                      variant={order.status === "approved" ? "default" : "outline"}
                      onClick={() => onStatusChange(order.id, "approved")}
                      className={order.status === "approved" ? "bg-blue-500 hover:bg-blue-600" : ""}
                    >
                      <Package className="h-4 w-4 mr-2" /> 
                      Pago Aprobado
                    </Button>
                    <Button 
                      size="sm"
                      variant={order.status === "shipped" ? "default" : "outline"}
                      onClick={() => onStatusChange(order.id, "shipped")}
                      className={order.status === "shipped" ? "bg-orange-500 hover:bg-orange-600" : ""}
                    >
                      <Truck className="h-4 w-4 mr-2" /> 
                      En Camino
                    </Button>
                    <Button 
                      size="sm"
                      variant={order.status === "delivered" ? "default" : "outline"}
                      onClick={() => onStatusChange(order.id, "delivered")}
                      className={order.status === "delivered" ? "bg-green-500 hover:bg-green-600" : ""}
                    >
                      <PackageCheck className="h-4 w-4 mr-2" /> 
                      Entregado
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={onClose}>
                  Cerrar
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
