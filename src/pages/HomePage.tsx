
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import TestimonialCard from '@/components/TestimonialCard';
import { categories, featuredProducts } from '@/data/products';

const testimonials = [
  {
    name: "Carolina Restrepo",
    content: "Compré un sofá y llegó en perfecto estado. El servicio fue impecable y la calidad excepcional. Definitivamente volveré a comprar aquí.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5
  },
  {
    name: "Andrés Martínez",
    content: "Mi televisor llegó en tiempo récord y la instalación fue muy sencilla. El precio fue excelente comparado con otras tiendas.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4
  },
  {
    name: "Mariana Ochoa",
    content: "La laptop que compré superó mis expectativas. El proceso de compra fue rápido y el equipo me llegó con todas las especificaciones prometidas.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5
  }
];

const HomePage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden -mt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-electroestelar-blue/90 to-electroestelar-darkblue/70" />
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1600494603989-9650cf6ddd3d')",
            filter: "contrast(1.1)"
          }}
        />
        
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-start text-white">
          <div className="max-w-xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Tu hogar, <span className="text-electroestelar-orange">tu estilo</span>
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Muebles, electrodomésticos y tecnología para transformar tus espacios con elegancia y funcionalidad.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/category/furniture">
                <Button className="bg-electroestelar-orange hover:bg-electroestelar-orange/90 text-white">
                  Explorar ahora
                </Button>
              </Link>
              <Link to="/category/technology">
                <Button variant="outline" className="text-white border-white hover:bg-white/10">
                  Ver ofertas
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Nuestras Categorías</h2>
            <p className="text-gray-600">Explora nuestra selección de productos de alta calidad</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link 
                key={category.id} 
                to={`/category/${category.id}`}
                className={`relative overflow-hidden rounded-lg shadow-lg group h-64 transform transition-transform duration-300 ease-in-out hover:scale-[1.02] animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-electroestelar-blue/80 via-electroestelar-blue/40 to-transparent" />
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                  <p className="text-sm opacity-90 mb-3">{category.description}</p>
                  
                  <div className="flex items-center text-sm">
                    <span>Ver productos</span>
                    <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold">Productos Destacados</h2>
              <p className="text-gray-600">Lo mejor de nuestra selección</p>
            </div>
            
            <Link to="/category/appliances">
              <Button variant="outline" className="hidden md:flex items-center gap-2">
                Ver todos <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <div 
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link to="/category/appliances">
              <Button variant="outline" className="flex items-center gap-2 mx-auto">
                Ver todos <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Por qué elegirnos</h2>
            <p className="text-gray-600">Nuestro compromiso es brindarte la mejor experiencia</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="h-16 w-16 bg-electroestelar-orange/10 text-electroestelar-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                  <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                  <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                  <circle cx="12" cy="20" r="1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Envíos Rápidos</h3>
              <p className="text-gray-600">Recibe tus productos en la puerta de tu casa con envío rápido y seguro.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="h-16 w-16 bg-electroestelar-blue/10 text-electroestelar-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Garantía de Calidad</h3>
              <p className="text-gray-600">Todos nuestros productos cuentan con garantía para tu tranquilidad.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="h-16 w-16 bg-electroestelar-orange/10 text-electroestelar-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                  <line x1="6" x2="6" y1="1" y2="4" />
                  <line x1="10" x2="10" y1="1" y2="4" />
                  <line x1="14" x2="14" y1="1" y2="4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Soporte Humano</h3>
              <p className="text-gray-600">Atención personalizada a través de nuestros canales de contacto.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Testimonios</h2>
            <p className="text-gray-300">Lo que dicen nuestros clientes</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-electroestelar-orange">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Listo para transformar tus espacios?
          </h2>
          <p className="text-white opacity-90 max-w-2xl mx-auto mb-8">
            Explora nuestra colección completa y encuentra los productos perfectos para tu hogar u oficina.
          </p>
          
          <Link to="/category/furniture">
            <Button size="lg" className="bg-white text-electroestelar-orange hover:bg-white/90">
              Explorar ahora
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
