
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import ProductForm from "../ProductForm";
import { IProduct } from "@/types/product";

interface AddProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: IProduct) => void;
}

export const AddProductDialog = ({ isOpen, onClose, onSubmit }: AddProductDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Añadir Nuevo Producto</DialogTitle>
          <DialogDescription>
            Complete el formulario para agregar un nuevo producto al catálogo.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <ProductForm 
            onSubmitSuccess={onSubmit} 
            onCancel={onClose} 
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
