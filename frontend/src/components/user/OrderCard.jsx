import { Package, Calendar, MapPin, CreditCard, XCircle, RotateCcw } from 'lucide-react';
import orderService from '../../services/order.service';
import toast from 'react-hot-toast';

const OrderCard = ({ order, onOrderUpdated }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Shipped':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Processing':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'Cancelled':
        return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      case 'Return Requested':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default:
        return 'bg-gray-800 text-gray-300 border-gray-700';
    }
  };

  const handleCancel = async () => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        const res = await orderService.cancelOrder(order._id);
        if (res.success) {
          toast.success('Order cancelled successfully!');
          onOrderUpdated && onOrderUpdated();
        }
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to cancel order');
      }
    }
  };

  const handleReturn = async () => {
    const reason = window.prompt('Please enter the reason for return:');
    if (reason && reason.trim()) {
      try {
        const res = await orderService.requestReturn(order._id, reason.trim());
        if (res.success) {
          toast.success('Return request submitted to royal concierge!');
          onOrderUpdated && onOrderUpdated();
        }
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to request return');
      }
    }
  };

  const formattedDate = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : 'N/A';

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-6">
      {/* Header */}
      <div className="bg-gray-50/80 px-6 py-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-6 text-xs text-gray-600">
          <div>
            <span className="text-gray-400 block uppercase font-medium text-[10px]">Order ID</span>
            <span className="font-mono font-semibold text-gray-800">#{String(order._id || '').slice(-8).toUpperCase()}</span>
          </div>
          <div>
            <span className="text-gray-400 block uppercase font-medium text-[10px]">Date</span>
            <span className="font-medium text-gray-800">{formattedDate}</span>
          </div>
          <div>
            <span className="text-gray-400 block uppercase font-medium text-[10px]">Total Amount</span>
            <span className="font-bold text-zakhira-gold text-sm">₹{order.totalAmount?.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(order.orderStatus)}`}>
            {order.orderStatus}
          </span>
        </div>
      </div>

      {/* Body: Items */}
      <div className="p-6">
        <div className="space-y-4">
          {order.items?.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between gap-4 border-b border-gray-50 pb-3 last:border-0 last:pb-0">
              <div className="flex items-center gap-4">
                <img
                  src={item.image || 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800'}
                  alt={item.name}
                  className="w-14 h-14 object-cover rounded bg-gray-100 flex-shrink-0"
                />
                <div>
                  <h4 className="font-playfair font-semibold text-sm text-gray-900 line-clamp-1">{item.name}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Qty: {item.quantity} × ₹{item.price?.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-semibold text-sm text-gray-800">
                  ₹{(item.price * item.quantity)?.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Shipping & Payment Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-300 bg-[#1A1A1A] p-4 rounded-xl border border-white/5">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-[#C9A86C] flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white block">Shipping Address</span>
              <span>
                {order.shippingAddress?.street}, {order.shippingAddress?.city},{' '}
                {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
              </span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CreditCard className="w-4 h-4 text-[#C9A86C] flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white block">Payment Method</span>
              <span>
                {order.paymentMethod} ({order.paymentStatus || 'Pending'})
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls: Cancel & Return */}
        <div className="mt-4 pt-3 border-t border-white/10 flex justify-end gap-3">
          {(order.orderStatus === 'Processing' || order.orderStatus === 'Pending') && (
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-rose-500/20 text-rose-300 border border-rose-500/40 rounded-xl text-xs font-bold uppercase hover:bg-rose-500/30 transition flex items-center gap-1.5 cursor-pointer"
            >
              <XCircle className="w-4 h-4" /> Cancel Order
            </button>
          )}

          {order.orderStatus === 'Delivered' && (
            <button
              type="button"
              onClick={handleReturn}
              className="px-4 py-2 bg-[#C9A86C]/20 text-[#C9A86C] border border-[#C9A86C]/40 rounded-xl text-xs font-bold uppercase hover:bg-[#C9A86C]/30 transition flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" /> Request Return
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
