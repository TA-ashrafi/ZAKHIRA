import { useState, useEffect } from 'react';
import { Package, Search, Clock, CheckCircle, AlertCircle, MapPin, User, CreditCard } from 'lucide-react';
import orderService from '../../services/order.service';
import Loader from '../../components/common/Loader';
import toast from 'react-hot-toast';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await orderService.getAllOrders();
      if (res.success && res.data) {
        setOrders(res.data);
      }
    } catch (err) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await orderService.updateOrderStatus(orderId, newStatus);
      if (res.success) {
        toast.success(`Order status updated to ${newStatus}`);
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, orderStatus: newStatus } : o))
        );
      }
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const filteredOrders = orders.filter(
    (o) =>
      o._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 text-[#F8F6F1]">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-playfair font-bold text-white">Manage Orders</h1>
        <p className="text-gray-400 text-xs mt-1">Track customer orders and update delivery status</p>
      </div>

      {/* Search */}
      <div className="bg-[#141414] p-4 rounded-xl border border-[#C9A86C]/30 shadow-md flex items-center gap-3 max-w-md">
        <Search className="w-4 h-4 text-[#C9A86C]" />
        <input
          type="text"
          placeholder="Search order ID or customer name/email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-xs focus:outline-none bg-transparent text-white placeholder-gray-500"
        />
      </div>

      {/* Orders List */}
      {loading ? (
        <Loader />
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order._id} className="bg-[#141414] rounded-xl border border-white/10 shadow-lg p-6 space-y-4">
              {/* Order Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 text-xs">
                <div className="flex flex-wrap items-center gap-6">
                  <div>
                    <span className="text-gray-400 block font-semibold uppercase text-[10px]">Order ID</span>
                    <span className="font-mono font-bold text-white">#{order._id}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block font-semibold uppercase text-[10px]">Date</span>
                    <span className="font-medium text-gray-300">{new Date(order.createdAt).toLocaleString('en-IN')}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block font-semibold uppercase text-[10px]">Total Amount</span>
                    <span className="font-bold text-[#C9A86C] text-sm">₹{order.totalAmount?.toLocaleString()}</span>
                  </div>
                </div>

                {/* Status Dropdown */}
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-400">Status:</span>
                  <select
                    value={order.orderStatus}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border focus:outline-none bg-[#0D0D0D] ${
                      order.orderStatus === 'Delivered' ? 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10' :
                      order.orderStatus === 'Shipped' ? 'text-blue-400 border-blue-500/40 bg-blue-500/10' :
                      order.orderStatus === 'Cancelled' ? 'text-rose-400 border-rose-500/40 bg-rose-500/10' :
                      'text-amber-400 border-amber-500/40 bg-amber-500/10'
                    }`}
                  >
                    <option value="Processing" className="bg-[#141414] text-white">Processing</option>
                    <option value="Shipped" className="bg-[#141414] text-white">Shipped</option>
                    <option value="Delivered" className="bg-[#141414] text-white">Delivered</option>
                    <option value="Cancelled" className="bg-[#141414] text-white">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Customer & Address Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-300 bg-[#0D0D0D] p-4 rounded-lg border border-white/5">
                <div className="flex items-start gap-2.5">
                  <User className="w-4 h-4 text-[#C9A86C] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Customer Info</span>
                    <span>{order.user?.name} ({order.user?.email})</span>
                    {order.user?.phone && <span className="block text-gray-400">Phone: {order.user.phone}</span>}
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#C9A86C] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Delivery Address</span>
                    <span>
                      {order.shippingAddress?.street}, {order.shippingAddress?.city},{' '}
                      {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
                    </span>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2 text-xs">
                <span className="font-semibold text-gray-400 uppercase text-[10px] block">Items</span>
                {order.items?.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between border-b border-white/5 pb-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image || 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800'}
                        alt={item.name}
                        className="w-10 h-10 object-cover rounded bg-gray-900 border border-white/10"
                      />
                      <span className="font-semibold text-white">{item.name}</span>
                    </div>
                    <span className="text-gray-400">
                      Qty: {item.quantity} × ₹{item.price?.toLocaleString()} = <strong className="text-[#C9A86C]">₹{(item.price * item.quantity)?.toLocaleString()}</strong>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {filteredOrders.length === 0 && (
            <div className="bg-[#141414] p-12 rounded-xl border border-white/10 text-center text-gray-400">
              <Package className="w-10 h-10 mx-auto mb-2 opacity-50 text-[#C9A86C]" />
              <p>No orders found matching search.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
