import dns from 'dns';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// ===== CRON JOB IMPORT =====
import cronJob from './cron.js';

// Routes
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import cartRoutes from './routes/cart.routes.js';
import wishlistRoutes from './routes/wishlist.routes.js';
import orderRoutes from './routes/order.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import couponRoutes from './routes/coupon.routes.js';
import subscriberRoutes from './routes/subscriber.routes.js';
import paymentRoutes from './routes/payment.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

dns.setServers(["1.1.1.1", "8.8.8.8"]);

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ========== ROUTES ==========
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/subscribers', subscriberRoutes);
app.use('/api/payment', paymentRoutes);

// ========== TEST ROUTE ==========
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '✨ ZAKHIRA API is running!',
    database: mongoose.connection.readyState === 1 ? 'Connected ✅' : 'Disconnected ❌'
  });
});

// ========== HEALTH CHECK ROUTE ==========
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'OK',
    database: mongoose.connection.readyState === 1 ? 'Connected ✅' : 'Disconnected ❌',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// ========== API DOCS ==========
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'ZAKHIRA API Documentation',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        me: 'GET /api/auth/me',
        profile: 'PUT /api/auth/profile',
        users: 'GET /api/auth/users (Admin)'
      },
      products: {
        all: 'GET /api/products',
        single: 'GET /api/products/:id',
        create: 'POST /api/products (Admin)',
        update: 'PUT /api/products/:id (Admin)',
        delete: 'DELETE /api/products/:id (Admin)'
      },
      cart: {
        get: 'GET /api/cart',
        add: 'POST /api/cart/add',
        update: 'PUT /api/cart/update',
        remove: 'DELETE /api/cart/remove/:productId',
        clear: 'DELETE /api/clear'
      },
      wishlist: {
        get: 'GET /api/wishlist',
        add: 'POST /api/wishlist/add',
        remove: 'DELETE /api/wishlist/remove/:productId'
      },
      orders: {
        place: 'POST /api/orders',
        all: 'GET /api/orders',
        adminAll: 'GET /api/orders/admin/all (Admin)',
        single: 'GET /api/orders/:id',
        status: 'PUT /api/orders/:id/status (Admin)'
      },
      upload: {
        image: 'POST /api/upload/image (Admin)'
      },
      coupons: {
        create: 'POST /api/coupons (Admin)',
        all: 'GET /api/coupons (Admin)',
        apply: 'POST /api/coupons/apply',
        delete: 'DELETE /api/coupons/:id (Admin)'
      }
    }
  });
});

// ========== DATABASE CONNECTION ==========
const connectDB = async () => {
  try {
    if (process.env.MONGO_URI) {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('✅ MongoDB Connected Successfully!');
      console.log(`📊 Database: ${mongoose.connection.name}`);
    } else {
      console.log('⚠️ MONGO_URI not provided in .env');
    }
  } catch (err) {
    console.error('❌ MongoDB Connection Failed:', err.message);
  }
};

connectDB();

// ========== 404 HANDLER ==========
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`
  });
});

// ========== GLOBAL ERROR HANDLER ==========
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// ========== START SERVER + CRON JOB ==========
app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log(`✨ ZAKHIRA Jewellery API`);
  console.log(`🚀 Server running on: http://localhost:${PORT}`);
  console.log(`📡 Test: http://localhost:${PORT}`);
  console.log(`📚 Docs: http://localhost:${PORT}/api`);
  console.log('='.repeat(50));
  
  // ===== START CRON JOB =====
  cronJob.start();
  console.log('⏰ Auto-ping cron job started (every 14 minutes)');
});