'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import CartItem from './CartItem';

/**
 * Cart - Slide-out cart sidebar
 */
export default function Cart() {
  const { items, isCartOpen, closeCart, clearCart, getTotalPrice, getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  // Format price to Argentine Pesos
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            aria-hidden="true"
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-fiorente-secondary z-50 flex flex-col shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Carrito de compras"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-fiorente-primary/20">
              <div className="flex items-center gap-2">
                <ShoppingBag size={24} className="text-fiorente-primary" />
                <h2 className="text-xl font-display font-semibold text-white">
                  Tu Pedido
                </h2>
                {totalItems > 0 && (
                  <span className="bg-fiorente-primary text-fiorente-dark text-xs font-bold px-2 py-1 rounded-full">
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-fiorente-dark/50"
                aria-label="Cerrar carrito"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length > 0 ? (
                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="text-6xl mb-4">🛒</div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Tu carrito está vacío
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Agregá productos del menú para comenzar
                  </p>
                  <Link
                    href="/menu"
                    onClick={closeCart}
                    className="px-6 py-3 bg-fiorente-primary text-fiorente-dark font-semibold rounded-full hover:bg-fiorente-lightOrange transition-colors"
                  >
                    Ver Menú
                  </Link>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-4 border-t border-fiorente-primary/20 space-y-4">
                {/* Clear Cart */}
                <button
                  onClick={clearCart}
                  className="flex items-center justify-center gap-2 w-full py-2 text-gray-400 hover:text-red-500 transition-colors text-sm"
                >
                  <Trash2 size={16} />
                  Vaciar carrito
                </button>

                {/* Total */}
                <div className="flex items-center justify-between py-4 border-t border-fiorente-primary/20">
                  <span className="text-gray-300">Total:</span>
                  <span className="text-2xl font-bold text-fiorente-primary">
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                {/* Checkout Button */}
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full py-4 bg-fiorente-primary text-fiorente-dark font-semibold rounded-full text-center hover:bg-fiorente-lightOrange transition-colors"
                >
                  Ir al Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
