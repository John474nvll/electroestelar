
import { Button } from "@/components/ui/button";
import { Plus, Save } from "lucide-react";

interface ProductFormActionsProps {
  isEditing: boolean;
  onCancel: () => void;
}

export const ProductFormActions = ({ isEditing, onCancel }: ProductFormActionsProps) => {
  return (
    <div className="flex justify-end space-x-2 pt-2">
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancelar
      </Button>
      <Button type="submit" className="bg-electroestelar-orange hover:bg-electroestelar-orange/90">
        {isEditing ? (
          <>
            <Save className="mr-2 h-4 w-4" /> Guardar Cambios
          </>
        ) : (
          <>
            <Plus className="mr-2 h-4 w-4" /> Añadir Producto
          </>
        )}
      </Button>
    </div>
  );
};
