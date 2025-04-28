
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import ProductForm from "../ProductForm";
import { IProduct } from "@/types/product";

interface EditProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: IProduct) => void;
  product: IProduct | null;
}

export const EditProductDialog = ({ isOpen, onClose, onSubmit, product }: EditProductDialogProps) => {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Editar Producto</DialogTitle>
          <DialogDescription>
            Modifique los detalles del producto.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <ProductForm 
            productToEdit={product}
            onSubmitSuccess={onSubmit}
            onCancel={onClose}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
