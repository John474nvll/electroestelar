
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';

const AboutPage = () => {
  return (
    <Layout>
      <PageHero
        title="Sobre Nosotros"
        description="Descubre nuestra historia y nuestra misión de ofrecer los mejores productos para el hogar y la tecnología en Colombia."
        imageSrc="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Nuestra Historia</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                Electro Estelar nació en 2018 con un propósito claro: transformar la forma en que los colombianos compran muebles, Electrodomésticos y tecnología. Fundada por emprendedores con experiencia en diseño, tecnología y comercio electrónico, nuestra empresa comenzó con un pequeño catálogo de productos cuidadosamente seleccionados.
              </p>
              <p className="text-gray-600 mb-6">
                Con el paso de los años, hemos crecido hasta convertirnos en una de las tiendas online de referencia en Colombia, ampliando nuestro catálogo para ofrecer miles de productos de alta calidad en las categorías de muebles, electrónica y tecnología.
              </p>
              <p className="text-gray-600">
                Hoy, nos enorgullece haber servido a más de 10,000 clientes satisfechos en todo el país, manteniendo siempre nuestro compromiso con la calidad, el servicio y la innovación.
              </p>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-electroestelar-blue text-white rounded-lg p-6 text-center">
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-white/80">Clientes Satisfechos</div>
            </div>
            <div className="bg-electroestelar-orange text-white rounded-lg p-6 text-center">
              <div className="text-4xl font-bold mb-2">2018</div>
              <div className="text-white/80">Año de Fundación</div>
            </div>
            <div className="bg-electroestelar-blue text-white rounded-lg p-6 text-center">
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-white/80">Productos en Catálogo</div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
