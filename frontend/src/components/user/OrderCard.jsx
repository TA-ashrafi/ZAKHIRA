import { Package, Calendar, MapPin, CreditCard, ChevronRight } from 'lucide-react';

const OrderCard = ({ order }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Processing':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Cancelled':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
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
        <div className="mt-6 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-600 bg-gray-50/50 p-4 rounded-md">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-zakhira-gold flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-gray-800 block">Shipping Address</span>
              <span>
                {order.shippingAddress?.street}, {order.shippingAddress?.city},{' '}
                {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
              </span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CreditCard className="w-4 h-4 text-zakhira-gold flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-gray-800 block">Payment Method</span>
              <span>
                {order.paymentMethod} ({order.paymentStatus || 'Pending'})
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
