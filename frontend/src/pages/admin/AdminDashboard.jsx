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
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-playfair font-bold text-zakhira-dark">Dashboard Overview</h1>
        <p className="text-gray-500 text-xs mt-1">Welcome back. Here is your store performance summary.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs uppercase font-semibold tracking-wider text-gray-400 mb-1">Total Revenue</p>
            <h3 className="text-2xl font-bold text-zakhira-gold">₹{stats.totalRevenue.toLocaleString()}</h3>
          </div>
          <div className="p-3 bg-zakhira-gold/10 text-zakhira-gold rounded-xl">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs uppercase font-semibold tracking-wider text-gray-400 mb-1">Total Orders</p>
            <h3 className="text-2xl font-bold text-gray-900">{stats.totalOrders}</h3>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs uppercase font-semibold tracking-wider text-gray-400 mb-1">Active Products</p>
            <h3 className="text-2xl font-bold text-gray-900">{stats.totalProducts}</h3>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <Package className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs uppercase font-semibold tracking-wider text-gray-400 mb-1">Total Users</p>
            <h3 className="text-2xl font-bold text-gray-900">{stats.totalUsers}</h3>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
          <div>
            <h3 className="font-playfair font-bold text-lg text-zakhira-dark">Recent Orders</h3>
            <p className="text-xs text-gray-400">Latest transactions from patrons</p>
          </div>
          <Link
            to="/admin/orders"
            className="text-xs text-zakhira-gold font-semibold hover:underline flex items-center gap-1"
          >
            View All Orders <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {recentOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-gray-50 text-gray-500 uppercase font-semibold text-[10px] tracking-wider">
                <tr>
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Items</th>
                  <th className="px-4 py-3">Total Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50/50 transition">
                    <td className="px-4 py-3 font-mono font-semibold text-gray-800">
                      #{String(order._id || '').slice(-6).toUpperCase()}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {order.user?.name || 'Guest User'}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {order.items?.length || 0} items
                    </td>
                    <td className="px-4 py-3 font-bold text-zakhira-gold">
                      ₹{order.totalAmount?.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        order.orderStatus === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                        order.orderStatus === 'Shipped' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
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
