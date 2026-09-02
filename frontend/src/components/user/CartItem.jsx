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
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded-lg border border-gray-100 shadow-sm gap-4">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <img
          src={imageUrl}
          alt={product.name || 'Product'}
          className="w-20 h-20 object-cover rounded-md bg-gray-50 flex-shrink-0"
        />
        <div>
          <Link
            to={`/product/${productId}`}
            className="font-playfair font-semibold text-gray-900 hover:text-zakhira-gold transition line-clamp-1"
          >
            {product.name || 'Jewellery Item'}
          </Link>
          <p className="text-xs text-gray-500 mt-1">
            Category: <span className="font-medium text-gray-700">{product.category || 'Jewellery'}</span>
          </p>
          {product.goldPurity && (
            <p className="text-xs text-gray-500">
              Purity: <span className="font-medium text-gray-700">{product.goldPurity}</span>
            </p>
          )}
          <p className="text-zakhira-gold font-bold text-sm mt-1">
            ₹{(product.price || 0).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between w-full sm:w-auto gap-6 border-t sm:border-t-0 pt-3 sm:pt-0">
        {/* Quantity Controls */}
        <div className="flex items-center border border-gray-200 rounded-md overflow-hidden bg-gray-50">
          <button
            onClick={() => updateQuantity(productId, item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="p-1.5 text-gray-600 hover:bg-gray-200 disabled:opacity-40 transition"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="px-3 py-1 text-xs font-semibold text-gray-800">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(productId, item.quantity + 1)}
            className="p-1.5 text-gray-600 hover:bg-gray-200 transition"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Total Price */}
        <div className="text-right">
          <p className="text-xs text-gray-400">Total</p>
          <p className="text-sm font-bold text-zakhira-dark">
            ₹{((product.price || 0) * item.quantity).toLocaleString()}
          </p>
        </div>

        {/* Remove Button */}
        <button
          onClick={() => removeFromCart(productId)}
          className="text-gray-400 hover:text-red-500 p-1.5 rounded-full hover:bg-red-50 transition"
          title="Remove item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
