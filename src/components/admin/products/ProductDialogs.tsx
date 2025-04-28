
import { IProduct } from "@/types/product";
import { AddProductDialog } from "./AddProductDialog";
import { EditProductDialog } from "./EditProductDialog";
import { DeleteProductDialog } from "./DeleteProductDialog";

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
      <AddProductDialog 
        isOpen={isAddDialogOpen}
        onClose={onCloseAddDialog}
        onSubmit={onAddProduct}
      />

      <EditProductDialog 
        isOpen={isEditDialogOpen}
        onClose={onCloseEditDialog}
        onSubmit={onEditProduct}
        product={selectedProduct}
      />

      <DeleteProductDialog 
        isOpen={isDeleteDialogOpen}
        onClose={onCloseDeleteDialog}
        onConfirm={onDeleteProduct}
      />
    </>
  );
};
