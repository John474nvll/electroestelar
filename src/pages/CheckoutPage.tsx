
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import CheckoutForm from '@/components/CheckoutForm';
import CheckoutSummary from '@/components/CheckoutSummary';
import { useCart } from '@/context/CartContext';
import { ArrowLeft } from 'lucide-react';

const CheckoutPage = () => {
  const { items, totalPrice } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Link to="/cart" className="inline-flex items-center text-electroestelar-blue mb-8 hover:text-electroestelar-orange">
          <ArrowLeft size={16} className="mr-2" />
          Regresar al carrito
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CheckoutForm />
          </div>
          <div className="lg:col-span-1">
            <CheckoutSummary />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
