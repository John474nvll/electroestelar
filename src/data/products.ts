export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  rating: number;
}

export const categories = [
  {
    id: 'furniture',
    name: 'Muebles',
    description: 'Encuentra los mejores muebles para tu hogar',
    image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5'
  },
  {
    id: 'appliances',
    name: 'Electrodomésticos',
    description: 'Electrodomésticos de última generación',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f'
  },
  {
    id: 'technology',
    name: 'Tecnología',
    description: 'Los mejores dispositivos tecnológicos',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03'
  }
];

export const featuredProducts: Product[] = [
  {
    id: 'sofa-001',
    name: 'Sofá Modular Moderno',
    description: 'Un sofá cómodo y elegante para tu sala de estar.',
    price: 799.99,
    imageUrl: 'https://images.unsplash.com/photo-1549488348-604e6c7c74e4',
    category: 'furniture',
    rating: 4.5
  },
  {
    id: 'tv-002',
    name: 'Smart TV 4K Ultra HD',
    description: 'Disfruta de tus películas y series con la mejor calidad de imagen.',
    price: 449.00,
    imageUrl: 'https://images.unsplash.com/photo-1517702188963-c4954ff11c85',
    category: 'technology',
    rating: 4.8
  },
  {
    id: 'refrigerator-003',
    name: 'Refrigerador de Acero Inoxidable',
    description: 'Mantén tus alimentos frescos y organizados con este refrigerador de alta eficiencia.',
    price: 899.50,
    imageUrl: 'https://images.unsplash.com/photo-1615886775487-bb33defb9865',
    category: 'appliances',
    rating: 4.2
  },
  {
    id: 'laptop-004',
    name: 'Laptop Ultraligera',
    description: 'Ideal para trabajar y estudiar, con batería de larga duración.',
    price: 1199.00,
    imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1b5cb712',
    category: 'technology',
    rating: 4.9
  }
];

export const products: Product[] = [
  {
    id: 'dining-table-005',
    name: 'Mesa de Comedor de Madera Maciza',
    description: 'Una mesa robusta y elegante para tus comidas familiares.',
    price: 549.00,
    imageUrl: 'https://images.unsplash.com/photo-1533476424946-899969914981',
    category: 'furniture',
    rating: 4.6
  },
  {
    id: 'washing-machine-006',
    name: 'Lavadora Automática de Carga Frontal',
    description: 'Lava tu ropa de manera eficiente y silenciosa.',
    price: 679.00,
    imageUrl: 'https://images.unsplash.com/photo-1621784445692-599c9dc18b94',
    category: 'appliances',
    rating: 4.3
  },
  {
    id: 'smartphone-007',
    name: 'Smartphone de Última Generación',
    description: 'Captura tus mejores momentos con su cámara de alta resolución.',
    price: 999.00,
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5efc6764ca58',
    category: 'technology',
    rating: 4.7
  },
  {
    id: 'microwave-008',
    name: 'Microondas con Grill',
    description: 'Calienta y cocina tus alimentos de manera rápida y sencilla.',
    price: 129.99,
    imageUrl: 'https://images.unsplash.com/photo-1578357889450-48c88d4cca54',
    category: 'appliances',
    rating: 4.0
  },
  {
    id: 'office-chair-009',
    name: 'Silla de Oficina Ergonómica',
    description: 'Mantén una postura correcta y cómoda durante tus horas de trabajo.',
    price: 249.00,
    imageUrl: 'https://images.unsplash.com/photo-1560525796-e565599c3355',
    category: 'furniture',
    rating: 4.4
  },
  {
    id: 'blender-010',
    name: 'Licuadora de Alta Potencia',
    description: 'Prepara batidos y jugos deliciosos en segundos.',
    price: 79.50,
    imageUrl: 'https://images.unsplash.com/photo-1635344946978-9c51c38769f3',
    category: 'appliances',
    rating: 4.1
  },
  {
    id: 'headphones-011',
    name: 'Auriculares Inalámbricos con Cancelación de Ruido',
    description: 'Sumérgete en tu música favorita sin distracciones.',
    price: 199.00,
    imageUrl: 'https://images.unsplash.com/photo-1583395209138-0c4584069ca9',
    category: 'technology',
    rating: 4.8
  },
    {
    id: 'coffee-table-012',
    name: 'Mesa de Centro de Cristal',
    description: 'Elegante mesa de centro para complementar tu sala de estar.',
    price: 349.00,
    imageUrl: 'https://images.unsplash.com/photo-1532499649499-7e07e8f13c93',
    category: 'furniture',
    rating: 4.5
  },
  {
    id: 'oven-013',
    name: 'Horno Eléctrico Multifunción',
    description: 'Horno con múltiples funciones para cocinar tus platos favoritos.',
    price: 599.00,
    imageUrl: 'https://images.unsplash.com/photo-1574184790120-1473c8d80924',
    category: 'appliances',
    rating: 4.2
  },
  {
    id: 'tablet-014',
    name: 'Tablet de 10 Pulgadas',
    description: 'Tablet ideal para el entretenimiento y la productividad.',
    price: 299.00,
    imageUrl: 'https://images.unsplash.com/photo-1546868871-717ba09c569e',
    category: 'technology',
    rating: 4.6
  }
];

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.category === categoryId);
};
