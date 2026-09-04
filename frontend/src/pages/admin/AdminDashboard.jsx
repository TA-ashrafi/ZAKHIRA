import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, ShoppingBag, Package, Users, ArrowUpRight } from 'lucide-react';
import orderService from '../../services/order.service';
import productService from '../../services/product.service';
import authService from '../../services/auth.service';
import Loader from '../../components/common/Loader';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [ordersRes, productsRes, usersRes] = await Promise.allSettled([
          orderService.getAllOrders(),
          productService.getProducts(),
          authService.getUsers(),
        ]);

        const orders = ordersRes.status === 'fulfilled' && ordersRes.value?.success ? ordersRes.value.data : [];
        const products = productsRes.status === 'fulfilled' && productsRes.value?.success ? productsRes.value.data : [];
        const users = usersRes.status === 'fulfilled' && usersRes.value?.success ? usersRes.value.data : [];

        const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

        setStats({
          totalRevenue,
          totalOrders: orders.length,
          totalProducts: products.length,
          totalUsers: users.length,
        });

        setRecentOrders(orders.slice(0, 5));
      } catch (err) {
        console.error('Failed to load dashboard data', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="space-y-8 text-[#F8F6F1]">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-playfair font-bold text-white">Dashboard Overview</h1>
        <p className="text-gray-400 text-xs mt-1">Welcome back. Here is your store performance summary.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#141414] p-6 rounded-xl border border-[#C9A86C]/30 shadow-lg flex items-center justify-between">
          <div>
            <p className="text-xs uppercase font-semibold tracking-wider text-gray-400 mb-1">Total Revenue</p>
            <h3 className="text-2xl font-bold text-[#C9A86C]">₹{stats.totalRevenue.toLocaleString()}</h3>
          </div>
          <div className="p-3 bg-[#C9A86C]/10 text-[#C9A86C] border border-[#C9A86C]/30 rounded-xl">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-[#141414] p-6 rounded-xl border border-white/10 shadow-lg flex items-center justify-between">
          <div>
            <p className="text-xs uppercase font-semibold tracking-wider text-gray-400 mb-1">Total Orders</p>
            <h3 className="text-2xl font-bold text-white">{stats.totalOrders}</h3>
          </div>
          <div className="p-3 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-xl">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-[#141414] p-6 rounded-xl border border-white/10 shadow-lg flex items-center justify-between">
          <div>
            <p className="text-xs uppercase font-semibold tracking-wider text-gray-400 mb-1">Active Products</p>
            <h3 className="text-2xl font-bold text-white">{stats.totalProducts}</h3>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl">
            <Package className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-[#141414] p-6 rounded-xl border border-white/10 shadow-lg flex items-center justify-between">
          <div>
            <p className="text-xs uppercase font-semibold tracking-wider text-gray-400 mb-1">Total Users</p>
            <h3 className="text-2xl font-bold text-white">{stats.totalUsers}</h3>
          </div>
          <div className="p-3 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-[#141414] rounded-xl border border-white/10 shadow-lg p-6">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
          <div>
            <h3 className="font-playfair font-bold text-lg text-white">Recent Orders</h3>
            <p className="text-xs text-gray-400">Latest transactions from patrons</p>
          </div>
          <Link
            to="/admin/orders"
            className="text-xs text-[#C9A86C] font-semibold hover:underline flex items-center gap-1"
          >
            View All Orders <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {recentOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#0D0D0D] text-gray-400 uppercase font-semibold text-[10px] tracking-wider border-b border-white/10">
                <tr>
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Items</th>
                  <th className="px-4 py-3">Total Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-white/5 transition">
                    <td className="px-4 py-3 font-mono font-semibold text-white">
                      #{String(order._id || '').slice(-6).toUpperCase()}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-200">
                      {order.user?.name || 'Guest User'}
                    </td>
                    <td className="px-4 py-3 text-gray-400">
                      {order.items?.length || 0} items
                    </td>
                    <td className="px-4 py-3 font-bold text-[#C9A86C]">
                      ₹{order.totalAmount?.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        order.orderStatus === 'Delivered' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                        order.orderStatus === 'Shipped' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-400 text-xs text-center py-6">No recent orders found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
