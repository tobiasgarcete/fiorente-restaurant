import mongoose from 'mongoose';

/**
 * MongoDB Connection Utility
 * Handles connection caching for serverless environments
 */

const MONGODB_URI = process.env.MONGODB_URI || '';

// Extend global type for mongoose caching
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

const cached = global.mongooseCache ?? { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

/**
 * Connect to MongoDB database
 * Uses connection caching for better performance in serverless environments
 */
async function dbConnect(): Promise<typeof mongoose> {
  // Return cached connection if available
  if (cached.conn) {
    return cached.conn;
  }

  // Check for MongoDB URI
  if (!MONGODB_URI) {
    console.warn('MongoDB URI not configured. Database features will be unavailable.');
    throw new Error('Por favor define la variable MONGODB_URI en .env.local');
  }

  // Create new connection if no promise exists
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
