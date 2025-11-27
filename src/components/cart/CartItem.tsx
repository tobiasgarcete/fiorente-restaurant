'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { CartItem as CartItemType } from '@/lib/types';

interface CartItemProps {
  item: CartItemType;
}

/**
 * CartItem - Single item in the cart with quantity controls
 */
function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  // Format price to Argentine Pesos
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeItem(item.id);
    }
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex gap-4 p-4 bg-fiorente-dark/50 rounded-xl border border-fiorente-primary/10"
    >
      {/* Image Placeholder */}
      <div className="w-16 h-16 bg-fiorente-secondary rounded-lg flex items-center justify-center flex-shrink-0">
        <span className="text-2xl">{getCategoryEmoji(item.category)}</span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="text-white font-medium text-sm line-clamp-1 mb-1">
          {item.name}
        </h4>
        <p className="text-fiorente-primary font-semibold">
          {formatPrice(item.price * item.quantity)}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={handleDecrement}
            className="w-7 h-7 bg-fiorente-secondary rounded-full flex items-center justify-center text-white hover:bg-fiorente-primary hover:text-fiorente-dark transition-colors"
            aria-label="Reducir cantidad"
          >
            <Minus size={14} />
          </button>
          <span className="text-white font-medium w-8 text-center">
            {item.quantity}
          </span>
          <button
            onClick={handleIncrement}
            className="w-7 h-7 bg-fiorente-secondary rounded-full flex items-center justify-center text-white hover:bg-fiorente-primary hover:text-fiorente-dark transition-colors"
            aria-label="Aumentar cantidad"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={handleRemove}
        className="p-2 text-gray-400 hover:text-red-500 transition-colors self-start"
        aria-label={`Eliminar ${item.name} del carrito`}
      >
        <Trash2 size={18} />
      </button>
    </motion.div>
  );
}

/**
 * Get emoji based on category for placeholder images
 */
function getCategoryEmoji(category: string): string {
  const emojis: Record<string, string> = {
    pizzas: '🍕',
    empanadas: '🥟',
    picadas: '🧀',
    sandwiches: '🥪',
    cafeteria: '☕',
    bebidas: '🥤',
    cervezas: '🍺',
    tragos: '🍹',
    postres: '🍰',
  };
  return emojis[category] || '🍽️';
}

export default memo(CartItem);
