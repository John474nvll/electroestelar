
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Users, Package, TrendingUp } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";

const AdminDashboard = () => {
  // Mock stats data
  const stats = [
    {
      title: "Total Pedidos",
      value: "124",
      icon: <ShoppingCart className="text-electroestelar-blue" />,
      trend: "+12% este mes"
    },
    {
      title: "Clientes Registrados",
      value: "532",
      icon: <Users className="text-electroestelar-orange" />,
      trend: "+8% este mes"
    },
    {
      title: "Productos",
      value: "48",
      icon: <Package className="text-green-500" />,
      trend: "3 nuevos este mes"
    },
    {
      title: "Ventas Totales",
      value: "$24.5M",
      icon: <TrendingUp className="text-purple-500" />,
      trend: "+15% este mes"
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-electroestelar-blue">Panel de Administración</h1>
        
        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {stat.title}
                </CardTitle>
                <div className="p-2 rounded-full bg-gray-100">
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">{stat.trend}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Recent orders */}
        <Card>
          <CardHeader>
            <CardTitle>Pedidos Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-3 font-medium">Orden #</th>
                  <th className="pb-3 font-medium">Cliente</th>
                  <th className="pb-3 font-medium">Fecha</th>
                  <th className="pb-3 font-medium">Total</th>
                  <th className="pb-3 font-medium">Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3">ORD001</td>
                  <td className="py-3">Ana Martínez</td>
                  <td className="py-3">2024-04-28</td>
                  <td className="py-3">$1,250,000</td>
                  <td className="py-3"><span className="px-2 py-1 rounded-full bg-blue-100 text-blue-600 text-xs">Aprobado</span></td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">ORD002</td>
                  <td className="py-3">Carlos Pérez</td>
                  <td className="py-3">2024-04-27</td>
                  <td className="py-3">$899,000</td>
                  <td className="py-3"><span className="px-2 py-1 rounded-full bg-orange-100 text-orange-600 text-xs">En camino</span></td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">ORD003</td>
                  <td className="py-3">Sofia García</td>
                  <td className="py-3">2024-04-26</td>
                  <td className="py-3">$450,000</td>
                  <td className="py-3"><span className="px-2 py-1 rounded-full bg-green-100 text-green-600 text-xs">Entregado</span></td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
