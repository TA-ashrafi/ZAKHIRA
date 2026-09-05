import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import useCart from '../../hooks/useCart';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const product = item.product || {};

  const productId = product._id || item.product;
  const imageUrl = (product.images && product.images.length > 0)
    ? product.images[0]
    : 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800';

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-[#141414] rounded-xl border border-[#C9A86C]/30 shadow-xl gap-4 text-white">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <img
          src={imageUrl}
          alt={product.name || 'Product'}
          className="w-20 h-20 object-cover rounded-lg bg-[#0D0D0D] border border-white/10 flex-shrink-0"
        />
        <div>
          <Link
            to={`/product/${productId}`}
            className="font-playfair font-semibold text-white hover:text-[#C9A86C] transition line-clamp-1"
          >
            {product.name || 'Jewellery Item'}
          </Link>
          <p className="text-xs text-gray-400 mt-1">
            Category: <span className="font-medium text-gray-200">{product.category || 'Jewellery'}</span>
          </p>
          {product.goldPurity && (
            <p className="text-xs text-gray-400">
              Purity: <span className="font-medium text-gray-200">{product.goldPurity}</span>
            </p>
          )}
          <p className="text-[#C9A86C] font-bold text-sm mt-1">
            ₹{(product.price || 0).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between w-full sm:w-auto gap-6 border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0">
        {/* Quantity Controls */}
        <div className="flex items-center border border-[#C9A86C]/50 rounded-lg overflow-hidden bg-[#1A1A1A]">
          <button
            onClick={() => updateQuantity(productId, item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="p-2 text-[#C9A86C] hover:bg-[#C9A86C] hover:text-black disabled:opacity-40 transition font-bold"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="px-3 py-1 text-xs font-bold text-white">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(productId, item.quantity + 1)}
            className="p-2 text-[#C9A86C] hover:bg-[#C9A86C] hover:text-black transition font-bold"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Total Price */}
        <div className="text-right">
          <p className="text-[10px] text-gray-400 uppercase font-medium">Total</p>
          <p className="text-sm font-bold text-[#C9A86C]">
            ₹{((product.price || 0) * item.quantity).toLocaleString()}
          </p>
        </div>

        {/* Remove Button */}
        <button
          onClick={() => removeFromCart(productId)}
          className="text-rose-400 hover:text-rose-300 p-2 rounded-lg hover:bg-rose-500/10 transition"
          title="Remove item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
