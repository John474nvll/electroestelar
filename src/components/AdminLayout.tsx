
import { useState } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Mock authentication function - in a real app, this would use a proper auth system
const isAuthenticated = () => true; // For demo - always return true

type AdminLayoutProps = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  // If not authenticated, redirect to login
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }

  const sidebarItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Pedidos",
      path: "/admin/orders",
      icon: <ShoppingCart size={20} />,
    },
    {
      name: "Productos",
      path: "/admin/products",
      icon: <Package size={20} />,
    },
    {
      name: "Categorías",
      path: "/admin/categories",
      icon: <Layers size={20} />,
    },
    {
      name: "Clientes",
      path: "/admin/customers",
      icon: <Users size={20} />,
    },
    {
      name: "Configuración",
      path: "/admin/settings",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col h-screen sticky top-0",
          collapsed ? "w-[70px]" : "w-64"
        )}
      >
        {/* Logo */}
        <div className={cn("px-4 py-5 flex items-center", collapsed ? "justify-center" : "")}>
          {!collapsed && (
            <span className="text-electroestelar-blue text-xl font-bold">
              Electro<span className="text-electroestelar-orange">Estelar</span>
            </span>
          )}
          {collapsed && (
            <span className="text-electroestelar-blue text-xl font-bold">
              E<span className="text-electroestelar-orange">E</span>
            </span>
          )}
        </div>
        
        <Separator />
        
        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1 px-2">
            {sidebarItems.map((item) => (
              <li key={item.path}>
                <Link to={item.path}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-gray-600 hover:text-electroestelar-blue hover:bg-gray-100",
                      location.pathname === item.path && "bg-gray-100 text-electroestelar-blue font-medium",
                      collapsed ? "justify-center px-2" : ""
                    )}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {!collapsed && <span>{item.name}</span>}
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            {!collapsed && <span className="ml-2">Colapsar</span>}
          </Button>
          
          <Link to="/">
            <Button
              variant="ghost"
              className={cn(
                "w-full flex items-center text-gray-600 mt-4",
                collapsed ? "justify-center" : "justify-start"
              )}
            >
              <LogOut size={18} />
              {!collapsed && <span className="ml-2">Volver a Tienda</span>}
            </Button>
          </Link>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex-1 overflow-x-hidden">
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
