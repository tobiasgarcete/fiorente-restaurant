'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UtensilsCrossed, Coffee, Wine } from 'lucide-react';

/**
 * About - Section describing Fiorente restaurant
 */
export default function About() {
  const features = [
    {
      icon: UtensilsCrossed,
      title: 'Pizzas Artesanales',
      description: 'Masa madre fermentada 48hs, ingredientes frescos y cocción perfecta en horno de piedra.',
    },
    {
      icon: Coffee,
      title: 'Café de Especialidad',
      description: 'Granos seleccionados, tueste local y preparaciones de barista para los amantes del café.',
    },
    {
      icon: Wine,
      title: 'Coctelería Premium',
      description: 'Tragos clásicos y creaciones propias con los mejores destilados y ingredientes frescos.',
    },
  ];

  return (
    <section id="nosotros" className="py-20 bg-fiorente-secondary">
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
            Sobre Nosotros
          </h2>
          <div className="w-24 h-1 bg-fiorente-primary mx-auto mb-6" />
          <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
            En <span className="text-fiorente-primary font-semibold">Fiorente</span> fusionamos 
            la tradición italiana con el espíritu formoseño. Somos más que un restaurante: 
            somos un punto de encuentro donde cada momento se convierte en una experiencia 
            gastronómica única.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-fiorente-dark/50 border border-fiorente-primary/20 rounded-2xl p-8 text-center hover:border-fiorente-primary/50 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-fiorente-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <feature.icon size={32} className="text-fiorente-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Gallery Placeholder */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="aspect-square bg-gradient-to-br from-fiorente-primary/20 to-fiorente-dark rounded-xl overflow-hidden group cursor-pointer"
            >
              <div className="w-full h-full flex items-center justify-center bg-fiorente-dark/50 group-hover:bg-fiorente-dark/30 transition-all duration-300">
                <span className="text-fiorente-primary/50 text-sm">
                  Imagen {item}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
