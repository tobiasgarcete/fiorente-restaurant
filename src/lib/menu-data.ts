import { MenuItem, Category, BusinessHours, ContactInfo } from './types';

/**
 * Menu categories for Fiorente restaurant
 */
export const categories: Category[] = [
  { id: 'pizzas', name: 'Pizzas', icon: '🍕' },
  { id: 'empanadas', name: 'Empanadas', icon: '🥟' },
  { id: 'picadas', name: 'Picadas', icon: '🧀' },
  { id: 'sandwiches', name: 'Sandwiches', icon: '🥪' },
  { id: 'cafeteria', name: 'Cafetería', icon: '☕' },
  { id: 'bebidas', name: 'Bebidas', icon: '🥤' },
  { id: 'cervezas', name: 'Cervezas', icon: '🍺' },
  { id: 'tragos', name: 'Tragos', icon: '🍹' },
  { id: 'postres', name: 'Postres', icon: '🍰' },
];

/**
 * Menu items for Fiorente restaurant
 * Prices are in Argentine Pesos (ARS)
 */
export const menuItems: MenuItem[] = [
  // Pizzas
  {
    id: 'pizza-1',
    name: 'Pizza Muzzarella',
    description: 'Salsa de tomate, muzzarella y aceitunas',
    price: 8500,
    category: 'pizzas',
    image: '/images/pizza-muzzarella.jpg',
    featured: true,
    available: true,
  },
  {
    id: 'pizza-2',
    name: 'Pizza Napolitana',
    description: 'Salsa de tomate, muzzarella, tomate fresco y ajo',
    price: 9500,
    category: 'pizzas',
    image: '/images/pizza-napolitana.jpg',
    featured: true,
    available: true,
  },
  {
    id: 'pizza-3',
    name: 'Pizza Fugazzeta',
    description: 'Abundante cebolla y muzzarella',
    price: 9000,
    category: 'pizzas',
    image: '/images/pizza-fugazzeta.jpg',
    available: true,
  },
  {
    id: 'pizza-4',
    name: 'Pizza Calabresa',
    description: 'Salsa de tomate, muzzarella y rodajas de calabresa',
    price: 10000,
    category: 'pizzas',
    image: '/images/pizza-calabresa.jpg',
    featured: true,
    available: true,
  },
  {
    id: 'pizza-5',
    name: 'Pizza Jamón y Morrones',
    description: 'Salsa de tomate, muzzarella, jamón cocido y morrones',
    price: 10500,
    category: 'pizzas',
    image: '/images/pizza-jamon-morrones.jpg',
    available: true,
  },
  {
    id: 'pizza-6',
    name: 'Pizza Especial Fiorente',
    description: 'Nuestra especialidad con ingredientes premium',
    price: 12000,
    category: 'pizzas',
    image: '/images/pizza-especial.jpg',
    featured: true,
    available: true,
  },

  // Empanadas
  {
    id: 'empanada-1',
    name: 'Empanada de Carne',
    description: 'Carne cortada a cuchillo con especias',
    price: 1200,
    category: 'empanadas',
    image: '/images/empanada-carne.jpg',
    available: true,
  },
  {
    id: 'empanada-2',
    name: 'Empanada de Jamón y Queso',
    description: 'Jamón cocido y queso cremoso',
    price: 1200,
    category: 'empanadas',
    image: '/images/empanada-jamon-queso.jpg',
    available: true,
  },
  {
    id: 'empanada-3',
    name: 'Empanada de Pollo',
    description: 'Pollo desmenuzado con cebolla y morrón',
    price: 1200,
    category: 'empanadas',
    image: '/images/empanada-pollo.jpg',
    available: true,
  },
  {
    id: 'empanada-4',
    name: 'Empanada de Humita',
    description: 'Choclo cremoso con especias',
    price: 1200,
    category: 'empanadas',
    image: '/images/empanada-humita.jpg',
    available: true,
  },
  {
    id: 'empanada-5',
    name: 'Empanada Caprese',
    description: 'Tomate, muzzarella y albahaca',
    price: 1300,
    category: 'empanadas',
    image: '/images/empanada-caprese.jpg',
    available: true,
  },

  // Picadas
  {
    id: 'picada-1',
    name: 'Picada para 2',
    description: 'Selección de fiambres, quesos, aceitunas y grisines',
    price: 8000,
    category: 'picadas',
    image: '/images/picada-2.jpg',
    available: true,
  },
  {
    id: 'picada-2',
    name: 'Picada para 4',
    description: 'Variedad completa de fiambres, quesos y acompañamientos',
    price: 14000,
    category: 'picadas',
    image: '/images/picada-4.jpg',
    featured: true,
    available: true,
  },
  {
    id: 'picada-3',
    name: 'Picada Premium',
    description: 'Selección gourmet con fiambres y quesos premium',
    price: 18000,
    category: 'picadas',
    image: '/images/picada-premium.jpg',
    available: true,
  },

  // Sandwiches
  {
    id: 'sandwich-1',
    name: 'Sandwich de Milanesa',
    description: 'Milanesa de carne con lechuga, tomate y mayonesa',
    price: 5500,
    category: 'sandwiches',
    image: '/images/sandwich-milanesa.jpg',
    available: true,
  },
  {
    id: 'sandwich-2',
    name: 'Sandwich de Lomo',
    description: 'Lomo a la plancha con huevo, jamón y queso',
    price: 7000,
    category: 'sandwiches',
    image: '/images/sandwich-lomo.jpg',
    featured: true,
    available: true,
  },
  {
    id: 'sandwich-3',
    name: 'Sandwich Vegetariano',
    description: 'Vegetales grillados con queso y pesto',
    price: 4500,
    category: 'sandwiches',
    image: '/images/sandwich-vegetariano.jpg',
    available: true,
  },

  // Cafetería
  {
    id: 'cafe-1',
    name: 'Café Espresso',
    description: 'Café espresso simple',
    price: 1500,
    category: 'cafeteria',
    image: '/images/cafe-espresso.jpg',
    available: true,
  },
  {
    id: 'cafe-2',
    name: 'Café con Leche',
    description: 'Café con leche cremosa',
    price: 2000,
    category: 'cafeteria',
    image: '/images/cafe-con-leche.jpg',
    available: true,
  },
  {
    id: 'cafe-3',
    name: 'Cappuccino',
    description: 'Espresso con leche espumada y cacao',
    price: 2500,
    category: 'cafeteria',
    image: '/images/cappuccino.jpg',
    available: true,
  },
  {
    id: 'cafe-4',
    name: 'Submarino',
    description: 'Leche caliente con barra de chocolate',
    price: 2800,
    category: 'cafeteria',
    image: '/images/submarino.jpg',
    available: true,
  },
  {
    id: 'cafe-5',
    name: 'Medialunas (x3)',
    description: 'Medialunas de manteca recién horneadas',
    price: 2000,
    category: 'cafeteria',
    image: '/images/medialunas.jpg',
    available: true,
  },

  // Bebidas
  {
    id: 'bebida-1',
    name: 'Agua Mineral 500ml',
    description: 'Agua mineral con o sin gas',
    price: 1200,
    category: 'bebidas',
    image: '/images/agua.jpg',
    available: true,
  },
  {
    id: 'bebida-2',
    name: 'Coca-Cola 500ml',
    description: 'Gaseosa línea Coca-Cola',
    price: 1800,
    category: 'bebidas',
    image: '/images/coca-cola.jpg',
    available: true,
  },
  {
    id: 'bebida-3',
    name: 'Jugo Natural',
    description: 'Jugo de naranja o pomelo exprimido',
    price: 2500,
    category: 'bebidas',
    image: '/images/jugo-natural.jpg',
    available: true,
  },
  {
    id: 'bebida-4',
    name: 'Limonada',
    description: 'Limonada casera con menta',
    price: 2200,
    category: 'bebidas',
    image: '/images/limonada.jpg',
    available: true,
  },

  // Cervezas
  {
    id: 'cerveza-1',
    name: 'Cerveza Quilmes 500ml',
    description: 'Cerveza rubia tradicional',
    price: 2500,
    category: 'cervezas',
    image: '/images/cerveza-quilmes.jpg',
    available: true,
  },
  {
    id: 'cerveza-2',
    name: 'Cerveza Stella Artois 500ml',
    description: 'Cerveza lager premium',
    price: 3000,
    category: 'cervezas',
    image: '/images/cerveza-stella.jpg',
    available: true,
  },
  {
    id: 'cerveza-3',
    name: 'Cerveza Patagonia 500ml',
    description: 'Cerveza artesanal argentina',
    price: 3500,
    category: 'cervezas',
    image: '/images/cerveza-patagonia.jpg',
    available: true,
  },
  {
    id: 'cerveza-4',
    name: 'Pinta de Cerveza Tirada',
    description: 'Cerveza tirada del día',
    price: 2800,
    category: 'cervezas',
    image: '/images/cerveza-tirada.jpg',
    featured: true,
    available: true,
  },

  // Tragos
  {
    id: 'trago-1',
    name: 'Fernet con Coca',
    description: 'Clásico argentino con Coca-Cola',
    price: 4000,
    category: 'tragos',
    image: '/images/fernet.jpg',
    available: true,
  },
  {
    id: 'trago-2',
    name: 'Mojito',
    description: 'Ron, menta, lima y soda',
    price: 5000,
    category: 'tragos',
    image: '/images/mojito.jpg',
    featured: true,
    available: true,
  },
  {
    id: 'trago-3',
    name: 'Aperol Spritz',
    description: 'Aperol, prosecco y soda',
    price: 5500,
    category: 'tragos',
    image: '/images/aperol-spritz.jpg',
    available: true,
  },
  {
    id: 'trago-4',
    name: 'Gin Tonic',
    description: 'Gin premium con tónica y botánicos',
    price: 5500,
    category: 'tragos',
    image: '/images/gin-tonic.jpg',
    available: true,
  },
  {
    id: 'trago-5',
    name: 'Caipirinha',
    description: 'Cachaça, lima y azúcar',
    price: 4500,
    category: 'tragos',
    image: '/images/caipirinha.jpg',
    available: true,
  },

  // Postres
  {
    id: 'postre-1',
    name: 'Flan con Dulce de Leche',
    description: 'Flan casero con dulce de leche y crema',
    price: 3500,
    category: 'postres',
    image: '/images/flan.jpg',
    available: true,
  },
  {
    id: 'postre-2',
    name: 'Tiramisú',
    description: 'Clásico italiano con mascarpone y café',
    price: 4000,
    category: 'postres',
    image: '/images/tiramisu.jpg',
    featured: true,
    available: true,
  },
  {
    id: 'postre-3',
    name: 'Brownie con Helado',
    description: 'Brownie de chocolate con helado de crema',
    price: 4500,
    category: 'postres',
    image: '/images/brownie.jpg',
    available: true,
  },
];

/**
 * Featured items for the home page
 */
export const featuredItems = menuItems.filter((item) => item.featured);

/**
 * Restaurant business hours
 */
export const businessHours: BusinessHours[] = [
  { day: 'Lunes', open: '18:00', close: '00:00' },
  { day: 'Martes', open: '18:00', close: '00:00' },
  { day: 'Miércoles', open: '18:00', close: '00:00' },
  { day: 'Jueves', open: '18:00', close: '01:00' },
  { day: 'Viernes', open: '18:00', close: '02:00' },
  { day: 'Sábado', open: '18:00', close: '02:00' },
  { day: 'Domingo', open: '18:00', close: '00:00' },
];

/**
 * Restaurant contact information
 */
export const contactInfo: ContactInfo = {
  address: 'Av. 25 de Mayo 368, Formosa, Argentina 3600',
  phone: '3704858785',
  whatsapp: '5493704858785',
  instagram: '@fiorentepizzeriabarcafe',
};

/**
 * Get menu items by category
 */
export function getItemsByCategory(category: string): MenuItem[] {
  return menuItems.filter((item) => item.category === category && item.available);
}

/**
 * Get a single menu item by ID
 */
export function getItemById(id: string): MenuItem | undefined {
  return menuItems.find((item) => item.id === id);
}

/**
 * Search menu items by name or description
 */
export function searchItems(query: string): MenuItem[] {
  const lowerQuery = query.toLowerCase();
  return menuItems.filter(
    (item) =>
      item.available &&
      (item.name.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery))
  );
}
