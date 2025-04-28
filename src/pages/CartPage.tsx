import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Trash2, AlertCircle } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/formatters';
import QuantitySelector from '@/components/QuantitySelector';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-electroestelar-blue mb-8 hover:text-electroestelar-orange">
          <ArrowLeft size={16} className="mr-2" />
          Seguir comprando
        </Link>
        
        <div className="flex items-center mb-8">
          <ShoppingCart size={24} className="mr-3 text-electroestelar-blue" />
          <h1 className="text-3xl font-bold text-electroestelar-blue">Tu Carrito</h1>
        </div>
        
        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="flex justify-center mb-4">
              <ShoppingCart size={64} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-medium mb-4">Tu carrito está vacío</h2>
            <p className="text-gray-500 mb-8">Parece que aún no has agregado productos a tu carrito.</p>
            <Link to="/">
              <Button className="bg-electroestelar-blue hover:bg-electroestelar-blue/90">
                Explorar productos
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 bg-electroestelar-blue/5">
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-7 font-medium">Producto</div>
                    <div className="col-span-2 font-medium">Cantidad</div>
                    <div className="col-span-2 font-medium text-right">Precio</div>
                    <div className="col-span-1"></div>
                  </div>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <div key={item.product.id} className="p-4 grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-7">
                        <div className="flex items-center">
                          <div className="w-16 h-16 rounded-md overflow-hidden mr-4 flex-shrink-0">
                            <img 
                              src={item.product.image} 
                              alt={item.product.name} 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <div>
                            <Link to={`/product/${item.product.id}`} className="font-medium hover:text-electroestelar-orange">
                              {item.product.name}
                            </Link>
                            <div className="text-sm text-gray-500">
                              {item.product.category === 'furniture' ? 'Muebles' : 
                               item.product.category === 'appliances' ? 'Electrodomésticos' : 'Tecnología'}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-span-2">
                        <QuantitySelector
                          quantity={item.quantity}
                          onIncrease={() => updateQuantity(item.product.id, item.quantity + 1)}
                          onDecrease={() => updateQuantity(item.product.id, item.quantity - 1)}
                        />
                      </div>
                      
                      <div className="col-span-2 text-right">
                        <div className="font-medium">
                          {formatPrice(item.product.price * item.quantity)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatPrice(item.product.price)} / unidad
                        </div>
                      </div>
                      
                      <div className="col-span-1 text-right">
                        <Button 
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-gray-500 hover:text-electroestelar-orange"
                        >
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 border-t border-gray-200">
                  <Button 
                    variant="outline"
                    className="text-gray-500"
                    onClick={clearCart}
                  >
                    <Trash2 size={16} className="mr-2" />
                    Vaciar carrito
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Resumen de la orden</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatPrice(totalPrice)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Envío</span>
                    <span className="font-medium">Gratuito</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="text-sm text-gray-500 text-right">Incluye impuestos</div>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-electroestelar-orange hover:bg-electroestelar-orange/90 mb-4"
                  onClick={handleCheckout}
                >
                  Finalizar compra
                </Button>
                
                <div className="bg-blue-50 border border-blue-200 rounded p-3 flex">
                  <AlertCircle size={18} className="text-blue-500 mr-2 flex-shrink-0" />
                  <p className="text-sm text-blue-700">
                    Este es un sitio de demostración, no se realizarán cargos reales.
                  </p>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-2">Métodos de pago aceptados</h3>
                  <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                    <div className="px-2 py-1 border border-gray-200 rounded">Nequi</div>
                    <div className="px-2 py-1 border border-gray-200 rounded">Tarjetas</div>
                    <div className="px-2 py-1 border border-gray-200 rounded">PSE</div>
                    <div className="px-2 py-1 border border-gray-200 rounded">Sistecredito</div>
                    <div className="px-2 py-1 border border-gray-200 rounded">Contra Entrega</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
