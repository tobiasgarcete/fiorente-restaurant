'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/menu/ProductCard';
import { featuredItems } from '@/lib/menu-data';

/**
 * Featured - Showcase of featured menu items
 */
export default function Featured() {
  // Display up to 4 featured items
  const displayItems = featuredItems.slice(0, 4);

  return (
    <section id="destacados" className="py-20 bg-fiorente-dark">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-fiorente-primary mb-4">
            Nuestros Destacados
          </h2>
          <div className="w-24 h-1 bg-fiorente-primary mx-auto mb-6" />
          <p className="text-gray-300 max-w-2xl mx-auto">
            Descubrí los favoritos de nuestros clientes. Cada plato preparado con 
            ingredientes frescos y mucho amor.
          </p>
        </motion.div>

        {/* Featured Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {displayItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard product={item} />
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-fiorente-primary text-fiorente-primary font-semibold rounded-full hover:bg-fiorente-primary hover:text-fiorente-dark transition-all duration-300 group"
          >
            Ver Menú Completo
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
