
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ProductSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const ProductSearch = ({ searchTerm, onSearchChange }: ProductSearchProps) => {
  return (
    <div className="w-full md:w-1/3">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
    </div>
  );
};
