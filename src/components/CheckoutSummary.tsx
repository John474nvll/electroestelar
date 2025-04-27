
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/formatters';
import { Package } from 'lucide-react';

const CheckoutSummary = () => {
  const { items, totalPrice } = useCart();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
      <h2 className="text-xl font-semibold mb-4 text-electroestelar-blue">Resumen de la orden</h2>
      
      <div className="space-y-4 mb-4">
        <div className="max-h-60 overflow-y-auto space-y-4">
          {items.map((item) => (
            <div key={item.product.id} className="flex items-start space-x-4">
              <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-medium text-sm">{item.product.name}</h3>
                <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                <p className="text-sm font-medium">
                  {formatPrice(item.product.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">{formatPrice(totalPrice)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Envío</span>
          <span className="font-medium text-green-600">Gratis</span>
        </div>
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <div className="text-sm text-gray-500 text-right">Incluye impuestos</div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-md flex items-start space-x-3">
        <Package className="text-blue-500 flex-shrink-0 mt-1" size={20} />
        <p className="text-sm text-blue-700">
          Tu pedido será enviado a la dirección que especifiques en el formulario.
        </p>
      </div>
    </div>
  );
};

export default CheckoutSummary;
