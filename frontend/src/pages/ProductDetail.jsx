import { useParams, Link } from 'react-router-dom';
import { Star, Heart, Share2, ChevronLeft } from 'lucide-react';
import { productsData } from '../data/products';

const ProductDetail = () => {
  const { id } = useParams();
  const product = productsData.find(p => p._id === id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-playfair mb-4">Product Not Found</h2>
        <Link to="/shop" className="text-zakhira-gold hover:underline">Back to Shop</Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-zakhira-gold">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-zakhira-gold">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-zakhira-gold">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-4 mt-4">
              {product.images.map((img, idx) => (
                <div key={idx} className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-zakhira-gold">
                  <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-playfair mb-2">{product.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1 text-zakhira-gold">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-medium">{product.ratings.average}</span>
                  </div>
                  <span className="text-gray-400 text-sm">({product.ratings.count} reviews)</span>
                </div>
              </div>
              <button className="p-2 border rounded-full hover:bg-gray-100 transition">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-zakhira-gold">₹{product.price.toLocaleString()}</span>
              {product.comparePrice && (
                <span className="text-gray-400 line-through text-lg">₹{product.comparePrice.toLocaleString()}</span>
              )}
              {product.comparePrice && (
                <span className="bg-zakhira-gold/10 text-zakhira-gold text-sm px-3 py-1 rounded-full">
                  {Math.round((1 - product.price / product.comparePrice) * 100)}% OFF
                </span>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

            {/* Details */}
            <div className="grid grid-cols-2 gap-4 border-t border-b py-6 mb-6">
              <div>
                <p className="text-xs text-gray-400 uppercase">Category</p>
                <p className="font-medium">{product.category}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase">Gold Purity</p>
                <p className="font-medium">{product.goldPurity}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase">Weight</p>
                <p className="font-medium">{product.weight}g</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase">Availability</p>
                <p className="font-medium text-green-600">
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </p>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4">
              <div className="flex items-center border rounded-sm">
                <button className="px-4 py-2 hover:bg-gray-100 transition">-</button>
                <span className="px-4 py-2 border-x">1</span>
                <button className="px-4 py-2 hover:bg-gray-100 transition">+</button>
              </div>
              <button className="flex-1 bg-zakhira-gold text-white py-3 rounded-sm hover:bg-opacity-90 transition text-sm tracking-wider uppercase">
                Add to Cart
              </button>
            </div>

            <button className="w-full mt-3 border border-zakhira-gold text-zakhira-gold py-3 rounded-sm hover:bg-zakhira-gold hover:text-white transition text-sm tracking-wider uppercase flex items-center justify-center gap-2">
              <Heart className="w-4 h-4" /> Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;