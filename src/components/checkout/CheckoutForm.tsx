'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, MapPin, Store } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCart } from '@/contexts/CartContext';
import { OrderFormData } from '@/lib/types';

/**
 * CheckoutForm - Customer information form for placing orders
 */
export default function CheckoutForm() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<OrderFormData>({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    deliveryType: 'retiro',
    deliveryAddress: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof OrderFormData, string>>>({});

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof OrderFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Handle delivery type change
  const handleDeliveryTypeChange = (type: 'retiro' | 'envio') => {
    setFormData((prev) => ({ ...prev, deliveryType: type }));
    if (type === 'retiro') {
      setErrors((prev) => ({ ...prev, deliveryAddress: undefined }));
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof OrderFormData, string>> = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'El nombre es requerido';
    }

    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = 'El teléfono es requerido';
    } else if (!/^[\d\s()-+]+$/.test(formData.customerPhone)) {
      newErrors.customerPhone = 'Ingresa un número de teléfono válido';
    }

    if (formData.customerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Ingresa un email válido';
    }

    if (formData.deliveryType === 'envio' && !formData.deliveryAddress?.trim()) {
      newErrors.deliveryAddress = 'La dirección es requerida para envíos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      toast.error('Tu carrito está vacío');
      return;
    }

    if (!validateForm()) {
      toast.error('Por favor completa los campos requeridos');
      return;
    }

    setIsSubmitting(true);

    try {
      let response;
      try {
        response = await fetch('/api/pedidos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            items: items.map((item) => ({
              productId: item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
            })),
            totalAmount: getTotalPrice(),
          }),
        });
      } catch (networkError) {
        console.error('Network error:', networkError);
        toast.error('Error de conexión. Verifica tu internet e intenta nuevamente.');
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al procesar el pedido');
      }

      // Save order data to sessionStorage for confirmation page
      const orderData = {
        orderNumber: data.orderNumber,
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        customerEmail: formData.customerEmail || '',
        deliveryType: formData.deliveryType,
        deliveryAddress: formData.deliveryAddress || '',
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        totalAmount: getTotalPrice(),
        createdAt: new Date().toISOString()
      };

      // Log for debugging
      console.log('💾 Saving order data to sessionStorage:', orderData);

      // Save to sessionStorage
      sessionStorage.setItem('lastOrder', JSON.stringify(orderData));

      // Verify it was saved
      const savedData = sessionStorage.getItem('lastOrder');
      console.log('✅ Data saved to sessionStorage:', savedData ? 'YES' : 'NO');

      // Show success message
      toast.success('¡Pedido realizado con éxito!');

      // Wait to ensure sessionStorage is persisted before navigation
      setTimeout(() => {
        console.log('🚀 Navigating to confirmation page...');
        
        // Navigate to confirmation page
        router.push('/confirmacion');
        
        // Clear cart AFTER navigation has started
        setTimeout(() => {
          clearCart();
          console.log('🗑️ Cart cleared');
        }, 500);
      }, 200);
    } catch (error) {
      console.error('Error submitting order:', error);
      toast.error('Error al procesar el pedido. Intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-fiorente-secondary border border-fiorente-primary/20 rounded-2xl p-6 space-y-6"
    >
      <h3 className="font-display text-xl font-semibold text-white mb-6">
        Datos del Cliente
      </h3>

      {/* Name */}
      <div>
        <label htmlFor="customerName" className="block text-gray-300 mb-2">
          Nombre completo <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="customerName"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-fiorente-dark border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-fiorente-primary transition-colors ${
            errors.customerName ? 'border-red-500' : 'border-fiorente-primary/20'
          }`}
          placeholder="Tu nombre"
        />
        {errors.customerName && (
          <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="customerPhone" className="block text-gray-300 mb-2">
          Teléfono / WhatsApp <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="customerPhone"
          name="customerPhone"
          value={formData.customerPhone}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-fiorente-dark border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-fiorente-primary transition-colors ${
            errors.customerPhone ? 'border-red-500' : 'border-fiorente-primary/20'
          }`}
          placeholder="Ej: 370 4858785"
        />
        {errors.customerPhone && (
          <p className="text-red-500 text-sm mt-1">{errors.customerPhone}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="customerEmail" className="block text-gray-300 mb-2">
          Email <span className="text-gray-500">(opcional)</span>
        </label>
        <input
          type="email"
          id="customerEmail"
          name="customerEmail"
          value={formData.customerEmail}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-fiorente-dark border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-fiorente-primary transition-colors ${
            errors.customerEmail ? 'border-red-500' : 'border-fiorente-primary/20'
          }`}
          placeholder="tu@email.com"
        />
        {errors.customerEmail && (
          <p className="text-red-500 text-sm mt-1">{errors.customerEmail}</p>
        )}
      </div>

      {/* Delivery Type */}
      <div>
        <label className="block text-gray-300 mb-3">
          Tipo de entrega <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => handleDeliveryTypeChange('retiro')}
            className={`flex items-center justify-center gap-2 p-4 rounded-xl border transition-all ${
              formData.deliveryType === 'retiro'
                ? 'bg-fiorente-primary text-fiorente-dark border-fiorente-primary'
                : 'bg-fiorente-dark text-gray-300 border-fiorente-primary/20 hover:border-fiorente-primary/50'
            }`}
          >
            <Store size={20} />
            <span className="font-medium">Retiro en local</span>
          </button>
          <button
            type="button"
            onClick={() => handleDeliveryTypeChange('envio')}
            className={`flex items-center justify-center gap-2 p-4 rounded-xl border transition-all ${
              formData.deliveryType === 'envio'
                ? 'bg-fiorente-primary text-fiorente-dark border-fiorente-primary'
                : 'bg-fiorente-dark text-gray-300 border-fiorente-primary/20 hover:border-fiorente-primary/50'
            }`}
          >
            <MapPin size={20} />
            <span className="font-medium">Envío a domicilio</span>
          </button>
        </div>
      </div>

      {/* Address (only for delivery) */}
      {formData.deliveryType === 'envio' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <label htmlFor="deliveryAddress" className="block text-gray-300 mb-2">
            Dirección completa <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="deliveryAddress"
            name="deliveryAddress"
            value={formData.deliveryAddress}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-fiorente-dark border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-fiorente-primary transition-colors ${
              errors.deliveryAddress ? 'border-red-500' : 'border-fiorente-primary/20'
            }`}
            placeholder="Calle, número, piso/departamento, barrio"
          />
          {errors.deliveryAddress && (
            <p className="text-red-500 text-sm mt-1">{errors.deliveryAddress}</p>
          )}
        </motion.div>
      )}

      {/* Notes */}
      <div>
        <label htmlFor="notes" className="block text-gray-300 mb-2">
          Notas adicionales <span className="text-gray-500">(opcional)</span>
        </label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-3 bg-fiorente-dark border border-fiorente-primary/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-fiorente-primary transition-colors resize-none"
          placeholder="Aclaraciones sobre el pedido, alergias, etc."
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || items.length === 0}
        className="w-full py-4 bg-fiorente-primary text-fiorente-dark font-semibold rounded-full hover:bg-fiorente-lightOrange transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Procesando...
          </>
        ) : (
          'Confirmar Pedido'
        )}
      </button>
    </motion.form>
  );
}
