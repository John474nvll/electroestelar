
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import Layout from "@/components/Layout"
import OrdersList from "@/components/OrdersList"
import UserProfile from "@/components/UserProfile"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { LayoutDashboard } from "lucide-react"

const UserPanel = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-electroestelar-blue">
            Panel de Usuario
          </h1>
          <Button 
            onClick={() => navigate("/admin")}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LayoutDashboard size={16} />
            <span>Acceder a Admin</span>
          </Button>
        </div>

        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="w-full md:w-auto mb-6">
            <TabsTrigger value="orders">Mis Pedidos</TabsTrigger>
            <TabsTrigger value="profile">Mi Perfil</TabsTrigger>
          </TabsList>
          
          <TabsContent value="orders" className="mt-6">
            <Card className="p-6">
              <OrdersList />
            </Card>
          </TabsContent>
          
          <TabsContent value="profile" className="mt-6">
            <Card className="p-6">
              <UserProfile />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default UserPanel;
