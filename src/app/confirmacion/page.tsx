'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, Home, MessageCircle, Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { contactInfo } from '@/lib/menu-data';

/**
 * ConfirmationContent - Content component that uses useSearchParams
 */
function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber') || 'N/A';
  const [copied, setCopied] = useState(false);

  // Generate WhatsApp message
  const whatsappMessage = encodeURIComponent(
    `¡Hola! Acabo de realizar el pedido #${orderNumber} desde la web. ¿Podrían confirmarme el tiempo de espera? ¡Gracias!`
  );
  const whatsappUrl = `https://wa.me/${contactInfo.whatsapp}?text=${whatsappMessage}`;

  // Copy order number to clipboard
  const handleCopyOrderNumber = async () => {
    try {
      await navigator.clipboard.writeText(orderNumber);
      setCopied(true);
      toast.success('Número de pedido copiado');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('No se pudo copiar');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-fiorente-dark flex items-center">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg mx-auto text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <CheckCircle size={48} className="text-green-500" />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-display text-3xl md:text-4xl font-bold text-white mb-4"
          >
            ¡Pedido Confirmado!
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-300 mb-8"
          >
            Tu pedido ha sido recibido y estamos preparándolo con mucho cariño.
          </motion.p>

          {/* Order Number Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-fiorente-secondary border border-fiorente-primary/20 rounded-2xl p-6 mb-8"
          >
            <p className="text-gray-400 text-sm mb-2">Número de pedido</p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl font-bold text-fiorente-primary font-mono">
                #{orderNumber}
              </span>
              <button
                onClick={handleCopyOrderNumber}
                className="p-2 text-gray-400 hover:text-fiorente-primary transition-colors"
                aria-label="Copiar número de pedido"
              >
                {copied ? <Check size={20} /> : <Copy size={20} />}
              </button>
            </div>
          </motion.div>

          {/* Estimated Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-fiorente-primary/10 border border-fiorente-primary/30 rounded-xl p-4 mb-8"
          >
            <p className="text-fiorente-primary text-sm">
              ⏱️ Tiempo estimado: <strong>30-45 minutos</strong>
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors"
            >
              <MessageCircle size={20} />
              Consultar por WhatsApp
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 border-2 border-fiorente-primary text-fiorente-primary font-semibold rounded-full hover:bg-fiorente-primary hover:text-fiorente-dark transition-colors"
            >
              <Home size={20} />
              Volver al inicio
            </Link>
          </motion.div>

          {/* Thank You Message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-gray-500 text-sm mt-12"
          >
            ¡Gracias por elegir Fiorente! 🍕
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

/**
 * Confirmation Page - Order confirmation with order number and next steps
 */
export default function ConfirmacionPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-24 pb-16 bg-fiorente-dark flex items-center justify-center">
        <div className="text-fiorente-primary text-xl">Cargando...</div>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
