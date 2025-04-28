
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import AdminLayout from "@/components/AdminLayout";
import { IProduct } from "@/types/product";
import { products, Product } from "@/data/products";
import { ProductSearch } from "@/components/admin/products/ProductSearch";
import { ProductList } from "@/components/admin/products/ProductList";
import { ProductDialogs } from "@/components/admin/products/ProductDialogs";

const ProductsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
  const [isEditProductDialogOpen, setIsEditProductDialogOpen] = useState(false);
  const [localProducts, setLocalProducts] = useState<IProduct[]>(
    products.map(p => ({
      ...p,
      stock: 10,
      additionalImages: [],
      mainImage: p.image,
      featured: p.featured || false
    }))
  );
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const filteredProducts = localProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <Button 
            className="bg-electroestelar-orange hover:bg-electroestelar-orange/90 text-white"
            onClick={() => setIsAddProductDialogOpen(true)}
          >
            <Plus size={16} className="mr-2" />
            Nuevo Producto
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <ProductSearch 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm} 
          />
        </div>
        
        <div className="rounded-md border">
          <ProductList 
            products={filteredProducts}
            onEdit={openEditDialog}
            onDelete={openDeleteDialog}
          />
        </div>
      </div>

      <ProductDialogs 
        isAddDialogOpen={isAddProductDialogOpen}
        isEditDialogOpen={isEditProductDialogOpen}
        isDeleteDialogOpen={isDeleteDialogOpen}
        selectedProduct={selectedProduct}
        onAddProduct={handleAddProduct}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
        onCloseAddDialog={() => setIsAddProductDialogOpen(false)}
        onCloseEditDialog={() => setIsEditProductDialogOpen(false)}
        onCloseDeleteDialog={() => setIsDeleteDialogOpen(false)}
      />
    </AdminLayout>
  );
};

export default ProductsManagement;
