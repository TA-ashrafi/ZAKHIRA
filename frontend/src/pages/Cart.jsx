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
      <div className="bg-gray-50/50 min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="bg-white p-10 rounded-xl border border-gray-100 shadow-sm text-center max-w-md w-full">
          <div className="w-16 h-16 bg-zakhira-gold/10 text-zakhira-gold rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-playfair font-bold text-zakhira-dark mb-2">
            Your Cart is Empty
          </h2>
          <p className="text-gray-500 text-xs mb-6">
            Looks like you haven't added any fine jewellery to your cart yet.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-zakhira-gold text-white px-8 py-3.5 rounded font-semibold text-xs tracking-widest uppercase hover:bg-opacity-90 transition shadow-md"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50/30 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-zakhira-dark">
              Shopping Cart
            </h1>
            <p className="text-gray-500 text-xs mt-1">
              You have <strong className="text-zakhira-dark">{cartItems.length}</strong> items in your cart
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-red-600 hover:underline flex items-center gap-1 font-medium"
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
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-24">
              <h3 className="font-playfair font-bold text-lg text-zakhira-dark mb-4 border-b border-gray-100 pb-3">
                Order Summary
              </h3>

              <div className="space-y-3 text-xs text-gray-600 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Express Delivery</span>
                  <span className="font-semibold text-emerald-600">
                    {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>GST & Insured Packaging</span>
                  <span className="font-semibold text-emerald-600">Included</span>
                </div>

                <div className="border-t border-gray-100 pt-3 flex justify-between text-sm font-bold text-zakhira-dark">
                  <span>Grand Total</span>
                  <span className="text-zakhira-gold text-lg">₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-zakhira-gold text-white py-3.5 rounded font-semibold text-xs tracking-widest uppercase hover:bg-opacity-90 transition flex items-center justify-center gap-2 shadow-md"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-center gap-2 text-[11px] text-gray-400">
                <ShieldCheck className="w-4 h-4 text-zakhira-gold" />
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
