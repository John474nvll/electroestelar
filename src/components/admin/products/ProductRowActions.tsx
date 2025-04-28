
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";

interface ProductRowActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const ProductRowActions = ({ onEdit, onDelete }: ProductRowActionsProps) => {
  return (
    <div className="flex gap-2">
      <Button size="sm" variant="ghost" onClick={onEdit}>
        <Edit size={16} />
      </Button>
      <Button 
        size="sm" 
        variant="ghost" 
        className="text-red-500" 
        onClick={onDelete}
      >
        <Trash size={16} />
      </Button>
    </div>
  );
};
