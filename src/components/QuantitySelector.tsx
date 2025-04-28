
import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  max?: number;
}

const QuantitySelector = ({ 
  quantity, 
  onIncrease, 
  onDecrease,
  max = 99 
}: QuantitySelectorProps) => {
  const isMinimum = quantity <= 1;
  const isMaximum = max ? quantity >= max : false;

  return (
    <div className="flex items-center border border-gray-200 rounded-md">
      <Button 
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-none border-r border-gray-200"
        onClick={onDecrease}
        disabled={isMinimum}
      >
        <Minus size={16} />
      </Button>
      <div className="h-8 w-12 flex items-center justify-center text-sm font-medium">
        {quantity}
      </div>
      <Button 
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-none border-l border-gray-200"
        onClick={onIncrease}
        disabled={isMaximum}
      >
        <Plus size={16} />
      </Button>
    </div>
  );
};

export default QuantitySelector;
