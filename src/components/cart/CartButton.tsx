'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

/**
 * CartButton - Floating cart button with item count badge
 */
function CartButton() {
  const { getTotalItems, toggleCart } = useCart();
  const totalItems = getTotalItems();

  return (
    <motion.button
      onClick={toggleCart}
      className="relative p-2 text-white hover:text-fiorente-primary transition-colors"
      whileTap={{ scale: 0.95 }}
      aria-label={`Carrito de compras, ${totalItems} productos`}
    >
      <ShoppingCart size={24} />
      
      {/* Badge */}
      {totalItems > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 bg-fiorente-primary text-fiorente-dark text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
        >
          {totalItems > 99 ? '99+' : totalItems}
        </motion.span>
      )}
    </motion.button>
  );
}

export default memo(CartButton);
