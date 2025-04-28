
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { categories } from '@/data/products';
import { ArrowRight } from 'lucide-react';

const AllCategoriesPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Nuestras Categorías</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link 
              key={category.id} 
              to={`/category/${category.id}`}
              className="relative overflow-hidden rounded-lg shadow-lg group h-64 transform transition-transform duration-300 ease-in-out hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-electroestelar-blue/80 via-electroestelar-blue/40 to-transparent" />
              <img 
                src={category.image} 
                alt={category.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-sm opacity-90 mb-3">{category.description}</p>
                
                <div className="flex items-center text-sm group">
                  <span>Ver productos</span>
                  <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AllCategoriesPage;
