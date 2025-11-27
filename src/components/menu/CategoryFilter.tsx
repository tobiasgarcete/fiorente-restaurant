'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Category } from '@/lib/types';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

/**
 * CategoryFilter - Horizontal scrollable category filter tabs
 */
function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="relative">
      {/* Gradient Fade Effect */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-fiorente-dark to-transparent z-10 pointer-events-none md:hidden" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-fiorente-dark to-transparent z-10 pointer-events-none md:hidden" />

      {/* Scrollable Container */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide px-4 md:px-0 md:flex-wrap md:justify-center">
        {/* All Categories Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelectCategory(null)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all duration-200 ${
            selectedCategory === null
              ? 'bg-fiorente-primary text-fiorente-dark'
              : 'bg-fiorente-secondary text-gray-300 hover:bg-fiorente-secondary/80 hover:text-white border border-fiorente-primary/20'
          }`}
          aria-pressed={selectedCategory === null}
        >
          <span>🍽️</span>
          <span>Todos</span>
        </motion.button>

        {/* Category Buttons */}
        {categories.map((category) => (
          <motion.button
            key={category.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all duration-200 ${
              selectedCategory === category.id
                ? 'bg-fiorente-primary text-fiorente-dark'
                : 'bg-fiorente-secondary text-gray-300 hover:bg-fiorente-secondary/80 hover:text-white border border-fiorente-primary/20'
            }`}
            aria-pressed={selectedCategory === category.id}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export default memo(CategoryFilter);
