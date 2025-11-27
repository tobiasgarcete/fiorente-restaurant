/**
 * MenuItem - Represents a product in the restaurant menu
 */
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  featured?: boolean;
  available?: boolean;
}

/**
 * CartItem - A MenuItem with quantity for the shopping cart
 */
export interface CartItem extends MenuItem {
  quantity: number;
}

/**
 * Order - Represents a customer order
 */
export interface Order {
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryType: 'retiro' | 'envio';
  deliveryAddress?: string;
  items: CartItem[];
  totalAmount: number;
  notes?: string;
  status: 'pendiente' | 'confirmado' | 'en_preparacion' | 'listo' | 'entregado';
  createdAt: Date;
}

/**
 * OrderFormData - Form data for creating a new order
 */
export interface OrderFormData {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryType: 'retiro' | 'envio';
  deliveryAddress?: string;
  notes?: string;
}

/**
 * Category - Menu category
 */
export interface Category {
  id: string;
  name: string;
  icon?: string;
}

/**
 * ContactInfo - Restaurant contact information
 */
export interface ContactInfo {
  address: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  email?: string;
}

/**
 * BusinessHours - Restaurant operating hours
 */
export interface BusinessHours {
  day: string;
  open: string;
  close: string;
  closed?: boolean;
}
