
export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  featured?: boolean;
};

export const categories = [
  {
    id: "furniture",
    name: "Muebles",
    description: "Diseños que transforman tu espacio. Confort y estilo para cada rincón de tu hogar.",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04"
  },
  {
    id: "appliances",
    name: "Electrodomésticos",
    description: "Disfruta del sonido, la imagen y la innovación. Tecnología que se escucha y se siente.",
    image: "https://images.unsplash.com/photo-1588854337115-1c67d9247e4d"
  },
  {
    id: "technology",
    name: "Tecnología",
    description: "Equipos de alto rendimiento para mentes brillantes. Conéctate con el futuro, hoy mismo.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
  }
];

export const products: Product[] = [
  // Furniture
  {
    id: "f1",
    name: "Sofá Moderno Gris",
    price: 1299000,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
    category: "furniture",
    description: "Sofá moderno de 3 puestos con tapizado de alta calidad en color gris. Ideal para espacios contemporáneos.",
    featured: true
  },
  {
    id: "f2",
    name: "Mesa de Centro Minimalista",
    price: 499000,
    image: "https://images.unsplash.com/photo-1532372320572-cda25653a58d",
    category: "furniture",
    description: "Mesa de centro con diseño minimalista, estructura de metal negro y superficie de vidrio templado."
  },
  {
    id: "f3",
    name: "Silla Ergonómica de Oficina",
    price: 749000,
    image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1",
    category: "furniture",
    description: "Silla ergonómica para oficina con soporte lumbar, altura ajustable y reposabrazos cómodos."
  },
  {
    id: "f4",
    name: "Estantería Modular",
    price: 899000,
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2",
    category: "furniture",
    description: "Estantería modular personalizable para organizar libros y decoración. Fabricada en madera de alta calidad."
  },
  
  // Appliances
  {
    id: "a1",
    name: "Smart TV 55\" 4K UHD",
    price: 2199000,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1",
    category: "appliances",
    description: "Televisor Smart TV de 55 pulgadas con resolución 4K UHD, sistema operativo inteligente y múltiples conexiones.",
    featured: true
  },
  {
    id: "a2",
    name: "Nevera Side by Side",
    price: 3599000,
    image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30",
    category: "appliances",
    description: "Nevera side by side con dispensador de agua, hielo y tecnología de enfriamiento uniforme."
  },
  {
    id: "a3",
    name: "Parlante Bluetooth Premium",
    price: 699000,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
    category: "appliances",
    description: "Parlante Bluetooth con sonido envolvente, resistente al agua y batería de larga duración.",
    featured: true
  },
  {
    id: "a4",
    name: "Lavadora Carga Frontal",
    price: 1899000,
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1",
    category: "appliances",
    description: "Lavadora de carga frontal de 17kg con múltiples ciclos de lavado y tecnología de ahorro de agua."
  },
  
  // Technology
  {
    id: "t1",
    name: "Laptop Premium 15\"",
    price: 3299000,
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    category: "technology",
    description: "Laptop de 15 pulgadas con procesador de última generación, memoria RAM de 16GB y disco SSD de 512GB.",
    featured: true
  },
  {
    id: "t2",
    name: "Smartphone Avanzado",
    price: 2499000,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
    category: "technology",
    description: "Smartphone con pantalla AMOLED de 6.5\", cámara profesional de 108MP y batería de larga duración."
  },
  {
    id: "t3",
    name: "Audífonos Inalámbricos",
    price: 599000,
    image: "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b",
    category: "technology",
    description: "Audífonos inalámbricos con cancelación de ruido activa, sonido envolvente y estuche de carga."
  },
  {
    id: "t4",
    name: "Tableta Gráfica",
    price: 1199000,
    image: "https://images.unsplash.com/photo-1585790050230-5352c5516f9a",
    category: "technology",
    description: "Tableta gráfica profesional con lápiz sensible a la presión, ideal para diseñadores y artistas digitales."
  }
];

export const featuredProducts = products.filter(product => product.featured);

export const getProductsByCategory = (categoryId: string) => {
  return products.filter(product => product.category === categoryId);
};

export const getProductById = (productId: string) => {
  return products.find(product => product.id === productId);
};
