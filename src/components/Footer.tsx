
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error("Por favor ingrese un correo electrónico válido");
      return;
    }
    
    toast.success("¡Te has suscrito exitosamente!", {
      description: "Recibirás nuestras ofertas exclusivas."
    });
    setEmail('');
  };

  return (
    <footer className="bg-electroestelar-blue text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              Electro<span className="text-electroestelar-orange">Estelar</span>
            </h3>
            <p className="text-gray-300 mb-4">
              Transformando tu experiencia de compra en una aventura fácil y agradable.
            </p>
            <div className="flex space-x-2">
              <Button size="icon" variant="ghost" className="hover:bg-electroestelar-orange/20">
                <Instagram size={20} />
              </Button>
              <Button size="icon" variant="ghost" className="hover:bg-electroestelar-orange/20">
                <Facebook size={20} />
              </Button>
              <Button size="icon" variant="ghost" className="hover:bg-electroestelar-orange/20">
                <Twitter size={20} />
              </Button>
            </div>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categorías</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/category/furniture" className="text-gray-300 hover:text-electroestelar-orange transition-colors">
                  Muebles
                </Link>
              </li>
              <li>
                <Link to="/category/appliances" className="text-gray-300 hover:text-electroestelar-orange transition-colors">
                  Electrodomésticos
                </Link>
              </li>
              <li>
                <Link to="/category/technology" className="text-gray-300 hover:text-electroestelar-orange transition-colors">
                  Tecnología
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-gray-300">
                <Phone size={18} />
                <span>+57 310-7722311</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-300">
                <Mail size={18} />
                <span>info@electroestelar.com</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Suscríbete a nuestro Newsletter</h3>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <Input 
                type="email" 
                placeholder="Tu correo electrónico" 
                className="bg-electroestelar-darkblue border-electroestelar-lightblue/30 focus:border-electroestelar-orange text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button 
                type="submit" 
                variant="default" 
                className="w-full bg-electroestelar-orange hover:bg-electroestelar-orange/80"
              >
                Suscribirme
              </Button>
            </form>
          </div>
        </div>
        
        <hr className="my-8 border-electroestelar-darkblue" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-gray-300 text-sm">
            © 2025 ElectroEstelar. Todos los derechos reservados.
          </div>
          
          <div className="text-gray-300 text-sm md:text-right">
            <div className="flex flex-wrap justify-start md:justify-end gap-4">
              <span>Métodos de Pago:</span>
              <span>Nequi</span>
              <span>Tarjetas de Crédito</span>
              <span>PSE</span>
              <span>Sistecredito</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
