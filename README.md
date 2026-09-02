# ✨ ZAKHIRA - Complete Luxury Jewellery Ecommerce Platform

ZAKHIRA is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) ecommerce application crafted for a luxury jewellery brand. It features a gold (#C9A86C) theme, responsive mobile-first UI, full authentication, shopping cart, wishlist, checkout flow, order tracking, and a comprehensive admin management portal.

---

## 🎨 Design Theme & Specifications

- **Primary Color:** Gold (`#C9A86C`)
- **Dark Neutral:** `#1A1A1A`
- **Light Neutral:** `#F8F6F1`
- **Typography:** Playfair Display (Headings), Inter (Body)
- **Style:** Luxury, Minimalist, Premium

---

## 🛠️ Tech Stack

### Frontend
- **React.js (Vite)**
- **Tailwind CSS**
- **React Router DOM v7**
- **Lucide React** (Icons)
- **Framer Motion**
- **Axios**
- **React Hot Toast**

### Backend
- **Node.js with Express.js**
- **MongoDB with Mongoose**
- **JWT Authentication** (JSON Web Tokens)
- **Bcryptjs** (Password hashing)
- **Cloudinary** (Image upload stream)
- **Multer** (Multipart form data handling)

---

## 🔐 Important DNS Note

In `backend/server.js`, the DNS configuration is explicitly set to:
```javascript
import dns from 'dns';
dns.setServers(["1.1.1.1", "8.8.8.8"]);
```
**This configuration is preserved for MongoDB Atlas connection reliability.**

---

## 🚀 Getting Started

### 1. Environment Variables Setup

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/zakhira_db
JWT_SECRET=zakhira_super_secret_key_2026
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173

# Cloudinary Setup
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Stripe Setup (Optional)
STRIPE_SECRET_KEY=sk_test_xxxxx
```

---

### 2. Installation & Running Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Seed the database with 12 initial products & default admin account
npm run seed

# Start backend server
npm start
```

Backend will run on: `http://localhost:5000`

---

### 3. Running Frontend

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Build production bundle
npm run build

# Start development server
npm run dev
```

Frontend will run on: `http://localhost:5173`

---

## 🔑 Default Credentials

- **Admin Account:**
  - **Email:** `admin@zakhira.com`
  - **Password:** `adminpassword123`
- **Customer Account:** You can register a new account on the `/register` page.

---

## 📡 API Endpoints Summary

### Auth Routes (`/api/auth`)
- `POST /register` - Register a new user
- `POST /login` - Login user & receive JWT token
- `GET /me` - Get current user profile (Protected)
- `PUT /profile` - Update user profile (Protected)
- `GET /users` - List all registered users (Admin only)

### Product Routes (`/api/products`)
- `GET /` - List all products with filtering, search, and sorting
- `GET /:id` - Get single product details
- `POST /` - Create product (Admin only)
- `PUT /:id` - Update product (Admin only)
- `DELETE /:id` - Delete product (Admin only)

### Cart Routes (`/api/cart`)
- `GET /` - Get user cart (Protected)
- `POST /add` - Add item to cart (Protected)
- `PUT /update` - Update item quantity (Protected)
- `DELETE /remove/:productId` - Remove item from cart (Protected)
- `DELETE /clear` - Clear cart (Protected)

### Wishlist Routes (`/api/wishlist`)
- `GET /` - Get user wishlist (Protected)
- `POST /add` - Add product to wishlist (Protected)
- `DELETE /remove/:productId` - Remove product from wishlist (Protected)

### Order Routes (`/api/orders`)
- `POST /` - Place new order (Protected)
- `GET /` - Get current user order history (Protected)
- `GET /admin/all` - List all store orders (Admin only)
- `GET /:id` - Get single order details (Protected)
- `PUT /:id/status` - Update order status (Admin only)

### Upload Routes (`/api/upload`)
- `POST /image` - Upload image to Cloudinary (Admin only)

---

## 👑 Features Overview

- **Luxury Homepage:** Full-screen hero section, top notice bar, shop by category, best seller grid, curated signature series, customer testimonials, video reviews, and newsletter subscription.
- **Product Filter & Search:** Real-time search, category tabs, price range filters, sorting by featured, price low-high, price high-low, and newest arrivals.
- **Interactive Product Detail:** Image gallery thumbnails, specifications, gold purity badges, quantity selector, instant add to cart, and wishlist toggle.
- **Shopping Cart & Checkout:** Persistent cart session, shipping calculation, full shipping form, multiple payment methods (COD, UPI, Card, NetBanking).
- **Admin Dashboard:** Overview cards (Revenue, Orders, Products, Users), recent orders, product CRUD management with Cloudinary image uploading, order status updating, and user directory.
