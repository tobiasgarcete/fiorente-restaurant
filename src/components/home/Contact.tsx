'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Instagram, MessageCircle } from 'lucide-react';
import { contactInfo, businessHours } from '@/lib/menu-data';

/**
 * Contact - Contact section with map, info, and social links
 */
export default function Contact() {
  // Google Maps embed URL
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.8!2d-58.185!3d-26.182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDEwJzU1LjIiUyA1OMKwMTEnMDYuMCJX!5e0!3m2!1ses!2sar!4v1600000000000!5m2!1ses!2sar`;

  return (
    <section id="contacto" className="py-20 bg-fiorente-secondary">
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
            Visítanos
          </h2>
          <div className="w-24 h-1 bg-fiorente-primary mx-auto mb-6" />
          <p className="text-gray-300 max-w-2xl mx-auto">
            Estamos en el corazón de Formosa. ¡Te esperamos para disfrutar juntos!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden h-[400px] bg-fiorente-dark"
          >
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Fiorente"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            />
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-fiorente-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin size={24} className="text-fiorente-primary" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Dirección</h3>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(contactInfo.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-fiorente-primary transition-colors"
                >
                  {contactInfo.address}
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-fiorente-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone size={24} className="text-fiorente-primary" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Teléfono</h3>
                <a
                  href={`tel:+54${contactInfo.phone}`}
                  className="text-gray-400 hover:text-fiorente-primary transition-colors"
                >
                  {contactInfo.phone}
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-fiorente-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock size={24} className="text-fiorente-primary" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Horarios</h3>
                <div className="space-y-1">
                  {businessHours.slice(0, 3).map((schedule) => (
                    <p key={schedule.day} className="text-gray-400 text-sm">
                      <span className="inline-block w-24">{schedule.day}:</span>
                      {schedule.closed ? 'Cerrado' : `${schedule.open} - ${schedule.close}`}
                    </p>
                  ))}
                  <p className="text-fiorente-primary text-sm mt-2">
                    Viernes y Sábados hasta las 02:00hs
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              <a
                href={`https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent('Hola! Quiero hacer una reserva')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
              >
                <MessageCircle size={20} />
                <span>WhatsApp</span>
              </a>
              <a
                href={`https://instagram.com/${contactInfo.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:from-purple-700 hover:to-pink-700 transition-colors"
              >
                <Instagram size={20} />
                <span>Instagram</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
