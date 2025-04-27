
import { useState } from "react";
import { 
  Table, TableHeader, TableRow, TableHead, 
  TableBody, TableCell 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { Search, Plus, Edit, Trash } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import ProductForm from "@/components/admin/ProductForm";
import { IProduct } from "@/types/product";
import { products } from "@/data/products";
import { formatPrice } from "@/utils/formatters";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

const ProductsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
  const [isEditProductDialogOpen, setIsEditProductDialogOpen] = useState(false);
  const [localProducts, setLocalProducts] = useState<IProduct[]>(
    products.map(p => ({
      ...p,
      stock: 10, // Default value for stock since it doesn't exist in Product type
      additionalImages: [],
      mainImage: p.image,
      featured: p.featured !== undefined ? p.featured : false // Ensure featured is always defined
    }))
  );
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const filteredProducts = localProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryName = (categoryId: string): string => {
    switch(categoryId) {
      case "furniture": return "Muebles";
      case "appliances": return "Electrodomésticos";
      case "technology": return "Tecnología";
      default: return categoryId;
    }
  };

  const handleAddProduct = (newProduct: IProduct) => {
    setLocalProducts(prev => [...prev, newProduct]);
    setIsAddProductDialogOpen(false);
    toast({
      title: "Producto añadido",
      description: `El producto "${newProduct.name}" ha sido añadido exitosamente.`,
    });
  };

  const handleEditProduct = (updatedProduct: IProduct) => {
    setLocalProducts(prev => 
      prev.map(product => 
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setIsEditProductDialogOpen(false);
    toast({
      title: "Producto actualizado",
      description: `El producto "${updatedProduct.name}" ha sido actualizado exitosamente.`,
    });
  };

  const handleDeleteProduct = () => {
    if (productToDelete) {
      const productName = localProducts.find(p => p.id === productToDelete)?.name || '';
      
      setLocalProducts(prev => prev.filter(product => product.id !== productToDelete));
      setProductToDelete(null);
      setIsDeleteDialogOpen(false);
      
      toast({
        title: "Producto eliminado",
        description: `El producto "${productName}" ha sido eliminado exitosamente.`,
      });
    }
  };

  const openEditDialog = (product: IProduct) => {
    setSelectedProduct(product);
    setIsEditProductDialogOpen(true);
  };

  const openDeleteDialog = (productId: string) => {
    setProductToDelete(productId);
    setIsDeleteDialogOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-electroestelar-blue">Gestión de Productos</h1>
          <Dialog open={isAddProductDialogOpen} onOpenChange={setIsAddProductDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-electroestelar-orange hover:bg-electroestelar-orange/90 text-white">
                <Plus size={16} className="mr-2" />
                Nuevo Producto
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px]">
              <DialogHeader>
                <DialogTitle>Añadir Nuevo Producto</DialogTitle>
                <DialogDescription>
                  Complete el formulario para agregar un nuevo producto al catálogo.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <ProductForm onSubmitSuccess={handleAddProduct} onCancel={() => setIsAddProductDialogOpen(false)} />
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="w-full md:w-1/3">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar productos..."
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
                <TableHead>Imagen</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Destacado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {localProducts.length > 0 ? (
                localProducts.filter(product => 
                  product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                  product.category.toLowerCase().includes(searchTerm.toLowerCase())
                ).map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <img 
                        src={product.mainImage} 
                        alt={product.name} 
                        className="w-12 h-12 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{getCategoryName(product.category)}</TableCell>
                    <TableCell>{formatPrice(product.price)}</TableCell>
                    <TableCell>
                      {product.featured ? (
                        <span className="px-2 py-1 rounded-full bg-green-100 text-green-600 text-xs">Sí</span>
                      ) : (
                        <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-xs">No</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => openEditDialog(product)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-red-500" 
                          onClick={() => openDeleteDialog(product.id)}
                        >
                          <Trash size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No se encontraron productos que coincidan con los criterios de búsqueda
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Edit Product Dialog */}
      <Dialog open={isEditProductDialogOpen} onOpenChange={setIsEditProductDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Editar Producto</DialogTitle>
            <DialogDescription>
              Modifique los detalles del producto.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {selectedProduct && (
              <ProductForm 
                productToEdit={selectedProduct}
                onSubmitSuccess={handleEditProduct}
                onCancel={() => setIsEditProductDialogOpen(false)}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El producto será eliminado permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteProduct}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default ProductsManagement;
