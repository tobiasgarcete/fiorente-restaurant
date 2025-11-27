'use client';

import { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';

// Cambia aquí tu número de WhatsApp destino:
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
  const [copied, setCopied] = useState(false);

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
      setCopied(true);
      setTimeout(() => setCopied(false), 3500);
    } catch {}
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`,
      '_blank'
    );
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-12 mb-10 bg-white rounded-2xl shadow-xl border border-green-400/30">
      <div className="flex flex-col items-center mb-3">
        <CheckCircle className="text-green-500" size={52} />
        <h2 className="text-3xl font-extrabold text-green-700 mt-2 mb-2">
          ¡Pedido confirmado!
        </h2>
      </div>
      <p className="mb-5 text-gray-700 text-lg text-center font-mono tracking-wider">
        Número de Pedido: <span className="font-bold">{order.orderNumber}</span>
      </p>
      <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 mb-4 text-base">
        <div className="mb-1"><b>Nombre:</b> {order.customerName}</div>
        <div className="mb-1"><b>Teléfono:</b> {order.customerPhone}</div>
        <div className="mb-1"><b>Email:</b> {order.customerEmail}</div>
        <div className="mb-1"><b>Tipo de entrega:</b> {order.deliveryType === 'envio' ? 'Envío a domicilio' : 'Retiro en local'}</div>
        {order.deliveryType === 'envio' && (
          <div className="mb-1"><b>Dirección:</b> {order.deliveryAddress}</div>
        )}
        <div className="mt-3 mb-1"><b>Productos solicitados:</b>
          <ul className="list-inside list-disc ml-4 mt-1">
            {order.items.map((item) => (
              <li key={item.id}>
                {item.name} x{item.quantity} = ${item.price * item.quantity}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-2 font-bold"><b>Total:</b> ${order.totalAmount}</div>
        {order.notes && (
          <div className="mt-2"><b>Notas:</b> {order.notes}</div>
        )}
      </div>
      <button
        onClick={enviarWa}
        className="mt-4 w-full py-4 bg-green-500 text-white font-bold rounded-xl shadow-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2 text-lg"
      >
        <svg width="25" height="25" fill="currentColor" viewBox="0 0 24 24"><path d="M17.534 15.066c-.246-.123-1.448-.715-1.672-.797-.224-.082-.387-.123-.549.124-.163.246-.628.797-.77.96-.142.163-.286.184-.533.061-.246-.122-1.04-.383-1.981-1.223-.732-.653-1.226-1.46-1.37-1.707-.142-.246-.015-.379.107-.501.109-.108.245-.282.368-.423.124-.143.163-.245.245-.409.081-.163.041-.306-.02-.429-.061-.123-.548-1.325-.751-1.813-.198-.477-.401-.412-.548-.419-.142-.006-.306-.007-.47-.007s-.429.061-.653.306c-.224.246-.857.838-.857 2.041 0 1.203.877 2.366 1 .392 1.173 1.679 2.382 2.253 3.435 2.493.361.077.691.066.951.04.29-.03.894-.366 1.021-.719.126-.354.126-.658.087-.719-.04-.061-.142-.101-.288-.163m-5.936 6.93c-4.966 0-9-4.033-9-9 0-4.959 4.034-9 9-9 4.967 0 9 4.041 9 9 0 4.967-4.033 9-9 9zm11.446-9.001c0-6.351-5.155-11.501-11.5-11.501s-11.499 5.15-11.499 11.501c0 6.35 5.154 11.501 11.499 11.501s11.5-5.15 11.5-11.501z"/></svg>
        Enviar pedido por WhatsApp
      </button>
      <div className="h-8 mt-3 text-center">
        {/* Mensaje de copiado dinámico */}
        {copied ? (
          <span className="text-green-600 font-semibold">
            ¡Resumen copiado! Solo pegalo en el chat de WhatsApp para confirmar tu pedido.
          </span>
        ) : (
          <span className="text-gray-400 text-xs">
            Al hacer clic, el resumen se copia y se abre WhatsApp.
          </span>
        )}
      </div>
    </div>
  );
}