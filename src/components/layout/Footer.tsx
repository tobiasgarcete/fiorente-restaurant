import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Instagram, Clock } from 'lucide-react';
import { contactInfo, businessHours } from '@/lib/menu-data';

/**
 * Footer - Site footer with contact info, hours, and social links
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-fiorente-dark border-t border-fiorente-primary/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="Fiorente"
                width={150}
                height={45}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-gray-400 text-sm">
              Pizzería, Cafetería y Bar en el corazón de Formosa. 
              Disfrutá de las mejores pizzas y tragos en un ambiente único.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-fiorente-primary font-display font-semibold text-lg">
              Contacto
            </h3>
            <div className="space-y-3">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(contactInfo.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-gray-400 hover:text-fiorente-primary transition-colors"
              >
                <MapPin size={18} className="flex-shrink-0 mt-1" />
                <span className="text-sm">{contactInfo.address}</span>
              </a>
              <a
                href={`https://wa.me/${contactInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-fiorente-primary transition-colors"
              >
                <Phone size={18} className="flex-shrink-0" />
                <span className="text-sm">{contactInfo.phone}</span>
              </a>
              <a
                href={`https://instagram.com/${contactInfo.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-fiorente-primary transition-colors"
              >
                <Instagram size={18} className="flex-shrink-0" />
                <span className="text-sm">{contactInfo.instagram}</span>
              </a>
            </div>
          </div>

          {/* Business Hours */}
          <div className="space-y-4">
            <h3 className="text-fiorente-primary font-display font-semibold text-lg flex items-center gap-2">
              <Clock size={18} />
              Horarios
            </h3>
            <div className="space-y-2">
              {businessHours.map((schedule) => (
                <div
                  key={schedule.day}
                  className="flex justify-between text-sm text-gray-400"
                >
                  <span>{schedule.day}</span>
                  <span>
                    {schedule.closed
                      ? 'Cerrado'
                      : `${schedule.open} - ${schedule.close}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-fiorente-primary font-display font-semibold text-lg">
              Enlaces
            </h3>
            <nav className="space-y-2">
              <Link
                href="/"
                className="block text-sm text-gray-400 hover:text-fiorente-primary transition-colors"
              >
                Inicio
              </Link>
              <Link
                href="/menu"
                className="block text-sm text-gray-400 hover:text-fiorente-primary transition-colors"
              >
                Menú Completo
              </Link>
              <Link
                href="/#contacto"
                className="block text-sm text-gray-400 hover:text-fiorente-primary transition-colors"
              >
                Contacto
              </Link>
              <a
                href={`https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent('Hola! Quiero hacer un pedido')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-gray-400 hover:text-fiorente-primary transition-colors"
              >
                Pedir por WhatsApp
              </a>
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-fiorente-primary/10 text-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} Fiorente. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
