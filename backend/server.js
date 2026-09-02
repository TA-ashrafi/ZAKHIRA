import dns from 'dns';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Routes
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import cartRoutes from './routes/cart.routes.js';
import wishlistRoutes from './routes/wishlist.routes.js';
import orderRoutes from './routes/order.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

dns.setServers(["1.1.1.1", "8.8.8.8"]);

// Middleware
app.use(express.json());

// ========== ROUTES ==========
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/orders', orderRoutes);

// ========== TEST ROUTE ==========
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '✨ ZAKHIRA API is running!',
    database: mongoose.connection.readyState === 1 ? 'Connected ✅' : 'Disconnected ❌'
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
        profile: 'PUT /api/auth/profile'
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
        clear: 'DELETE /api/cart/clear'
      },
      wishlist: {
        get: 'GET /api/wishlist',
        add: 'POST /api/wishlist/add',
        remove: 'DELETE /api/wishlist/remove/:productId'
      },
      orders: {
        place: 'POST /api/orders',
        all: 'GET /api/orders',
        single: 'GET /api/orders/:id',
        status: 'PUT /api/orders/:id/status (Admin)'
      }
    }
  });
});

// ========== DATABASE ==========
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected Successfully!');
    console.log(`📊 Database: ${mongoose.connection.name}`);
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Failed:', err.message);
    process.exit(1);
  });

// ========== 404 HANDLER ==========
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`
  });
});

// ========== GLOBAL ERROR HANDLER ==========
app.use((err, req, res) => {
  console.error('❌ Error:', err.message);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// ========== START SERVER ==========
app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log(`✨ ZAKHIRA Jewellery API`);
  console.log(`🚀 Server running on: http://localhost:${PORT}`);
  console.log(`📡 Test: http://localhost:${PORT}`);
  console.log(`📚 Docs: http://localhost:${PORT}/api`);
  console.log('='.repeat(50));
});