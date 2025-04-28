
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { getProductsByCategory, categories } from '@/data/products';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [category, setCategory] = useState<{ id: string; name: string; description: string }>();
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (categoryId) {
      setIsLoading(true);
      
      // Find category details
      const categoryDetails = categories.find((cat) => cat.id === categoryId);
      setCategory(categoryDetails);
      
      // Get products by category
      const categoryProducts = getProductsByCategory(categoryId);
      setProducts(categoryProducts);
      
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, [categoryId]);

  if (!category && !isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Categoría no encontrada</h2>
            <p className="mb-8">Lo sentimos, la categoría que estás buscando no existe.</p>
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
      {/* Hero Banner */}
      <div className="bg-electroestelar-blue text-white py-16">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center text-electroestelar-orange mb-6 hover:underline">
            <ArrowLeft size={16} className="mr-2" />
            Volver al inicio
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{category?.name}</h1>
          <p className="text-lg opacity-90 max-w-2xl">{category?.description}</p>
        </div>
      </div>
      
      {/* Product Grid */}
      <div className="container mx-auto px-4 py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-gray-100 rounded-lg animate-pulse h-96"></div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-2xl font-medium mb-4">No hay productos disponibles</h3>
            <p className="text-gray-600 mb-8">Lo sentimos, no hay productos disponibles en esta categoría en este momento.</p>
            <Link to="/">
              <Button>Ver otras categorías</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div 
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage;
