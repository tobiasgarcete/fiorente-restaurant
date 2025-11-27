'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import CategoryFilter from './CategoryFilter';
import ProductCard from './ProductCard';
import { categories, menuItems, searchItems, getItemsByCategory } from '@/lib/menu-data';

/**
 * MenuSection - Main menu display with search and category filtering
 */
export default function MenuSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter items based on category and search query
  const filteredItems = useMemo(() => {
    let items = selectedCategory
      ? getItemsByCategory(selectedCategory)
      : menuItems.filter((item) => item.available);

    if (searchQuery.trim()) {
      const searchResults = searchItems(searchQuery);
      items = items.filter((item) =>
        searchResults.some((result) => result.id === item.id)
      );
    }

    return items;
  }, [selectedCategory, searchQuery]);

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery('');
  };

  // Handle category selection
  const handleSelectCategory = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setSearchQuery(''); // Clear search when changing category
  };

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="relative max-w-md mx-auto">
        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Buscar en el menú..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-3 bg-fiorente-secondary border border-fiorente-primary/20 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-fiorente-primary transition-colors"
            aria-label="Buscar productos"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              aria-label="Limpiar búsqueda"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Category Filter */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* Results Count */}
      <div className="text-center text-gray-400 text-sm">
        {filteredItems.length} {filteredItems.length === 1 ? 'producto' : 'productos'}
        {selectedCategory && (
          <span>
            {' '}
            en{' '}
            <span className="text-fiorente-primary">
              {categories.find((c) => c.id === selectedCategory)?.name}
            </span>
          </span>
        )}
        {searchQuery && (
          <span>
            {' '}
            para &quot;<span className="text-fiorente-primary">{searchQuery}</span>&quot;
          </span>
        )}
      </div>

      {/* Products Grid */}
      <AnimatePresence mode="wait">
        {filteredItems.length > 0 ? (
          <motion.div
            key={`${selectedCategory}-${searchQuery}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ProductCard product={item} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No encontramos resultados
            </h3>
            <p className="text-gray-400 mb-6">
              Intenta con otra búsqueda o categoría
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory(null);
              }}
              className="px-6 py-2 bg-fiorente-primary text-fiorente-dark rounded-full font-medium hover:bg-fiorente-lightOrange transition-colors"
            >
              Ver todo el menú
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
