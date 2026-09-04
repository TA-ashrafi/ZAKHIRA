import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, ShoppingBag, ShieldCheck, Truck, RotateCcw, Award, MessageSquare } from 'lucide-react';
import { productsData } from '../data/products';
import productService from '../services/product.service';
import ProductCard from '../components/user/ProductCard';
import useCart from '../hooks/useCart';
import useWishlist from '../hooks/useWishlist';
import Loader from '../components/common/Loader';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Review Form state
  const [rating, setRating] = useState(5);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewsList, setReviewsList] = useState([]);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchProductAndRelated = async () => {
      setLoading(true);
      try {
        const res = await productService.getProductById(id);
        let currentProduct = null;
        if (res.success && res.data) {
          currentProduct = res.data;
        } else {
          currentProduct = productsData.find((p) => p._id === id) || null;
        }

        setProduct(currentProduct);

        if (currentProduct) {
          // Fetch related products
          const allRes = await productService.getProducts();
          const allProds = (allRes.success && Array.isArray(allRes.data)) ? allRes.data : productsData;
          const filteredRelated = allProds.filter(
            p => p.category === currentProduct.category && p._id !== currentProduct._id
          ).slice(0, 4);
          setRelatedProducts(filteredRelated);
        }
      } catch (err) {
        const fallback = productsData.find((p) => p._id === id) || null;
        setProduct(fallback);
      } finally {
        setLoading(false);
      }
    };
    fetchProductAndRelated();
  }, [id]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;

    const newRev = {
      id: Date.now(),
      name: reviewerName || 'Valued Patron',
      rating,
      comment: reviewComment,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    setReviewsList([newRev, ...reviewsList]);
    setReviewComment('');
    setReviewerName('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

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
              <div className="flex items-center border border-zakhira-gold rounded-lg overflow-hidden justify-between w-36 bg-[#141414] text-white shadow-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 bg-[#1A1A1A] hover:bg-[#C9A86C] hover:text-black transition font-bold text-lg text-[#C9A86C] select-none"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-4 py-3 font-bold text-base text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 bg-[#1A1A1A] hover:bg-[#C9A86C] hover:text-black transition font-bold text-lg text-[#C9A86C] select-none"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => addToCart(product, quantity)}
                className="flex-1 bg-zakhira-gold text-black font-bold text-xs tracking-widest uppercase hover:bg-[#b8975b] transition flex items-center justify-center gap-2 shadow-md rounded-lg py-3.5"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Cart
              </button>

              <button
                onClick={() => isWishlisted ? removeFromWishlist(product._id) : addToWishlist(product)}
                className={`p-3.5 border rounded-lg transition flex items-center justify-center ${
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

        {/* RELATED PRODUCTS SECTION */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 border-t border-gray-200 pt-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-[#C9A86C]">CURATED MATCHES</span>
                <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gray-900 mt-1">Related Creations</h2>
              </div>
              <Link to={`/shop?category=${product.category}`} className="text-[#C9A86C] text-xs font-bold uppercase tracking-wider hover:underline mt-2 md:mt-0">
                View All {product.category}s
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel._id} product={rel} />
              ))}
            </div>
          </div>
        )}

        {/* REVIEWS & SUBMIT REVIEW SECTION */}
        <div className="mt-20 border-t border-gray-200 pt-12 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs text-[#C9A86C] uppercase tracking-[0.2em] font-semibold block mb-1">PATRON REVIEWS</span>
            <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gray-900">Submit Your Review</h2>
            <p className="text-gray-500 text-xs mt-1">Share your experience with this fine piece of jewellery</p>
          </div>

          <form onSubmit={handleReviewSubmit} className="bg-gray-50 border border-gray-200 p-6 md:p-8 rounded-xl shadow-sm mb-12">
            {reviewSubmitted && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg font-medium">
                Thank you! Your review has been submitted successfully.
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 tracking-wider mb-2">
                  Select Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 focus:outline-none transition transform hover:scale-110"
                    >
                      <Star className={`w-6 h-6 ${star <= rating ? 'text-[#C9A86C] fill-current' : 'text-gray-300'}`} />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-[#C9A86C] ml-2">{rating} Stars</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 tracking-wider mb-2">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Anjali Verma"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-xs text-gray-800 focus:outline-none focus:border-[#C9A86C]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 tracking-wider mb-2">
                  Your Review
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Write your review about product quality, craftsmanship and service..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-xs text-gray-800 focus:outline-none focus:border-[#C9A86C]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#C9A86C] text-black font-bold text-xs uppercase tracking-widest py-3.5 rounded-lg hover:bg-[#b8975b] transition shadow-md"
              >
                Submit Review
              </button>
            </div>
          </form>

          {/* DISPLAY USER REVIEWS */}
          {reviewsList.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-playfair text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#C9A86C]" /> Customer Comments ({reviewsList.length})
              </h3>
              {reviewsList.map((rev) => (
                <div key={rev.id} className="p-5 border border-gray-200 rounded-lg bg-white shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-sm text-gray-900">{rev.name}</span>
                    <span className="text-xs text-gray-400">{rev.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#C9A86C] mb-2">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
