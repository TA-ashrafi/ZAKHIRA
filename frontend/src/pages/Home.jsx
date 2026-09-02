import { Link } from 'react-router-dom';
import { 
  Shield, 
  Truck, 
  RotateCcw, 
  Headphones, 
  ArrowRight, 
  Star,
  Play,
  Quote
} from 'lucide-react';
import { categoriesData, bestSellersData, heroData } from '../data/products';

const Home = () => {
  // Testimonials Data
  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      location: 'Mumbai, India',
      rating: 5,
      text: 'Absolutely stunning! The quality of the jewellery is exceptional. I received so many compliments on my necklace.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'
    },
    {
      id: 2,
      name: 'Ananya Patel',
      location: 'Delhi, India',
      rating: 5,
      text: 'ZAKHIRA has become my go-to for fine jewellery. Their attention to detail and customer service is unmatched.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100'
    },
    {
      id: 3,
      name: 'Riya Gupta',
      location: 'Jaipur, India',
      rating: 5,
      text: 'The gold purity is exactly as promised. I love the timeless designs and the packaging is so premium!',
      image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100'
    }
  ];

  // Video Reviews
  const videoReviews = [
    { id: 1, title: 'Unboxing ZAKHIRA Necklace', duration: '2:30', thumbnail: 'https://placehold.co/400x300/C9A86C/white?text=VIDEO+1' },
    { id: 2, title: 'Review - Diamond Earrings', duration: '3:15', thumbnail: 'https://placehold.co/400x300/C9A86C/white?text=VIDEO+2' },
    { id: 3, title: 'Gold Bangles Collection', duration: '1:45', thumbnail: 'https://placehold.co/400x300/C9A86C/white?text=VIDEO+3' },
  ];

  return (
    <div className="bg-white">
      {/* ===== TOP BAR - Mobile ===== */}
      <div className="bg-zakhira-dark text-white/80 text-[10px] py-1.5 md:hidden text-center">
        <span className="tracking-wider">FREE SHIPPING ON ORDERS ₹999+ | CODE: ZAKHIRA10</span>
      </div>

      {/* ===== HERO SECTION - Full Screen ===== */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-zakhira-dark via-zakhira-dark/95 to-zakhira-dark/90">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${heroData.bgImage})` }}
          ></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block text-zakhira-gold tracking-[0.3em] text-sm font-light mb-4">
              ✨ NEW COLLECTION
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-playfair text-white leading-[1.1] mb-6">
              {heroData.title}
              <br />
              <span className="text-zakhira-gold">{heroData.subtitle}</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl font-light max-w-lg mb-8">
              {heroData.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop">
                <button className="bg-zakhira-gold text-white px-10 py-4 rounded-sm hover:bg-opacity-90 transition text-sm tracking-wider uppercase">
                  Shop New In
                </button>
              </Link>
              <Link to="/collections">
                <button className="border border-white/40 text-white px-10 py-4 rounded-sm hover:bg-white/10 transition text-sm tracking-wider uppercase">
                  Explore Collection
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES BAR ===== */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <Truck className="w-8 h-8 mx-auto text-zakhira-gold mb-3" />
              <h4 className="font-semibold text-sm">Free Shipping</h4>
              <p className="text-xs text-gray-500">On orders over ₹999</p>
            </div>
            <div className="text-center">
              <RotateCcw className="w-8 h-8 mx-auto text-zakhira-gold mb-3" />
              <h4 className="font-semibold text-sm">Easy Returns</h4>
              <p className="text-xs text-gray-500">30-day hassle free</p>
            </div>
            <div className="text-center">
              <Shield className="w-8 h-8 mx-auto text-zakhira-gold mb-3" />
              <h4 className="font-semibold text-sm">Secure Payment</h4>
              <p className="text-xs text-gray-500">100% secure checkout</p>
            </div>
            <div className="text-center">
              <Headphones className="w-8 h-8 mx-auto text-zakhira-gold mb-3" />
              <h4 className="font-semibold text-sm">Customer Support</h4>
              <p className="text-xs text-gray-500">We're here to help</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SHOP BY CATEGORY ===== */}
      <section className="py-16 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair mb-2">Shop by Category</h2>
            <p className="text-gray-500">Find the perfect piece for every occasion</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categoriesData.map((cat) => (
              <Link to={cat.link} key={cat.id} className="group">
                <div className="relative overflow-hidden rounded-lg aspect-square">
                  <div className="absolute inset-0 bg-gray-200 group-hover:scale-105 transition duration-700">
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-xl font-playfair tracking-wider">{cat.name}</h3>
                      <span className="text-sm opacity-80 group-hover:opacity-100 transition flex items-center justify-center gap-1">
                        Shop Now <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BEST SELLERS + FEATURED COLLECTION ===== */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-playfair">Best Sellers</h2>
              <p className="text-gray-500">Our most loved pieces</p>
            </div>
            <Link to="/shop" className="text-zakhira-gold hover:underline flex items-center gap-1 text-sm">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {bestSellersData.map((product) => (
              <Link to={`/product/${product._id}`} key={product._id} className="group">
                <div className="relative overflow-hidden rounded-lg bg-gray-100">
                  <img src={product.images[0]} alt={product.name} className="w-full aspect-square object-cover group-hover:scale-105 transition duration-500" />
                  <button className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/90 text-xs px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition hover:bg-zakhira-gold hover:text-white">
                    Quick View
                  </button>
                </div>
                <div className="mt-3">
                  <div className="flex items-center gap-1 text-xs text-zakhira-gold mb-1">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{product.ratings.average}</span>
                    <span className="text-gray-400 text-[10px]">({product.ratings.count})</span>
                  </div>
                  <h3 className="font-medium text-sm truncate">{product.name}</h3>
                  <p className="text-zakhira-gold font-bold">₹{product.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED COLLECTION ===== */}
      <section className="py-16 bg-zakhira-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-zakhira-gold tracking-[0.3em] text-sm font-light mb-2">
              ✨ CURATED FOR YOU
            </span>
            <h2 className="text-3xl md:text-4xl font-playfair mb-2">Featured Collection</h2>
            <p className="text-gray-500">Handpicked pieces that define elegance</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative group overflow-hidden rounded-lg h-80 md:h-96">
              <div className="absolute inset-0 bg-gray-200">
                <img src="https://placehold.co/600x800/C9A86C/white?text=COLLECTION+1" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              </div>
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition flex flex-col items-center justify-center text-white">
                <h3 className="text-2xl font-playfair">Wedding Collection</h3>
                <p className="text-sm opacity-80">For your special day</p>
                <Link to="/shop?collection=wedding" className="mt-4 border border-white/60 px-6 py-2 text-sm hover:bg-white hover:text-black transition">
                  Explore
                </Link>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-lg h-80 md:h-96">
              <div className="absolute inset-0 bg-gray-200">
                <img src="https://placehold.co/600x800/C9A86C/white?text=COLLECTION+2" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              </div>
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition flex flex-col items-center justify-center text-white">
                <h3 className="text-2xl font-playfair">Everyday Elegance</h3>
                <p className="text-sm opacity-80">Minimalist & timeless</p>
                <Link to="/shop?collection=everyday" className="mt-4 border border-white/60 px-6 py-2 text-sm hover:bg-white hover:text-black transition">
                  Explore
                </Link>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-lg h-80 md:h-96">
              <div className="absolute inset-0 bg-gray-200">
                <img src="https://placehold.co/600x800/C9A86C/white?text=COLLECTION+3" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              </div>
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition flex flex-col items-center justify-center text-white">
                <h3 className="text-2xl font-playfair">Festive Collection</h3>
                <p className="text-sm opacity-80">Celebrate in style</p>
                <Link to="/shop?collection=festive" className="mt-4 border border-white/60 px-6 py-2 text-sm hover:bg-white hover:text-black transition">
                  Explore
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ZAKHIRA CLUB ===== */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-zakhira-dark to-zakhira-dark/95">
          <div className="absolute inset-0 bg-[url('https://placehold.co/1920x600/C9A86C/white?text=ZAKHIRA+CLUB')] bg-cover bg-center opacity-10"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <span className="inline-block text-zakhira-gold tracking-[0.2em] text-sm font-light mb-4">
              ✨ LIMITED TIME ONLY
            </span>
            <h2 className="text-4xl md:text-6xl font-playfair mb-4">
              ZAKHIRA Club
            </h2>
            <p className="text-2xl md:text-3xl font-light mb-2">Shine Brighter.</p>
            <p className="text-lg text-white/70 mb-6">Enjoy up to 20% off on selected pieces. Join now and unlock exclusive perks.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/shop">
                <button className="bg-zakhira-gold text-white px-10 py-4 rounded-sm hover:bg-opacity-90 transition text-sm tracking-wider uppercase">
                  Shop the Sale
                </button>
              </Link>
              <Link to="/register">
                <button className="border border-white/40 text-white px-10 py-4 rounded-sm hover:bg-white/10 transition text-sm tracking-wider uppercase">
                  Join Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS SECTION ===== */}
      <section className="py-16 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-zakhira-gold tracking-[0.3em] text-sm font-light mb-2">
              ✨ TESTIMONIALS
            </span>
            <h2 className="text-3xl md:text-4xl font-playfair mb-2">What Our Customers Say</h2>
            <p className="text-gray-500">Real stories from real customers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition">
                <Quote className="w-8 h-8 text-zakhira-gold mb-4 opacity-50" />
                <div className="flex items-center gap-1 text-zakhira-gold mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <img src={testimonial.image} alt={testimonial.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                    <p className="text-xs text-gray-400">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VIDEO REVIEWS SECTION ===== */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-zakhira-gold tracking-[0.3em] text-sm font-light mb-2">
              🎬 VIDEO REVIEWS
            </span>
            <h2 className="text-3xl md:text-4xl font-playfair mb-2">See Our Jewellery in Action</h2>
            <p className="text-gray-500">Watch real customers review their favourite pieces</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videoReviews.map((video) => (
              <div key={video.id} className="group relative overflow-hidden rounded-lg aspect-[4/3] bg-gray-200 cursor-pointer">
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition flex flex-col items-center justify-center">
                  <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition">
                    <Play className="w-8 h-8 text-zakhira-gold fill-zakhira-gold" />
                  </div>
                  <h4 className="text-white font-medium text-sm mt-3">{video.title}</h4>
                  <span className="text-white/70 text-xs">{video.duration}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/reviews" className="text-zakhira-gold hover:underline text-sm flex items-center justify-center gap-1">
              Watch More Reviews <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className="py-16 border-t border-b bg-zakhira-light">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-playfair mb-2">Stay in the Know</h3>
            <p className="text-gray-500 text-sm mb-6">Be the first to discover new collections and exclusive offers.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-zakhira-gold"
              />
              <button className="bg-zakhira-dark text-white px-8 py-3 rounded-sm hover:bg-opacity-90 transition text-sm tracking-wider uppercase whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;