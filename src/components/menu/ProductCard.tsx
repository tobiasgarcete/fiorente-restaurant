'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Plus, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCart } from '@/contexts/CartContext';
import { MenuItem } from '@/lib/types';

interface ProductCardProps {
  product: MenuItem;
}

/**
 * ProductCard - Displays a single menu item with add to cart functionality
 */
function ProductCard({ product }: ProductCardProps) {
  const { addItem, items } = useCart();
  const [isAdding, setIsAdding] = React.useState(false);

  // Check if item is already in cart
  const itemInCart = items.find((item) => item.id === product.id);
  const quantityInCart = itemInCart?.quantity || 0;

  // Format price to Argentine Pesos
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem(product);
    toast.success(`${product.name} agregado al carrito`, {
      icon: '🛒',
      style: {
        background: '#1A1A1A',
        color: '#FFFFFF',
        border: '1px solid #F0A030',
      },
    });

    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-fiorente-secondary border border-fiorente-primary/10 rounded-2xl overflow-hidden group hover:border-fiorente-primary/30 transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-fiorente-dark">
        {/* Placeholder Image */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-fiorente-primary/20 to-fiorente-dark">
          <span className="text-4xl">{getCategoryEmoji(product.category)}</span>
        </div>
        
        {/* Featured Badge */}
        {product.featured && (
          <div className="absolute top-3 left-3 bg-fiorente-primary text-fiorente-dark text-xs font-bold px-3 py-1 rounded-full">
            Destacado
          </div>
        )}

        {/* Quantity Badge */}
        {quantityInCart > 0 && (
          <div className="absolute top-3 right-3 bg-green-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
            {quantityInCart}
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-fiorente-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <motion.button
            onClick={handleAddToCart}
            whileTap={{ scale: 0.9 }}
            disabled={isAdding}
            className="px-6 py-3 bg-fiorente-primary text-fiorente-dark font-semibold rounded-full flex items-center gap-2 hover:bg-fiorente-lightOrange transition-colors disabled:opacity-50"
            aria-label={`Agregar ${product.name} al carrito`}
          >
            {isAdding ? (
              <>
                <Check size={18} />
                Agregado
              </>
            ) : (
              <>
                <Plus size={18} />
                Agregar
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display font-semibold text-white text-lg mb-1 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-gray-400 text-sm mb-3 line-clamp-2 min-h-[40px]">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-fiorente-primary font-bold text-xl">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="md:hidden p-2 bg-fiorente-primary text-fiorente-dark rounded-full hover:bg-fiorente-lightOrange transition-colors disabled:opacity-50"
            aria-label={`Agregar ${product.name} al carrito`}
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
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

export default memo(ProductCard);
