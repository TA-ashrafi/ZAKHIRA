import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingBag, Eye } from 'lucide-react';
import useCart from '../../hooks/useCart';
import useWishlist from '../../hooks/useWishlist';

const ProductCard = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const isWishlisted = isInWishlist(product._id);

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const imageUrl = (product.images && product.images.length > 0)
    ? product.images[0]
    : 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800';

  const discount = product.comparePrice && product.comparePrice > product.price
    ? Math.round((1 - product.price / product.comparePrice) * 100)
    : 0;

  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition duration-300 flex flex-col h-full border border-gray-100">
      <div className="relative overflow-hidden aspect-square bg-gray-100">
        <Link to={`/product/${product._id}`}>
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        </Link>

        {/* Discount Badge */}
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-zakhira-gold text-white text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded-full uppercase shadow-sm">
            {discount}% OFF
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={toggleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition ${
            isWishlisted
              ? 'bg-red-50 text-red-500'
              : 'bg-white/90 text-gray-600 hover:text-red-500 hover:bg-white'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Actions overlay */}
        <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3">
          {onQuickView && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onQuickView(product);
              }}
              className="bg-white/95 text-zakhira-dark text-xs font-medium px-3 py-2 rounded shadow hover:bg-zakhira-gold hover:text-white transition flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              Quick View
            </button>
          )}
          <button
            onClick={handleAddToCart}
            className="bg-zakhira-dark text-white text-xs font-medium px-3 py-2 rounded shadow hover:bg-zakhira-gold transition flex items-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Add to Cart
          </button>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span className="uppercase tracking-wider text-[11px] font-medium text-gray-400">
              {product.category || 'Jewellery'}
            </span>
            <div className="flex items-center gap-1 text-zakhira-gold">
              <Star className="w-3 h-3 fill-current" />
              <span className="font-semibold">{product.ratings?.average || 4.8}</span>
              <span className="text-gray-400 text-[10px]">({product.ratings?.count || 12})</span>
            </div>
          </div>

          <Link to={`/product/${product._id}`}>
            <h3 className="font-playfair font-semibold text-base text-zakhira-dark hover:text-zakhira-gold transition line-clamp-1">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-gray-50 pt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-zakhira-gold font-bold text-base">
              ₹{product.price?.toLocaleString()}
            </span>
            {product.comparePrice && product.comparePrice > product.price && (
              <span className="text-gray-400 text-xs line-through">
                ₹{product.comparePrice.toLocaleString()}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="md:hidden text-xs text-zakhira-gold border border-zakhira-gold px-2.5 py-1 rounded hover:bg-zakhira-gold hover:text-white transition"
          >
            + Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
