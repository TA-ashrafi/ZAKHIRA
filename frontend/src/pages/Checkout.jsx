import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, CreditCard, Banknote, Building, QrCode, Tag, Check, X } from 'lucide-react';
import useCart from '../hooks/useCart';
import useAuth from '../hooks/useAuth';
import orderService from '../services/order.service';
import couponService from '../services/coupon.service';
import PaymentButton from '../components/PaymentButton';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { cartItems, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    pincode: user?.address?.pincode || '',
    country: 'India',
  });

  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponLoading, setCouponLoading] = useState(false);

  const discountAmount = appliedCoupon ? Math.round((subtotal * appliedCoupon.discountPercentage) / 100) : 0;
  const shippingFee = subtotal > 999 || subtotal === 0 ? 0 : 150;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    try {
      const res = await couponService.applyCoupon({ code: couponCode, cartTotal: subtotal });
      if (res.success && res.data) {
        setAppliedCoupon(res.data);
        toast.success(`Coupon "${res.data.code}" applied! (${res.data.discountPercentage}% OFF)`);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid or expired coupon');
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    toast.success('Coupon removed');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setLoading(true);

    try {
      const orderPayload = {
        shippingAddress: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          country: formData.country,
        },
        paymentMethod,
      };

      const res = await orderService.placeOrder(orderPayload);

      if (res.success) {
        toast.success('🎉 Order Placed Successfully!');
        clearCart();
        navigate('/profile');
      } else {
        toast.error(res.message || 'Failed to place order');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error placing order');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (paymentId) => {
    try {
      setLoading(true);
      const orderPayload = {
        shippingAddress: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          country: formData.country,
        },
        paymentMethod: 'Razorpay Online',
        paymentStatus: 'Paid',
        paymentId,
      };

      const res = await orderService.placeOrder(orderPayload);
      if (res.success) {
        toast.success('🎉 Order Placed Successfully via Razorpay!');
        clearCart();
        navigate('/profile');
      } else {
        toast.error(res.message || 'Failed to complete order placement');
      }
    } catch (err) {
      toast.error('Order recording error');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-[#0D0D0D] text-white min-h-[70vh] flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-2xl font-playfair font-bold text-white mb-2">No Items to Checkout</h2>
        <button onClick={() => navigate('/shop')} className="mt-4 bg-[#C9A86C] text-black px-6 py-2.5 rounded font-bold text-xs uppercase">
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#0D0D0D] text-white min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-playfair font-bold text-white mb-8 text-center">
          Secure Checkout
        </h1>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Form & Payment */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <div className="bg-[#141414] p-6 rounded-xl border border-[#C9A86C]/30 shadow-2xl">
              <h2 className="font-playfair font-bold text-lg text-white mb-4 border-b border-white/10 pb-3">
                1. Shipping Address
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-gray-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 bg-[#1A1A1A] border border-gray-700 text-white rounded focus:outline-none focus:border-[#C9A86C]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 bg-[#1A1A1A] border border-gray-700 text-white rounded focus:outline-none focus:border-[#C9A86C]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-300 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 bg-[#1A1A1A] border border-gray-700 text-white rounded focus:outline-none focus:border-[#C9A86C]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-300 mb-1">Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 bg-[#1A1A1A] border border-gray-700 text-white rounded focus:outline-none focus:border-[#C9A86C]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-semibold text-gray-300 mb-1">Street Address *</label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    required
                    placeholder="House/Flat No, Apartment, Street"
                    className="w-full px-3 py-2.5 bg-[#1A1A1A] border border-gray-700 text-white placeholder-gray-500 rounded focus:outline-none focus:border-[#C9A86C]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-300 mb-1">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 bg-[#1A1A1A] border border-gray-700 text-white rounded focus:outline-none focus:border-[#C9A86C]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-300 mb-1">State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 bg-[#1A1A1A] border border-gray-700 text-white rounded focus:outline-none focus:border-[#C9A86C]"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-[#141414] p-6 rounded-xl border border-[#C9A86C]/30 shadow-2xl">
              <h2 className="font-playfair font-bold text-lg text-white mb-4 border-b border-white/10 pb-3">
                2. Payment Method
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <label
                  onClick={() => setPaymentMethod('COD')}
                  className={`p-4 border rounded-xl cursor-pointer transition flex flex-col items-center justify-center text-center gap-2 ${
                    paymentMethod === 'COD'
                      ? 'border-[#C9A86C] bg-[#C9A86C]/10 text-[#C9A86C] font-bold shadow-md'
                      : 'border-gray-800 bg-[#1A1A1A] hover:border-gray-700 text-gray-300'
                  }`}
                >
                  <Banknote className="w-5 h-5 text-[#C9A86C]" />
                  <span>Cash on Delivery</span>
                </label>

                <label
                  onClick={() => setPaymentMethod('UPI')}
                  className={`p-4 border rounded-xl cursor-pointer transition flex flex-col items-center justify-center text-center gap-2 ${
                    paymentMethod === 'UPI'
                      ? 'border-[#C9A86C] bg-[#C9A86C]/10 text-[#C9A86C] font-bold shadow-md'
                      : 'border-gray-800 bg-[#1A1A1A] hover:border-gray-700 text-gray-300'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-[#C9A86C]" />
                  <span>UPI / QR</span>
                </label>

                <label
                  onClick={() => setPaymentMethod('Card')}
                  className={`p-4 border rounded-xl cursor-pointer transition flex flex-col items-center justify-center text-center gap-2 ${
                    paymentMethod === 'Card'
                      ? 'border-[#C9A86C] bg-[#C9A86C]/10 text-[#C9A86C] font-bold shadow-md'
                      : 'border-gray-800 bg-[#1A1A1A] hover:border-gray-700 text-gray-300'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-[#C9A86C]" />
                  <span>Credit / Debit Card</span>
                </label>

                <label
                  onClick={() => setPaymentMethod('NetBanking')}
                  className={`p-4 border rounded-xl cursor-pointer transition flex flex-col items-center justify-center text-center gap-2 ${
                    paymentMethod === 'NetBanking'
                      ? 'border-[#C9A86C] bg-[#C9A86C]/10 text-[#C9A86C] font-bold shadow-md'
                      : 'border-gray-800 bg-[#1A1A1A] hover:border-gray-700 text-gray-300'
                  }`}
                >
                  <Building className="w-5 h-5 text-[#C9A86C]" />
                  <span>NetBanking</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Place Order */}
          <div>
            <div className="bg-[#141414] p-6 rounded-xl border border-[#C9A86C]/30 shadow-2xl sticky top-24">
              <h3 className="font-playfair font-bold text-lg text-white mb-4 border-b border-white/10 pb-3">
                Order Items ({cartItems.length})
              </h3>

              <div className="max-h-60 overflow-y-auto space-y-3 pr-1 mb-4 text-xs">
                {cartItems.map((item, idx) => {
                  const product = item.product || {};
                  return (
                    <div key={idx} className="flex items-center gap-3 border-b border-white/5 pb-2">
                      <img
                        src={(product.images && product.images[0]) || 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800'}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded bg-[#0D0D0D] border border-white/10 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white truncate">{product.name}</p>
                        <p className="text-gray-400">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-bold text-[#C9A86C]">
                        ₹{((product.price || 0) * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Promo Coupon Section */}
              <div className="border-t border-b border-gray-100 py-3 mb-4">
                <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-zakhira-gold" /> Promo Code / Coupon
                </label>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-2 rounded text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>{appliedCoupon.code}</span>
                      <span className="text-[10px] text-emerald-600">({appliedCoupon.discountPercentage}% OFF)</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="text-red-500 hover:text-red-700 text-xs p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2 text-xs">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(String(e.target.value || '').toUpperCase())}
                      placeholder="e.g. ZAKHIRA10"
                      className="flex-1 px-2.5 py-2 bg-[#1A1A1A] border border-gray-700 text-white placeholder-gray-500 rounded uppercase focus:outline-none focus:border-[#C9A86C] font-mono font-bold"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      disabled={couponLoading || !couponCode.trim()}
                      className="bg-zakhira-gold text-white px-3 py-1.5 rounded font-semibold hover:bg-opacity-90 disabled:opacity-50 transition"
                    >
                      {couponLoading ? 'Checking...' : 'Apply'}
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-2 text-xs text-gray-600 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">₹{subtotal.toLocaleString()}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount ({appliedCoupon.discountPercentage}%)</span>
                    <span>-₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Shipping</span>
                  <span className="font-semibold text-emerald-600">{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
                </div>
                <div className="border-t border-gray-100 pt-2 flex justify-between text-sm font-bold text-zakhira-dark">
                  <span>Total Payable</span>
                  <span className="text-zakhira-gold text-lg">₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-3">
                <PaymentButton
                  amount={grandTotal}
                  userDetails={{
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                  }}
                  onSuccess={handlePaymentSuccess}
                  disabled={loading || !formData.street || !formData.city || !formData.pincode}
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#1A1A1A] border border-[#C9A86C]/40 text-[#C9A86C] py-3 rounded-xl font-bold text-xs tracking-widest uppercase hover:bg-white/5 transition cursor-pointer"
                >
                  {loading ? 'Processing Order...' : 'Place Order via Cash on Delivery'}
                </button>
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-gray-400">
                <ShieldCheck className="w-4 h-4 text-zakhira-gold" />
                <span>100% Guaranteed Delivery & Authentic Jewellery</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
