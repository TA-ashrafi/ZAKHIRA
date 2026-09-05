import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import useWishlist from '../hooks/useWishlist';
import useCart from '../hooks/useCart';
import ProductCard from '../components/user/ProductCard';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <div className="bg-[#0D0D0D] text-white min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="bg-[#141414] p-10 rounded-xl border border-[#C9A86C]/30 shadow-2xl text-center max-w-md w-full">
          <div className="w-16 h-16 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
            <Heart className="w-8 h-8 fill-current" />
          </div>
          <h2 className="text-2xl font-playfair font-bold text-white mb-2">
            Your Wishlist is Empty
          </h2>
          <p className="text-gray-400 text-xs mb-6">
            Save your favourite fine jewellery pieces here to keep track of them later.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-[#C9A86C] text-black px-8 py-3.5 rounded font-bold text-xs tracking-widest uppercase hover:bg-[#b8975b] transition shadow-md"
          >
            Explore Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0D0D0D] text-white min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8 border-b border-white/10 pb-4">
          <h1 className="text-3xl font-playfair font-bold text-white">
            My Wishlist ({wishlistItems.length})
          </h1>
          <p className="text-gray-400 text-xs mt-1">
            Your saved fine jewellery pieces
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map((item) => {
            const product = typeof item === 'object' ? item : { _id: item };
            return (
              <ProductCard key={product._id} product={product} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
