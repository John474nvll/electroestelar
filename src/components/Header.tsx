
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { categories } from '@/data/products';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-md shadow-md py-2' 
        : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-electroestelar-blue text-2xl font-bold">
            Electro<span className="text-electroestelar-orange">Estelar</span>
          </span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          {categories.map(category => (
            <Link 
              key={category.id}
              to={`/category/${category.id}`}
              className="text-electroestelar-blue hover:text-electroestelar-orange transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Search size={20} />
          </Button>
          
          <Link to="/user">
            <Button variant="ghost" size="icon">
              <User size={20} />
            </Button>
          </Link>
          
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-electroestelar-orange text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
        </div>
        
        <div className="flex md:hidden items-center space-x-2">
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-electroestelar-orange text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-slide-down">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {categories.map(category => (
              <Link 
                key={category.id}
                to={`/category/${category.id}`}
                className="text-electroestelar-blue hover:text-electroestelar-orange transition-colors py-2 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
            <div className="py-2">
              <Button className="w-full flex items-center justify-center space-x-2">
                <Search size={18} />
                <span>Buscar productos</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
