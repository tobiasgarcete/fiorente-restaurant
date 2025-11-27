'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import OrderSummary from '@/components/checkout/OrderSummary';

/**
 * Checkout Page - Customer information form and order summary
 */
export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalItems } = useCart();

  // Redirect to menu if cart is empty
  useEffect(() => {
    if (getTotalItems() === 0) {
      // Small delay to allow cart to load from localStorage
      const timeout = setTimeout(() => {
        if (getTotalItems() === 0) {
          router.push('/menu');
        }
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [getTotalItems, router]);

  return (
    <div className="min-h-screen pt-24 pb-16 bg-fiorente-dark">
      <div className="container mx-auto px-4">
        {/* Back Link */}
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-fiorente-primary transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          Volver al menú
        </Link>

        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ShoppingBag size={32} className="text-fiorente-primary" />
            <h1 className="font-display text-4xl md:text-5xl font-bold text-fiorente-primary">
              Checkout
            </h1>
          </div>
          <div className="w-24 h-1 bg-fiorente-primary mx-auto mb-6" />
          <p className="text-gray-300">
            Completá tus datos para confirmar el pedido
          </p>
        </div>

        {/* Content Grid */}
        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Checkout Form */}
            <div className="order-2 lg:order-1">
              <CheckoutForm />
            </div>

            {/* Order Summary */}
            <div className="order-1 lg:order-2">
              <OrderSummary />
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Tu carrito está vacío
            </h2>
            <p className="text-gray-400 mb-8">
              Agregá productos del menú para continuar
            </p>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 px-8 py-4 bg-fiorente-primary text-fiorente-dark font-semibold rounded-full hover:bg-fiorente-lightOrange transition-colors"
            >
              Ver Menú
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
