'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, Home, MessageCircle, Copy, Check, ShoppingBag, User, Phone, Mail, MapPin, Store, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import { contactInfo } from '@/lib/menu-data';

/**
 * Order item interface
 */
interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

/**
 * Order data interface
 */
interface OrderData {
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deliveryType: 'retiro' | 'envio';
  deliveryAddress: string;
  items: OrderItem[];
  totalAmount: number;
  createdAt: string;
}

/**
 * Format price in Argentine Peso format
 */
function formatPrice(price: number): string {
  return price.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
}

/**
 * Format date to Spanish format
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Confirmation Page - Order confirmation with complete details and WhatsApp integration
 */
export default function ConfirmacionPage() {
  const router = useRouter();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load order data from sessionStorage
  useEffect(() => {
    try {
      const storedOrder = sessionStorage.getItem('lastOrder');
      if (storedOrder) {
        const parsedOrder = JSON.parse(storedOrder);
        setOrderData(parsedOrder);
      } else {
        // No order data, redirect to home
        router.push('/');
      }
    } catch (error) {
      console.error('Error loading order data:', error);
      toast.error('Error al cargar los datos del pedido');
      router.push('/');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  // Copy order number to clipboard
  const handleCopyOrderNumber = async () => {
    if (!orderData) return;
    try {
      await navigator.clipboard.writeText(orderData.orderNumber);
      setCopied(true);
      toast.success('Número de pedido copiado');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      toast.error('No se pudo copiar');
    }
  };

  // Generate WhatsApp message with full order details
  // Note: Avoiding emojis and special characters for better encoding compatibility
  const generateWhatsAppMessage = useCallback((): string => {
    if (!orderData) return '';

    const deliveryTypeText = orderData.deliveryType === 'retiro' ? 'Retiro en local' : 'Envio a domicilio';
    
    // Build items list
    const itemsList = orderData.items
      .map((item) => `${item.name} x${item.quantity} - ${(item.price * item.quantity).toLocaleString('es-AR')}`)
      .join('\n');

    // Build message parts
    const messageParts = [
      'Hola Fiorente!',
      '',
      'Acabo de realizar un pedido desde la web:',
      '',
      `Pedido: ${orderData.orderNumber}`,
      `Nombre: ${orderData.customerName}`,
      `Telefono: ${orderData.customerPhone}`,
      `Tipo: ${deliveryTypeText}`
    ];

    // Add address if delivery
    if (orderData.deliveryType === 'envio' && orderData.deliveryAddress) {
      messageParts.push(`Direccion: ${orderData.deliveryAddress}`);
    }

    // Add items
    messageParts.push('');
    messageParts.push('Detalle del pedido:');
    messageParts.push(itemsList);
    messageParts.push('');
    messageParts.push(`Total: ${orderData.totalAmount.toLocaleString('es-AR')}`);
    messageParts.push('');
    messageParts.push('Como puedo realizar el pago?');

    return messageParts.join('\n');
  }, [orderData]);

  // Generate a simpler message as fallback
  const generateSimpleWhatsAppMessage = useCallback((): string => {
    if (!orderData) return '';
    return `Hola! Hice un pedido: ${orderData.orderNumber}. Total: ${orderData.totalAmount.toLocaleString('es-AR')}`;
  }, [orderData]);

  // Debug: Log the message to verify it's being generated
  useEffect(() => {
    if (orderData) {
      const message = generateWhatsAppMessage();
      console.log('WhatsApp Message:', message);
      console.log('WhatsApp URL:', `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(message)}`);
    }
  }, [orderData, generateWhatsAppMessage]);

  const whatsappMessage = generateWhatsAppMessage();
  const whatsappUrl = `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;
  const simpleWhatsappMessage = generateSimpleWhatsAppMessage();
  const simpleWhatsappUrl = `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(simpleWhatsappMessage)}`;

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-fiorente-dark flex items-center justify-center">
        <div className="text-fiorente-primary text-xl">Cargando...</div>
      </div>
    );
  }

  // If no order data, don't render (will redirect)
  if (!orderData) {
    return null;
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-fiorente-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle size={48} className="text-green-500" />
            </motion.div>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              ¡Pedido Confirmado!
            </h1>
            <p className="text-gray-300">
              Tu pedido ha sido recibido y estamos preparándolo con mucho cariño.
            </p>
          </motion.div>

          {/* Order Number Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-fiorente-secondary border border-fiorente-primary/20 rounded-2xl p-6 mb-6"
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-gray-400 text-sm mb-1">Número de pedido</p>
                <div className="flex items-center gap-3">
                  <span className="text-2xl md:text-3xl font-bold text-fiorente-primary font-mono">
                    #{orderData.orderNumber}
                  </span>
                  <button
                    onClick={handleCopyOrderNumber}
                    className="p-2 text-gray-400 hover:text-fiorente-primary transition-colors"
                    aria-label="Copiar número de pedido"
                  >
                    {copied ? <Check size={20} /> : <Copy size={20} />}
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-sm mb-1">Estado</p>
                <span className="inline-flex items-center px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-sm font-medium">
                  Pendiente
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4 text-gray-400 text-sm">
              <Calendar size={16} />
              <span>{formatDate(orderData.createdAt)}</span>
            </div>
          </motion.div>

          {/* Customer Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-fiorente-secondary border border-fiorente-primary/20 rounded-2xl p-6 mb-6"
          >
            <h3 className="font-display text-lg font-semibold text-white mb-4">
              Datos del Cliente
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <User size={18} className="text-fiorente-primary" />
                <div>
                  <p className="text-gray-400 text-xs">Nombre</p>
                  <p className="text-white">{orderData.customerName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-fiorente-primary" />
                <div>
                  <p className="text-gray-400 text-xs">Teléfono</p>
                  <p className="text-white">{orderData.customerPhone}</p>
                </div>
              </div>
              {orderData.customerEmail && (
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-fiorente-primary" />
                  <div>
                    <p className="text-gray-400 text-xs">Email</p>
                    <p className="text-white">{orderData.customerEmail}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3">
                {orderData.deliveryType === 'retiro' ? (
                  <Store size={18} className="text-fiorente-primary" />
                ) : (
                  <MapPin size={18} className="text-fiorente-primary" />
                )}
                <div>
                  <p className="text-gray-400 text-xs">Tipo de entrega</p>
                  <p className="text-white">
                    {orderData.deliveryType === 'retiro' ? 'Retiro en local' : 'Envío a domicilio'}
                  </p>
                </div>
              </div>
              {orderData.deliveryType === 'envio' && orderData.deliveryAddress && (
                <div className="flex items-center gap-3 md:col-span-2">
                  <MapPin size={18} className="text-fiorente-primary" />
                  <div>
                    <p className="text-gray-400 text-xs">Dirección</p>
                    <p className="text-white">{orderData.deliveryAddress}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Order Items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-fiorente-secondary border border-fiorente-primary/20 rounded-2xl p-6 mb-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag size={20} className="text-fiorente-primary" />
              <h3 className="font-display text-lg font-semibold text-white">
                Resumen del Pedido
              </h3>
            </div>
            <div className="space-y-3">
              {orderData.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-fiorente-primary/10 last:border-b-0">
                  <div>
                    <p className="text-white">{item.name}</p>
                    <p className="text-gray-400 text-sm">x{item.quantity}</p>
                  </div>
                  <p className="text-white font-medium">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-fiorente-primary/30">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-white">Total</span>
                <span className="text-2xl font-bold text-fiorente-primary">
                  {formatPrice(orderData.totalAmount)}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-fiorente-primary/10 border border-fiorente-primary/30 rounded-2xl p-6 mb-8"
          >
            <h3 className="font-display text-lg font-semibold text-fiorente-primary mb-4">
              📋 Próximos pasos
            </h3>
            <ol className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-fiorente-primary text-fiorente-dark rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <span>Hacé clic en el botón de WhatsApp para confirmar tu pedido</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-fiorente-primary text-fiorente-dark rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <span>Te responderemos con las opciones de pago disponibles</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-fiorente-primary text-fiorente-dark rounded-full flex items-center justify-center text-sm font-bold">3</span>
                <span>
                  {orderData.deliveryType === 'retiro' 
                    ? 'Pasá a retirar tu pedido cuando esté listo (te avisaremos)'
                    : 'Esperá tu pedido en la dirección indicada'}
                </span>
              </li>
            </ol>
          </motion.div>

          {/* WhatsApp CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-6 text-center"
          >
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-3 px-8 py-5 bg-green-600 text-white text-lg font-semibold rounded-full hover:bg-green-700 transition-colors shadow-lg shadow-green-600/25"
            >
              <MessageCircle size={24} />
              📱 Confirmar pedido por WhatsApp
            </a>
            <a
              href={simpleWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-3 text-sm text-gray-400 hover:text-fiorente-primary underline"
            >
              ¿No funciona el botón? Prueba esta versión simple
            </a>
          </motion.div>

          {/* Secondary Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/menu"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-fiorente-primary text-fiorente-dark font-semibold rounded-full hover:bg-fiorente-lightOrange transition-colors"
            >
              <ShoppingBag size={20} />
              Hacer otro pedido
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 border-2 border-fiorente-primary text-fiorente-primary font-semibold rounded-full hover:bg-fiorente-primary hover:text-fiorente-dark transition-colors"
            >
              <Home size={20} />
              Volver al inicio
            </Link>
          </motion.div>

          {/* Thank You Message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-gray-500 text-sm mt-12 text-center"
          >
            ¡Gracias por elegir Fiorente! 🍕
          </motion.p>
        </div>
      </div>
    </div>
  );
}
