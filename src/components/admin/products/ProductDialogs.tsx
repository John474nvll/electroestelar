
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, 
  AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction 
} from "@/components/ui/alert-dialog";
import ProductForm from "../ProductForm";
import { IProduct } from "@/types/product";

interface ProductDialogsProps {
  isAddDialogOpen: boolean;
  isEditDialogOpen: boolean;
  isDeleteDialogOpen: boolean;
  selectedProduct: IProduct | null;
  onAddProduct: (product: IProduct) => void;
  onEditProduct: (product: IProduct) => void;
  onDeleteProduct: () => void;
  onCloseAddDialog: () => void;
  onCloseEditDialog: () => void;
  onCloseDeleteDialog: () => void;
}

export const ProductDialogs = ({
  isAddDialogOpen,
  isEditDialogOpen,
  isDeleteDialogOpen,
  selectedProduct,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onCloseAddDialog,
  onCloseEditDialog,
  onCloseDeleteDialog,
}: ProductDialogsProps) => {
  return (
    <>
      <Dialog open={isAddDialogOpen} onOpenChange={onCloseAddDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Añadir Nuevo Producto</DialogTitle>
            <DialogDescription>
              Complete el formulario para agregar un nuevo producto al catálogo.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <ProductForm 
              onSubmitSuccess={onAddProduct} 
              onCancel={onCloseAddDialog} 
            />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={onCloseEditDialog}>
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
                onSubmitSuccess={onEditProduct}
                onCancel={onCloseEditDialog}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={onCloseDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El producto será eliminado permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onCloseDeleteDialog}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={onDeleteProduct}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
