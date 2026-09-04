import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart2,
  Package, 
  PlusCircle, 
  ShoppingBag, 
  Users, 
  Tag,
  ArrowLeft, 
  LogOut,
  Menu,
  X,
  Bell,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import orderService from '../../services/order.service';
import productService from '../../services/product.service';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const navigation = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Analytics', path: '/admin/analytics', icon: BarChart2 },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Add Product', path: '/admin/add-product', icon: PlusCircle },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingBag },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Coupons', path: '/admin/coupons', icon: Tag },
  ];

  // Fetch real-time alerts for orders and stock
  useEffect(() => {
    const fetchAdminAlerts = async () => {
      try {
        const [ordersRes, productsRes] = await Promise.all([
          orderService.getAllOrders().catch(() => ({ data: [] })),
          productService.getProducts().catch(() => ({ data: [] }))
        ]);

        const alertsList = [];
        const rawOrders = Array.isArray(ordersRes?.data) ? ordersRes.data : (Array.isArray(ordersRes) ? ordersRes : []);
        const rawProducts = Array.isArray(productsRes?.data) ? productsRes.data : (Array.isArray(productsRes) ? productsRes : []);

        // 1. Order notifications
        rawOrders.slice(0, 5).forEach((order, idx) => {
          alertsList.push({
            id: `order-${order._id || idx}`,
            type: 'order',
            title: 'New Order Received',
            message: `Order #${(order._id || '').substring(0, 8)} for ₹${(order.totalAmount || order.totalPrice || 0).toLocaleString()}`,
            time: 'Just now',
            link: '/admin/orders'
          });
        });

        // 2. Low Stock notifications
        rawProducts.filter(p => (p.stockQuantity || 0) <= 3).forEach((p) => {
          alertsList.push({
            id: `stock-${p._id}`,
            type: 'stock',
            title: 'Low Stock Alert',
            message: `"${p.name}" has only ${p.stockQuantity || 0} items remaining!`,
            time: 'Attention needed',
            link: `/admin/edit-product/${p._id}`
          });
        });

        setNotifications(alertsList);
        setUnreadCount(alertsList.length);
      } catch (err) {
        // Fallback gracefully
      }
    };

    fetchAdminAlerts();
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F8F6F1] flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-[#141414] border-b border-white/10 text-white p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="font-playfair font-bold text-lg text-[#C9A86C]">ZAKHIRA Admin</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-1.5 text-[#C9A86C] hover:bg-white/5 rounded-lg"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1">
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40 w-64 bg-[#141414] border-r border-[#C9A86C]/20 text-white flex flex-col justify-between transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div>
          {/* Admin Header */}
          <div className="p-6 border-b border-white/10 hidden md:flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <h2 className="font-playfair font-bold text-xl text-[#C9A86C]">ZAKHIRA</h2>
                <p className="text-[10px] text-gray-400 tracking-widest uppercase">Admin Control Center</p>
              </div>
            </div>

            {/* Notification Bell Icon */}
            <div className="relative">
              <button
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  setUnreadCount(0);
                }}
                className="relative p-2 text-[#C9A86C] hover:bg-white/5 rounded-full border border-[#C9A86C]/30 transition"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Popup Dropdown */}
              {notificationsOpen && (
                <div className="absolute left-0 mt-3 w-80 bg-[#1A1A1A] border border-[#C9A86C]/40 rounded-2xl shadow-2xl p-4 z-50 space-y-3">
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <h4 className="font-playfair font-bold text-sm text-white flex items-center gap-1.5">
                      <Bell className="w-4 h-4 text-[#C9A86C]" /> Admin Alerts
                    </h4>
                    <button
                      onClick={() => setNotificationsOpen(false)}
                      className="text-xs text-gray-400 hover:text-white"
                    >
                      Close
                    </button>
                  </div>

                  <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
                    {notifications.map((n) => (
                      <Link
                        key={n.id}
                        to={n.link}
                        onClick={() => setNotificationsOpen(false)}
                        className={`block p-3 rounded-xl border text-xs transition ${
                          n.type === 'stock'
                            ? 'bg-amber-950/30 border-amber-500/30 text-amber-200 hover:bg-amber-900/40'
                            : 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200 hover:bg-emerald-900/40'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold mb-1">
                          <span className="flex items-center gap-1">
                            {n.type === 'stock' ? <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> : <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />}
                            {n.title}
                          </span>
                          <span className="text-[9px] opacity-70 font-mono">{n.time}</span>
                        </div>
                        <p className="text-[11px] opacity-90 leading-tight">{n.message}</p>
                      </Link>
                    ))}

                    {notifications.length === 0 && (
                      <p className="text-xs text-gray-400 text-center py-4">No new notifications.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* User Badge */}
          <div className="p-4 mx-4 my-4 bg-white/5 rounded-xl border border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 bg-[#C9A86C] text-black font-bold rounded-full flex items-center justify-center uppercase text-sm">
              {user?.name ? user.name[0] : 'A'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-xs text-white truncate">{user?.name}</p>
              <p className="text-[10px] text-[#C9A86C] tracking-wider uppercase font-medium">Administrator</p>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="px-4 space-y-1.5">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition
                    ${isActive 
                      ? 'bg-[#C9A86C] text-black shadow-lg shadow-[#C9A86C]/20'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'}
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-300 hover:bg-white/5 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4 text-[#C9A86C]" /> Return to Storefront
          </Link>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition text-left"
          >
            <LogOut className="w-4 h-4" /> Logout Account
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
