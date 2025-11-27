import mongoose from 'mongoose';

/**
 * MenuItem Schema for MongoDB
 * Stores menu items with pricing and availability
 */
const MenuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  available: {
    type: Boolean,
    default: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

// Prevent model recompilation in development
export default mongoose.models.MenuItem || mongoose.model('MenuItem', MenuItemSchema);
