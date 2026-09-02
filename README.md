# ✨ ZAKHIRA - Complete Luxury Jewellery Ecommerce Platform

ZAKHIRA is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) ecommerce application crafted for a luxury jewellery brand. It features a gold (`#C9A86C`) theme, responsive mobile-first UI, full JWT authentication, shopping cart, wishlist, checkout flow, order tracking, and a comprehensive admin management portal.

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
**This configuration is strictly preserved for MongoDB Atlas connection reliability.**

---

## 🚀 Getting Started Guide

### 1. Environment Variables Setup

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/zakhira_db
JWT_SECRET=zakhira_super_secret_key_2026
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173

# Cloudinary Setup (Optional - image URLs can also be added directly)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Stripe Setup (Optional)
STRIPE_SECRET_KEY=sk_test_xxxxx
```

---

### 2. Installation & Database Seeding

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Seed the MongoDB database (Populates 12 jewellery items & Default Admin Account)
npm run seed

# Start backend API server
npm start
```

Backend API will be running on: `http://localhost:5000`

---

### 3. Running Frontend Application

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Build production bundle
npm run build

# Start Vite dev server
npm run dev
```

Frontend Application will be running on: `http://localhost:5173`

---

## 🔑 Credentials & Access Roles

### 👑 Admin Credentials
- **Email:** `admin@zakhira.com`
- **Password:** `adminpassword123`

---

## 📘 Step-by-Step User Guide

### 1️⃣ How to Login as Admin & Add Products
1. Open the website at `http://localhost:5173`.
2. Click on the **Login** icon or link in the header top bar.
3. Enter Admin credentials:
   - **Email:** `admin@zakhira.com`
   - **Password:** `adminpassword123`
4. Upon login, you will automatically be redirected to the **Admin Dashboard** (`/admin`).
5. Click **Add Product** (`/admin/add-product`) from the sidebar.
6. Fill in the product details:
   - Product Name, Category (Necklace, Ring, Earring, Bracelet, Pendant, Anklet), Description, Price, Compare Price, Gold Purity (18K, 22K, 24K), Stone Type, Weight, Stock Quantity, and Featured toggle.
   - Upload image file or paste an image URL (e.g., Unsplash/Cloudinary link) and click **Add URL**.
7. Click **Create Product**. The product will immediately be saved in MongoDB and displayed across the catalog.

---

### 2️⃣ How a Customer Buys a Product
1. Open `http://localhost:5173` and click **REGISTER** or **LOGIN**.
2. To register a new account, enter Full Name, Email, Password (min 6 chars), and Phone Number.
   - Password is automatically hashed using **bcryptjs** (10 salt rounds) before storing in MongoDB.
   - A signed **JWT token** is returned and securely saved in local storage.
3. Browse the **Shop** page (`/shop`), filter by category (Necklaces, Rings, Earrings, etc.), price range, or search.
4. Click on any product to open the **Product Detail** page.
5. Select quantity and click **ADD TO CART** or **ADD TO WISHLIST**.
6. Open the **Shopping Cart** (`/cart`), inspect item quantities, subtotal, and click **PROCEED TO CHECKOUT**.
7. On the **Checkout** page (`/checkout`):
   - Enter your Shipping Address (Street, City, State, Pincode, Country).
   - Select Payment Method (**Cash on Delivery**, **UPI/QR**, **Card**, or **NetBanking**).
   - Click **PLACE ORDER**.
8. Order is processed:
   - Order record created in MongoDB.
   - Product stock quantity automatically updated.
   - Cart cleared.
9. View your placed order under **My Account / Profile** (`/profile`).

---

## 📡 API Endpoints Summary

### Auth Routes (`/api/auth`)
- `POST /register` - Register a new user with password hashing
- `POST /login` - Login user & receive JWT token
- `GET /me` - Get current authenticated user details (Protected)
- `PUT /profile` - Update user profile & primary address (Protected)
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
