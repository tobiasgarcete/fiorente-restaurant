'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/**
 * Hero - Landing section with animated title and CTAs
 */
export default function Hero() {
  const scrollToMenu = () => {
    const featuredSection = document.getElementById('destacados');
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-fiorente-dark via-fiorente-secondary to-fiorente-dark">
        {/* Decorative overlay pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #F0A030 1px, transparent 1px),
                             radial-gradient(circle at 75% 75%, #F0A030 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Animated Logo/Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-fiorente-primary mb-4 tracking-wider">
            FIORENTE
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          <p className="text-white/90 text-xl md:text-2xl font-light tracking-widest mb-2">
            PIZZERÍA | CAFETERÍA | BAR
          </p>
          <p className="text-fiorente-lightOrange text-sm md:text-base tracking-wide">
            Formosa, Argentina
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto mt-8 mb-12 leading-relaxed"
        >
          Descubrí el sabor auténtico de nuestras pizzas artesanales, 
          disfrutá de un café de especialidad o relajate con los mejores tragos. 
          Tu lugar de encuentro en el corazón de Formosa.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/menu"
            className="px-8 py-4 bg-fiorente-primary text-fiorente-dark font-semibold rounded-full hover:bg-fiorente-lightOrange transition-all duration-300 hover:scale-105 shadow-lg shadow-fiorente-primary/30"
          >
            Ver Menú
          </Link>
          <Link
            href="/checkout"
            className="px-8 py-4 border-2 border-fiorente-primary text-fiorente-primary font-semibold rounded-full hover:bg-fiorente-primary hover:text-fiorente-dark transition-all duration-300 hover:scale-105"
          >
            Hacer Pedido
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          onClick={scrollToMenu}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-fiorente-primary/70 hover:text-fiorente-primary transition-colors cursor-pointer"
          aria-label="Scroll hacia abajo"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={32} />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
