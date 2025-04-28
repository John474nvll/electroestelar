
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { getProductById, getProductsByCategory, Product } from '@/data/products';
import { formatPrice } from '@/utils/formatters';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';
import QuantitySelector from '@/components/QuantitySelector';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    if (productId) {
      setIsLoading(true);
      
      // Get product details
      const productDetails = getProductById(productId);
      setProduct(productDetails);
      
      // Get related products (same category)
      if (productDetails) {
        const categoryProducts = getProductsByCategory(productDetails.category)
          .filter((p) => p.id !== productDetails.id)
          .slice(0, 4);
        setRelatedProducts(categoryProducts);
      }
      
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      // Add product multiple times based on quantity
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
    }
  };

  if (!product && !isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Producto no encontrado</h2>
            <p className="mb-8">Lo sentimos, el producto que estás buscando no existe.</p>
            <Link to="/">
              <Button>Volver al inicio</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-lg bg-gray-100 animate-pulse h-96"></div>
            <div className="space-y-4">
              <div className="h-10 bg-gray-100 animate-pulse rounded"></div>
              <div className="h-6 bg-gray-100 animate-pulse rounded w-1/2"></div>
              <div className="h-28 bg-gray-100 animate-pulse rounded"></div>
              <div className="h-12 bg-gray-100 animate-pulse rounded w-1/3"></div>
              <div className="h-12 bg-gray-100 animate-pulse rounded"></div>
            </div>
          </div>
        ) : product ? (
          <>
            <Link to={`/category/${product.category}`} className="inline-flex items-center text-electroestelar-blue mb-8 hover:text-electroestelar-orange">
              <ArrowLeft size={16} className="mr-2" />
              Volver a {product.category === 'furniture' ? 'Muebles' : product.category === 'appliances' ? 'Electrodomésticos' : 'Tecnología'}
            </Link>
          
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Product Image */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-auto object-cover aspect-square"
                />
              </div>
              
              {/* Product Info */}
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-electroestelar-blue">{product.name}</h1>
                
                <div className="flex items-center">
                  <div className="px-3 py-1 bg-electroestelar-orange/10 text-electroestelar-orange rounded-full text-sm font-medium">
                    Compra 100% segura
                  </div>
                  <div className="ml-3 text-gray-500 text-sm">
                    Envío rápido
                  </div>
                </div>
                
                <div className="text-4xl font-bold text-electroestelar-blue">
                  {formatPrice(product.price)}
                </div>
                
                <hr className="border-gray-200" />
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Descripción</h3>
                  <p className="text-gray-600">{product.description}</p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className="font-medium">Cantidad:</span>
                  <QuantitySelector 
                    quantity={quantity} 
                    onIncrease={() => setQuantity(prev => prev + 1)} 
                    onDecrease={() => setQuantity(prev => Math.max(1, prev - 1))}
                  />
                </div>
                
                <div className="pt-4">
                  <Button 
                    size="lg" 
                    className="w-full bg-electroestelar-orange hover:bg-electroestelar-orange/90 flex items-center justify-center gap-2"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart size={20} />
                    <span>Agregar al carrito</span>
                  </Button>
                </div>
                
                <div className="bg-electroestelar-blue/5 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Métodos de pago</h4>
                  <div className="flex flex-wrap gap-2">
                    <div className="text-sm px-3 py-1 bg-white border border-gray-200 rounded">Nequi</div>
                    <div className="text-sm px-3 py-1 bg-white border border-gray-200 rounded">Tarjetas de Crédito</div>
                    <div className="text-sm px-3 py-1 bg-white border border-gray-200 rounded">PSE</div>
                    <div className="text-sm px-3 py-1 bg-white border border-gray-200 rounded">Sistecredito</div>
                    <div className="text-sm px-3 py-1 bg-white border border-gray-200 rounded">Contra Entrega</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl font-bold mb-6">Productos relacionados</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {relatedProducts.map((relatedProduct) => (
                    <ProductCard key={relatedProduct.id} product={relatedProduct} />
                  ))}
                </div>
              </div>
            )}
          </>
        ) : null}
      </div>
    </Layout>
  );
};

export default ProductDetail;
