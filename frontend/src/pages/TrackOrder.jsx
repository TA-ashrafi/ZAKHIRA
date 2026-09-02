import { useState } from 'react';
import { Search, Package, CheckCircle2, Truck, Clock, ShieldCheck, MapPin, AlertCircle } from 'lucide-react';
import orderService from '../services/order.service';
import Loader from '../components/common/Loader';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setLoading(true);
    setError('');
    setOrder(null);

    try {
      const res = await orderService.getOrderById(orderId.trim());
      if (res.success && res.data) {
        setOrder(res.data);
      } else {
        setError('Order not found. Please check your Order ID.');
      }
    } catch (err) {
      setError('Order not found. Please check your Order ID or make sure you are logged in.');
    } finally {
      setLoading(false);
    }
  };

  const getStepStatus = (currentStatus, step) => {
    const statuses = ['Processing', 'Shipped', 'Delivered'];
    const currentIndex = statuses.indexOf(currentStatus);
    const stepIndex = statuses.indexOf(step);

    if (currentStatus === 'Cancelled') return 'cancelled';
    if (currentIndex >= stepIndex) return 'completed';
    return 'pending';
  };

  return (
    <div className="bg-gray-50/30 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-zakhira-gold block mb-1">
            REAL-TIME TRACKING
          </span>
          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-zakhira-dark">
            Track Your Order
          </h1>
          <p className="text-gray-500 text-xs mt-1">
            Enter your Order ID below to view current packaging & shipping status.
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm max-w-xl mx-auto mb-10">
          <form onSubmit={handleTrack} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Enter Order ID (e.g. 65f2a1b...)"
                required
                className="w-full pl-9 pr-3 py-3 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-zakhira-gold"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-zakhira-gold text-white px-6 py-3 rounded font-semibold text-xs uppercase tracking-wider hover:bg-opacity-90 transition shadow whitespace-nowrap"
            >
              {loading ? 'Searching...' : 'Track'}
            </button>
          </form>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-xl text-xs flex items-center gap-2 max-w-xl mx-auto mb-8">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Order Details */}
        {order && (
          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-8 animate-fadeIn">
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-6 text-xs">
              <div>
                <span className="text-gray-400 uppercase font-medium block text-[10px]">Order ID</span>
                <span className="font-mono font-bold text-gray-900 text-sm">#{order._id}</span>
              </div>

              <div>
                <span className="text-gray-400 uppercase font-medium block text-[10px]">Order Date</span>
                <span className="font-medium text-gray-800">
                  {new Date(order.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>

              <div>
                <span className="text-gray-400 uppercase font-medium block text-[10px]">Current Status</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  order.orderStatus === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                  order.orderStatus === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                  order.orderStatus === 'Cancelled' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {order.orderStatus}
                </span>
              </div>
            </div>

            {/* Visual Status Timeline */}
            <div>
              <h3 className="font-playfair font-bold text-base text-zakhira-dark mb-6 text-center">
                Package Progress
              </h3>

              <div className="grid grid-cols-3 gap-2 relative max-w-2xl mx-auto">
                {/* Timeline Bar */}
                <div className="absolute top-5 left-1/6 right-1/6 h-0.5 bg-gray-200 -z-0"></div>

                {/* Step 1: Processing */}
                <div className="flex flex-col items-center text-center z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition ${
                    getStepStatus(order.orderStatus, 'Processing') === 'completed'
                      ? 'bg-zakhira-gold text-white shadow-md'
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    <Package className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-xs text-gray-800">Order Placed & Packaging</span>
                  <span className="text-[10px] text-gray-400 mt-0.5">Crafting & Insured Packing</span>
                </div>

                {/* Step 2: Shipped */}
                <div className="flex flex-col items-center text-center z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition ${
                    getStepStatus(order.orderStatus, 'Shipped') === 'completed'
                      ? 'bg-zakhira-gold text-white shadow-md'
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    <Truck className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-xs text-gray-800">In Transit</span>
                  <span className="text-[10px] text-gray-400 mt-0.5">Handed to Secure Courier</span>
                </div>

                {/* Step 3: Delivered */}
                <div className="flex flex-col items-center text-center z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition ${
                    getStepStatus(order.orderStatus, 'Delivered') === 'completed'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-xs text-gray-800">Delivered</span>
                  <span className="text-[10px] text-gray-400 mt-0.5">Safely Handed Over</span>
                </div>
              </div>
            </div>

            {/* Delivery Address & Order Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100 text-xs">
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <span className="font-bold text-gray-800 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-zakhira-gold" /> Shipping Address
                </span>
                <p className="text-gray-600 leading-relaxed">
                  {order.shippingAddress?.street}, {order.shippingAddress?.city},{' '}
                  {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <span className="font-bold text-gray-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-zakhira-gold" /> Payment Method
                </span>
                <p className="text-gray-600 font-medium">
                  {order.paymentMethod} ({order.paymentStatus || 'Pending'})
                </p>
                <p className="font-bold text-zakhira-gold text-sm mt-1">
                  Total: ₹{order.totalAmount?.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
