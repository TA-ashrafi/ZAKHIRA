import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  PlusCircle, 
  ShoppingBag, 
  Users, 
  Tag,
  ArrowLeft, 
  LogOut,
  Menu,
  X,
  Crown
} from 'lucide-react';
import useAuth from '../../hooks/useAuth';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Add Product', path: '/admin/add-product', icon: PlusCircle },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingBag },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Coupons', path: '/admin/coupons', icon: Tag },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-zakhira-dark text-white p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Crown className="w-5 h-5 text-zakhira-gold" />
          <span className="font-playfair font-bold text-lg text-zakhira-gold">ZAKHIRA Admin</span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1">
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40 w-64 bg-zakhira-dark text-white flex flex-col justify-between transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div>
          {/* Admin Header */}
          <div className="p-6 border-b border-white/10 hidden md:flex items-center gap-3">
            <div className="p-2 bg-zakhira-gold/20 rounded-lg text-zakhira-gold border border-zakhira-gold/30">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-playfair font-bold text-xl text-zakhira-gold">ZAKHIRA</h2>
              <p className="text-[10px] text-white/60 tracking-widest uppercase">Admin Dashboard</p>
            </div>
          </div>

          {/* User Badge */}
          <div className="p-4 mx-4 my-4 bg-white/5 rounded-lg border border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 bg-zakhira-gold text-white font-bold rounded-full flex items-center justify-center uppercase text-sm">
              {user?.name ? user.name[0] : 'A'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-xs text-white truncate">{user?.name}</p>
              <p className="text-[10px] text-zakhira-gold tracking-wider uppercase">Administrator</p>
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
                    flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition
                    ${isActive
                      ? 'bg-zakhira-gold text-white shadow-md'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'}
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
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium text-white/70 hover:bg-white/10 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4 text-zakhira-gold" /> Return to Website
          </Link>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition text-left"
          >
            <LogOut className="w-4 h-4" /> Logout
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
