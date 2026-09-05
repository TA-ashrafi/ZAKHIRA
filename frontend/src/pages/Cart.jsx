import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Trash2, ShieldCheck } from 'lucide-react';
import useCart from '../hooks/useCart';
import CartItem from '../components/user/CartItem';

const Cart = () => {
  const { cartItems, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const shippingFee = subtotal > 999 || subtotal === 0 ? 0 : 150;
  const grandTotal = subtotal + shippingFee;

  if (cartItems.length === 0) {
    return (
      <div className="bg-[#0D0D0D] text-white min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="bg-[#141414] p-10 rounded-xl border border-[#C9A86C]/30 shadow-2xl text-center max-w-md w-full">
          <div className="w-16 h-16 bg-[#C9A86C]/10 text-[#C9A86C] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#C9A86C]/20">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-playfair font-bold text-white mb-2">
            Your Cart is Empty
          </h2>
          <p className="text-gray-400 text-xs mb-6">
            Looks like you haven't added any fine jewellery to your cart yet.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-[#C9A86C] text-black px-8 py-3.5 rounded font-bold text-xs tracking-widest uppercase hover:bg-[#b8975b] transition shadow-md"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0D0D0D] text-white min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-white">
              Shopping Cart
            </h1>
            <p className="text-gray-400 text-xs mt-1">
              You have <strong className="text-[#C9A86C]">{cartItems.length}</strong> items in your cart
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-rose-400 hover:underline flex items-center gap-1 font-medium cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, idx) => (
              <CartItem key={idx} item={item} />
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-[#141414] p-6 rounded-xl border border-[#C9A86C]/30 shadow-2xl sticky top-24">
              <h3 className="font-playfair font-bold text-lg text-white mb-4 border-b border-white/10 pb-3">
                Order Summary
              </h3>

              <div className="space-y-3 text-xs text-gray-300 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Express Delivery</span>
                  <span className="font-semibold text-emerald-400">
                    {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>GST & Insured Packaging</span>
                  <span className="font-semibold text-emerald-400">Included</span>
                </div>

                <div className="border-t border-white/10 pt-3 flex justify-between text-sm font-bold text-white">
                  <span>Grand Total</span>
                  <span className="text-[#C9A86C] text-lg">₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-[#C9A86C] text-black py-3.5 rounded font-bold text-xs tracking-widest uppercase hover:bg-[#b8975b] transition flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-[11px] text-gray-400">
                <ShieldCheck className="w-4 h-4 text-[#C9A86C]" />
                <span>100% Encrypted & Safe Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
