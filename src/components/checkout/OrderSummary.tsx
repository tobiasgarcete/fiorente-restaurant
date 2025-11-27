'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';

/**
 * OrderSummary - Displays cart items and total for checkout
 */
export default function OrderSummary() {
  const { items, getTotalPrice } = useCart();

  // Format price to Argentine Pesos
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const totalPrice = getTotalPrice();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-fiorente-secondary border border-fiorente-primary/20 rounded-2xl p-6"
    >
      <h3 className="font-display text-xl font-semibold text-white mb-6">
        Resumen del Pedido
      </h3>

      {/* Items List */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-start gap-4 pb-4 border-b border-fiorente-primary/10 last:border-b-0"
          >
            <div className="flex-1">
              <p className="text-white font-medium">
                {item.name}
              </p>
              <p className="text-gray-400 text-sm">
                {formatPrice(item.price)} x {item.quantity}
              </p>
            </div>
            <p className="text-fiorente-primary font-semibold">
              {formatPrice(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      {/* Subtotal */}
      <div className="flex justify-between items-center py-4 border-t border-fiorente-primary/20">
        <span className="text-gray-300">Subtotal:</span>
        <span className="text-white font-medium">
          {formatPrice(totalPrice)}
        </span>
      </div>

      {/* Delivery Note */}
      <div className="flex justify-between items-center py-2">
        <span className="text-gray-400 text-sm">Envío:</span>
        <span className="text-gray-400 text-sm">
          A calcular
        </span>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center pt-4 mt-4 border-t-2 border-fiorente-primary/30">
        <span className="text-white font-semibold text-lg">Total:</span>
        <span className="text-2xl font-bold text-fiorente-primary">
          {formatPrice(totalPrice)}
        </span>
      </div>
    </motion.div>
  );
}
