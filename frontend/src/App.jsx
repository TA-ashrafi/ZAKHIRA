import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import ScrollProgress from './components/common/ScrollProgress';
import BackToTop from './components/common/BackToTop';

// User Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';
import TrackOrder from './pages/TrackOrder';
import About from './pages/About';
import OurStory from './pages/OurStory';
import Craftsmanship from './pages/Craftsmanship';
import Sustainability from './pages/Sustainability';
import StoreLocator from './pages/StoreLocator';
import Careers from './pages/Careers';
import ShippingInfo from './pages/ShippingInfo';
import ReturnsExchanges from './pages/ReturnsExchanges';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';

// Admin Components & Pages
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminProducts from './pages/admin/AdminProducts';
import AdminAddProduct from './pages/admin/AdminAddProduct';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';
import AdminCoupons from './pages/admin/AdminCoupons';

import useAuth from './hooks/useAuth';

// Public Layout Wrapper with Navbar & Footer
const PublicLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col font-inter bg-[#0D0D0D] text-white">
      <ScrollProgress />
      <Navbar />
      <main className={`flex-1 ${isHomePage ? '' : 'pt-28 md:pt-32'}`}>
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

// Protected User Route Guard
const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

// Admin Route Guard
const AdminRoute = () => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return (
    <>
      <ScrollProgress />
      <AdminLayout />
      <BackToTop />
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: '#1A1A1A',
                  color: '#FFFFFF',
                  fontSize: '12px',
                  borderRadius: '6px',
                },
                success: {
                  iconTheme: {
                    primary: '#C9A86C',
                    secondary: '#FFFFFF',
                  },
                },
              }}
            />

            <Routes>
              {/* Public Routes with Navbar & Footer */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/track-order" element={<TrackOrder />} />
                <Route path="/about" element={<About />} />
                <Route path="/our-story" element={<OurStory />} />
                <Route path="/craftsmanship" element={<Craftsmanship />} />
                <Route path="/sustainability" element={<Sustainability />} />
                <Route path="/store-locator" element={<StoreLocator />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/shipping-info" element={<ShippingInfo />} />
                <Route path="/returns-exchanges" element={<ReturnsExchanges />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/contact" element={<Contact />} />

                {/* Protected User Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/profile" element={<Profile />} />
                </Route>
              </Route>

              {/* Admin Portal Routes */}
              <Route element={<AdminRoute />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/analytics" element={<AdminAnalytics />} />
                <Route path="/admin/products" element={<AdminProducts />} />
                <Route path="/admin/add-product" element={<AdminAddProduct />} />
                <Route path="/admin/edit-product/:id" element={<AdminAddProduct />} />
                <Route path="/admin/orders" element={<AdminOrders />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/coupons" element={<AdminCoupons />} />
              </Route>

              {/* Fallback redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
