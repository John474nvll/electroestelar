
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/data/products';
import { formatPrice } from '@/utils/formatters';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <div className="product-card rounded-lg overflow-hidden bg-white shadow-md">
      <div className="product-image-container">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name}
            className="product-image w-full h-48 object-cover"
          />
        </Link>
      </div>
      
      <div className="p-4 flex flex-col h-48">
        <Link to={`/product/${product.id}`} className="hover:text-electroestelar-orange">
          <h3 className="font-medium text-lg mb-2 line-clamp-2">{product.name}</h3>
        </Link>
        
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xl font-bold text-electroestelar-blue">
              {formatPrice(product.price)}
            </span>
            <div className="text-sm bg-electroestelar-orange/10 text-electroestelar-orange px-2 py-1 rounded-full">
              Compra Segura
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Link to={`/product/${product.id}`}>
              <Button 
                variant="outline" 
                className="w-full border-electroestelar-blue text-electroestelar-blue hover:bg-electroestelar-blue hover:text-white"
              >
                Ver Más
              </Button>
            </Link>
            
            <Button 
              className="w-full bg-electroestelar-orange hover:bg-electroestelar-orange/90 text-white flex items-center justify-center gap-2"
              onClick={() => addToCart(product)}
            >
              <ShoppingCart size={16} />
              <span>Agregar</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
