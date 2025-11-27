'use client';

import { useEffect, useState } from 'react';

// Pon aquí el número al que deseas enviar WhatsApp
const WHATSAPP_NUMBER = '5493704858785';

interface Pedido {
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryType: string;
  deliveryAddress?: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  totalAmount: number;
  notes?: string;
  createdAt?: string;
}

export default function ConfirmacionPage() {
  const [order, setOrder] = useState<Pedido | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Intentar sessionStorage primero
    const sessionOrderRaw = typeof window !== 'undefined' && sessionStorage.getItem('lastOrder');
    if (sessionOrderRaw) {
      try {
        setOrder(JSON.parse(sessionOrderRaw));
        setLoading(false);
        return;
      } catch {
        // Si hay error, sigue al fetch
      }
    }

    // 2. Si no hay, buscar por número de pedido en la URL
    const params = new URLSearchParams(window.location.search);
    const orderNumber = params.get('pedido');
    if (orderNumber) {
      fetch(`/api/pedidos?orderNumber=${orderNumber}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.order) setOrder(data.order);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <div className="p-8 text-center">Cargando confirmación...</div>;
  if (!order) {
    return (
      <div className="p-8 text-center text-red-500">
        No se ha encontrado tu pedido.<br />
        Si crees que esto es un error, comunicate con el local.
      </div>
    );
  }

  // Arma el mensaje de WhatsApp personalizado
  const waMessage =
    `Hola, soy *${order.customerName}* y acabo de hacer el pedido *${order.orderNumber}*.\n` +
    (order.deliveryType === 'envio'
      ? `Dirección de entrega: ${order.deliveryAddress ?? ''}\n`
      : '') +
    `Teléfono: ${order.customerPhone}\n` +
    (order.customerEmail ? `Email: ${order.customerEmail}\n` : '') +
    `Total: $${order.totalAmount}\n` +
    (order.notes ? `Notas: ${order.notes}\n` : '') +
    `--------------------\n` +
    `Detalle:\n${order.items
      .map((item) => `- ${item.name} x${item.quantity} $${item.price * item.quantity}`)
      .join('\n')}`;

  // Función para abrir WhatsApp y copiar el msg
  const enviarWa = async () => {
    try {
      await navigator.clipboard.writeText(waMessage);
    } catch {}
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`,
      '_blank'
    );
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow mt-12 mb-10 text-gray-900">
      <h2 className="text-2xl font-bold text-green-700 mb-3">
        ¡Pedido confirmado!
      </h2>
      <p className="mb-6 text-gray-600">
        Número de Pedido: <span className="font-mono">{order.orderNumber}</span>
      </p>
      <div className="mb-4">
        <div><b>Nombre:</b> {order.customerName}</div>
        <div><b>Teléfono:</b> {order.customerPhone}</div>
        <div><b>Email:</b> {order.customerEmail}</div>
        <div><b>Tipo de entrega:</b> {order.deliveryType === 'envio' ? 'Envío a domicilio' : 'Retiro en local'}</div>
        {order.deliveryType === 'envio' && (
          <div><b>Dirección:</b> {order.deliveryAddress}</div>
        )}
        <div className="mt-4"><b>Productos solicitados:</b>
          <ul className="list-inside list-disc ml-4">
            {order.items.map((item) => (
              <li key={item.id}>
                {item.name} x{item.quantity} = ${item.price * item.quantity}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-2"><b>Total:</b> ${order.totalAmount}</div>
        {order.notes && (
          <div className="mt-2"><b>Notas:</b> {order.notes}</div>
        )}
      </div>
      <button
        onClick={enviarWa}
        className="mt-6 w-full py-4 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors shadow flex items-center justify-center gap-2"
      >
        Enviar pedido por WhatsApp
      </button>
      <p className="mt-2 text-xs text-gray-400 text-center">
        Al hacer clic, el resumen se copia y se abre WhatsApp. Solo tienes que enviar.
      </p>
    </div>
  );
}