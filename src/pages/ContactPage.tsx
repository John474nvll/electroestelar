
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import InfoCard from '@/components/InfoCard';
import Map from '@/components/Map';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';

const ContactPage = () => {
  return (
    <Layout>
      <PageHero
        title="Contáctanos"
        description="Estamos aquí para ayudarte con cualquier consulta que tengas."
        imageSrc="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-8">Información de Contacto</h2>
            <div className="grid gap-6">
              <InfoCard
                icon={MapPin}
                title="Nuestra Bodega Principal"
                content="Calle 23d # 71d-67, Bogotá, Colombia"
              />
              <InfoCard
                icon={Mail}
                title="Correo Electrónico"
                content={<a href="mailto:info@electroestelar.com" className="text-electroestelar-orange hover:underline">info@electroestelar.com</a>}
              />
              <InfoCard
                icon={Phone}
                title="Teléfono"
                content={<a href="tel:+573107722311" className="text-electroestelar-orange hover:underline">+57 310 772 2311</a>}
              />
              <InfoCard
                icon={Clock}
                title="Horario de Atención"
                content={
                  <div>
                    <p>Lunes a Viernes: 8:00 AM - 6:00 PM</p>
                    <p>Sábados: 9:00 AM - 2:00 PM</p>
                  </div>
                }
              />
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold mb-8">Nuestra Ubicación</h2>
            <Map />
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6">Servicio al Cliente</h2>
          <p className="text-lg text-gray-600 mb-6">
            Nuestro equipo de atención al cliente está disponible para ayudarte con:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
              "Consultas sobre productos y disponibilidad",
              "Estado de pedidos y envíos",
              "Devoluciones y garantías",
              "Soporte técnico post-venta",
              "Cotizaciones para clientes empresariales"
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-2 text-gray-700">
                <span className="text-electroestelar-orange">•</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="text-sm text-gray-500">
            Tiempo promedio de respuesta: 24 horas hábiles
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
