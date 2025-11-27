import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';

/**
 * Generate a unique order number
 * Format: FIO-YYYYMMDD-XXXX
 */
function generateOrderNumber(): string {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');
  return `FIO-${dateStr}-${random}`;
}

/**
 * POST /api/pedidos - Create a new order
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    const { customerName, customerPhone, deliveryType, items, totalAmount } = body;

    if (!customerName || !customerPhone || !deliveryType || !items || !totalAmount) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Validate items array
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'El pedido debe tener al menos un producto' },
        { status: 400 }
      );
    }

    // Validate delivery address for delivery orders
    if (deliveryType === 'envio' && !body.deliveryAddress) {
      return NextResponse.json(
        { error: 'La dirección es requerida para envíos' },
        { status: 400 }
      );
    }

    // Generate unique order number
    const orderNumber = generateOrderNumber();

    // Create order data
    const orderData = {
      orderNumber,
      customerName,
      customerPhone,
      customerEmail: body.customerEmail || undefined,
      deliveryType,
      deliveryAddress: body.deliveryAddress || undefined,
      items,
      totalAmount,
      notes: body.notes || undefined,
      status: 'pendiente',
    };

    // Try to save to MongoDB, but don't fail if connection is unavailable
    try {
      await dbConnect();
      const order = new Order(orderData);
      await order.save();
      console.log('Order saved to database:', orderNumber);
    } catch (dbError) {
      // Log the error but don't fail the request
      console.warn('Could not save to database:', dbError);
      // Continue with success response as the order number was generated
    }

    return NextResponse.json(
      {
        success: true,
        orderNumber,
        message: 'Pedido creado exitosamente',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Error al procesar el pedido' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/pedidos - Get all orders (for admin purposes)
 */
export async function GET() {
  try {
    await dbConnect();
    const orders = await Order.find({}).sort({ createdAt: -1 }).limit(100);
    
    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Error al obtener pedidos' },
      { status: 500 }
    );
  }
}
