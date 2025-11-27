import mongoose from 'mongoose';

/**
 * Order Schema for MongoDB
 * Stores customer orders with items, delivery info, and status
 */
const OrderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  customerPhone: {
    type: String,
    required: true,
  },
  customerEmail: {
    type: String,
  },
  deliveryType: {
    type: String,
    enum: ['retiro', 'envio'],
    required: true,
  },
  deliveryAddress: {
    type: String,
  },
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  notes: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pendiente', 'confirmado', 'en_preparacion', 'listo', 'entregado'],
    default: 'pendiente',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent model recompilation in development
export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
