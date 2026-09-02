import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, ShoppingBag, ShieldCheck, Truck, RotateCcw, Award } from 'lucide-react';
import { productsData } from '../data/products';
import productService from '../services/product.service';
import useCart from '../hooks/useCart';
import useWishlist from '../hooks/useWishlist';
import Loader from '../components/common/Loader';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await productService.getProductById(id);
        if (res.success && res.data) {
          setProduct(res.data);
        } else {
          setProduct(productsData.find((p) => p._id === id) || null);
        }
      } catch (err) {
        setProduct(productsData.find((p) => p._id === id) || null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <Loader fullScreen />;
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center max-w-md">
        <h2 className="text-2xl font-playfair font-bold text-gray-800 mb-2">Jewellery Not Found</h2>
        <p className="text-gray-500 text-sm mb-6">The product you are looking for is unavailable or has been removed.</p>
        <Link to="/shop" className="bg-zakhira-gold text-white px-6 py-2.5 rounded text-xs font-semibold uppercase tracking-wider">
          Back to Collection
        </Link>
      </div>
    );
  }

  const images = (product.images && product.images.length > 0)
    ? product.images
    : ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800'];

  const isWishlisted = isInWishlist(product._id);

  const discount = product.comparePrice && product.comparePrice > product.price
    ? Math.round((1 - product.price / product.comparePrice) * 100)
    : 0;

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-xs text-gray-500 mb-8 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-zakhira-gold transition">Home</Link>
          <span className="mx-2 text-gray-300">/</span>
          <Link to="/shop" className="hover:text-zakhira-gold transition">Shop</Link>
          <span className="mx-2 text-gray-300">/</span>
          <Link to={`/shop?category=${product.category}`} className="hover:text-zakhira-gold transition">{product.category}</Link>
          <span className="mx-2 text-gray-300">/</span>
          <span className="text-zakhira-gold font-medium truncate">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Image Gallery */}
          <div>
            <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden border border-gray-100 shadow-sm relative">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition duration-300"
              />
              {discount > 0 && (
                <span className="absolute top-4 left-4 bg-zakhira-gold text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                  {discount}% OFF
                </span>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 bg-gray-50 rounded-lg overflow-hidden border-2 transition flex-shrink-0 ${
                      selectedImage === idx ? 'border-zakhira-gold shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Details */}
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-zakhira-gold block mb-2">
              {product.category || 'Fine Jewellery'}
            </span>
            <h1 className="text-3xl md:text-4xl font-playfair font-bold text-zakhira-dark mb-3">
              {product.name}
            </h1>

            {/* Ratings & Reviews */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1 text-zakhira-gold bg-zakhira-gold/10 px-2.5 py-1 rounded text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{product.ratings?.average || 4.9}</span>
              </div>
              <span className="text-xs text-gray-500">
                ({product.ratings?.count || 48} Customer Reviews)
              </span>
              <span className="text-gray-300">|</span>
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                <Award className="w-3.5 h-3.5" /> BIS Hallmarked 22K
              </span>
            </div>

            {/* Price Box */}
            <div className="bg-zakhira-light/50 p-4 rounded-lg border border-zakhira-gold/20 mb-6 flex items-baseline gap-4">
              <span className="text-3xl font-bold text-zakhira-gold">
                ₹{product.price?.toLocaleString()}
              </span>
              {product.comparePrice && product.comparePrice > product.price && (
                <span className="text-gray-400 line-through text-lg">
                  ₹{product.comparePrice.toLocaleString()}
                </span>
              )}
              {discount > 0 && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded">
                  Save ₹{(product.comparePrice - product.price).toLocaleString()}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Specifications Table */}
            <div className="border border-gray-100 rounded-lg p-4 bg-gray-50/50 mb-8 grid grid-cols-2 gap-y-3 text-xs">
              <div>
                <span className="text-gray-400 uppercase font-medium block">Category</span>
                <span className="font-semibold text-gray-800">{product.category}</span>
              </div>
              <div>
                <span className="text-gray-400 uppercase font-medium block">Gold Purity</span>
                <span className="font-semibold text-gray-800">{product.goldPurity || '22K Gold'}</span>
              </div>
              <div>
                <span className="text-gray-400 uppercase font-medium block">Stone Type</span>
                <span className="font-semibold text-gray-800">{product.stoneType || 'None'}</span>
              </div>
              <div>
                <span className="text-gray-400 uppercase font-medium block">Approx Weight</span>
                <span className="font-semibold text-gray-800">{product.weight ? `${product.weight} grams` : 'N/A'}</span>
              </div>
            </div>

            {/* Quantity Selector & Add to Cart */}
            <div className="flex flex-col sm:flex-row items-stretch gap-4 mb-6">
              <div className="flex items-center border border-gray-300 rounded overflow-hidden justify-between w-32 bg-gray-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-3 hover:bg-gray-200 transition font-bold"
                >
                  -
                </button>
                <span className="px-4 py-3 font-semibold text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-3 hover:bg-gray-200 transition font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => addToCart(product, quantity)}
                className="flex-1 bg-zakhira-gold text-white px-8 py-3.5 rounded font-semibold text-xs tracking-widest uppercase hover:bg-opacity-90 transition flex items-center justify-center gap-2 shadow-md"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Cart
              </button>

              <button
                onClick={() => isWishlisted ? removeFromWishlist(product._id) : addToWishlist(product)}
                className={`p-3.5 border rounded transition flex items-center justify-center ${
                  isWishlisted
                    ? 'border-red-500 text-red-500 bg-red-50'
                    : 'border-gray-300 text-gray-600 hover:border-zakhira-gold hover:text-zakhira-gold'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Feature Highlights */}
            <div className="border-t border-gray-100 pt-6 space-y-3 text-xs text-gray-600">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-zakhira-gold" />
                <span>100% Certified Hallmarked Gold & Gemstones</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="w-4 h-4 text-zakhira-gold" />
                <span>Free Insured Express Delivery across India</span>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="w-4 h-4 text-zakhira-gold" />
                <span>30-Day Money Back Guarantee & Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
