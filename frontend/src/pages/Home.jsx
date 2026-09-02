import { useState, useEffect } from 'react';
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
import { categoriesData, productsData, heroData } from '../data/products';
import productService from '../services/product.service';
import ProductCard from '../components/user/ProductCard';

const Home = () => {
  const [products, setProducts] = useState(productsData);

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        const res = await productService.getProducts({ sort: 'featured' });
        if (res.success && res.data && res.data.length > 0) {
          setProducts(res.data);
        }
      } catch (err) {
        // Fallback to local productsData if API is offline
      }
    };
    loadFeaturedProducts();
  }, []);

  const bestSellers = products.slice(0, 6);

  // Testimonials Data
  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      location: 'Mumbai, India',
      rating: 5,
      text: 'Absolutely stunning! The quality of the jewellery is exceptional. I received so many compliments on my solitaire pendant necklace.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 2,
      name: 'Ananya Patel',
      location: 'Delhi, India',
      rating: 5,
      text: 'ZAKHIRA has become my go-to for fine jewellery. Their attention to detail, hallmarked purity and customer service is unmatched.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 3,
      name: 'Riya Gupta',
      location: 'Jaipur, India',
      rating: 5,
      text: 'The gold purity is exactly as promised. I love the timeless designs and the luxury velvet packaging is top tier!',
      image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&auto=format&fit=crop&q=80'
    }
  ];

  // Video Reviews
  const videoReviews = [
    { id: 1, title: 'Unboxing ZAKHIRA Solitaire Collection', duration: '2:30', thumbnail: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800' },
    { id: 2, title: 'Review - Diamond Studs & Hoop Earrings', duration: '3:15', thumbnail: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=800' },
    { id: 3, title: '22K Gold Bangles & Bracelet Showcase', duration: '1:45', thumbnail: 'https://images.unsplash.com/photo-1611591475140-1e5b4109f6b9?auto=format&fit=crop&q=80&w=800' },
  ];

  return (
    <div className="bg-white">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[85vh] md:min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-zakhira-dark via-zakhira-dark/95 to-zakhira-dark/80">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
            style={{ backgroundImage: `url(${heroData.bgImage})` }}
          ></div>
        </div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block text-zakhira-gold tracking-[0.3em] text-xs md:text-sm font-semibold uppercase mb-4 animate-fadeIn">
              ✨ LUXURY FINE JEWELLERY
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair text-white leading-[1.1] mb-6 font-bold tracking-tight">
              {heroData.title}
              <br />
              <span className="text-zakhira-gold font-normal italic">{heroData.subtitle}</span>
            </h1>
            <p className="text-white/80 text-base md:text-lg font-light max-w-lg mb-8 leading-relaxed">
              {heroData.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop">
                <button className="bg-zakhira-gold text-white px-8 py-3.5 rounded-sm hover:bg-opacity-90 transition font-semibold text-xs tracking-widest uppercase shadow-lg hover:shadow-zakhira-gold/20">
                  Shop New In
                </button>
              </Link>
              <Link to="/shop">
                <button className="border border-white/50 text-white px-8 py-3.5 rounded-sm hover:bg-white/10 transition font-semibold text-xs tracking-widest uppercase">
                  Explore Collections
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES BAR ===== */}
      <section className="py-12 border-b border-gray-100 bg-zakhira-light/40">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-2">
              <Truck className="w-7 h-7 mx-auto text-zakhira-gold mb-2.5" />
              <h4 className="font-playfair font-semibold text-sm text-zakhira-dark">Free Shipping</h4>
              <p className="text-xs text-gray-500 mt-0.5">On all orders over ₹999</p>
            </div>
            <div className="text-center p-2">
              <RotateCcw className="w-7 h-7 mx-auto text-zakhira-gold mb-2.5" />
              <h4 className="font-playfair font-semibold text-sm text-zakhira-dark">Easy Returns</h4>
              <p className="text-xs text-gray-500 mt-0.5">30-day hassle free policy</p>
            </div>
            <div className="text-center p-2">
              <Shield className="w-7 h-7 mx-auto text-zakhira-gold mb-2.5" />
              <h4 className="font-playfair font-semibold text-sm text-zakhira-dark">Hallmarked Gold</h4>
              <p className="text-xs text-gray-500 mt-0.5">100% certified quality</p>
            </div>
            <div className="text-center p-2">
              <Headphones className="w-7 h-7 mx-auto text-zakhira-gold mb-2.5" />
              <h4 className="font-playfair font-semibold text-sm text-zakhira-dark">Customer Support</h4>
              <p className="text-xs text-gray-500 mt-0.5">Dedicated concierge team</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SHOP BY CATEGORY ===== */}
      <section className="py-20 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs text-zakhira-gold uppercase tracking-widest font-semibold block mb-2">CURATED CATEGORIES</span>
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-zakhira-dark mb-2">Shop by Category</h2>
            <p className="text-gray-500 text-sm max-w-md mx-auto">Find the perfect piece tailored for every celebration</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categoriesData.map((cat) => (
              <Link to={cat.link} key={cat.id} className="group relative overflow-hidden rounded-lg aspect-square shadow-sm hover:shadow-xl transition duration-500">
                <div className="absolute inset-0 bg-gray-200 group-hover:scale-110 transition duration-700">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                  <div className="text-white w-full">
                    <h3 className="text-xl font-playfair font-bold tracking-wider">{cat.name}</h3>
                    <span className="text-xs text-zakhira-gold mt-1 group-hover:underline flex items-center gap-1 font-medium">
                      Shop Collection <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BEST SELLERS SECTION ===== */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
            <div>
              <span className="text-xs text-zakhira-gold uppercase tracking-widest font-semibold block mb-1">MOST LOVED</span>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-zakhira-dark">Best Sellers</h2>
              <p className="text-gray-500 text-sm mt-1">Handpicked timeless icons chosen by our patrons</p>
            </div>
            <Link to="/shop" className="text-zakhira-gold hover:underline flex items-center gap-1 text-xs font-semibold uppercase tracking-wider">
              View All Collection <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED COLLECTION CARDS ===== */}
      <section className="py-20 bg-zakhira-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-zakhira-gold tracking-[0.3em] text-xs font-semibold uppercase mb-2">
              ✨ SIGNATURE SERIES
            </span>
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-zakhira-dark mb-2">Featured Collections</h2>
            <p className="text-gray-500 text-sm">Curated jewelry lines crafted for your defining moments</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative group overflow-hidden rounded-lg h-96 shadow-md">
              <div className="absolute inset-0 bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800"
                  alt="Royal Wedding"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition flex flex-col items-center justify-center text-white p-6 text-center">
                <span className="text-xs uppercase tracking-widest text-zakhira-gold font-semibold mb-2">Bridal Edit</span>
                <h3 className="text-3xl font-playfair font-bold mb-2">Royal Wedding</h3>
                <p className="text-xs text-white/80 max-w-xs mb-6">Opulent statement necklaces and heritage craftsmanship</p>
                <Link to="/shop?category=Necklace" className="border border-white/80 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-white hover:text-zakhira-dark transition">
                  Explore Edit
                </Link>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-lg h-96 shadow-md">
              <div className="absolute inset-0 bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800"
                  alt="Everyday Minimalist"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition flex flex-col items-center justify-center text-white p-6 text-center">
                <span className="text-xs uppercase tracking-widest text-zakhira-gold font-semibold mb-2">Modern Luxury</span>
                <h3 className="text-3xl font-playfair font-bold mb-2">Everyday Minimalist</h3>
                <p className="text-xs text-white/80 max-w-xs mb-6">Lightweight 18K & 22K gold rings and delicate pendants</p>
                <Link to="/shop?category=Ring" className="border border-white/80 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-white hover:text-zakhira-dark transition">
                  Explore Edit
                </Link>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-lg h-96 shadow-md">
              <div className="absolute inset-0 bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=800"
                  alt="Diamond Solitaires"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition flex flex-col items-center justify-center text-white p-6 text-center">
                <span className="text-xs uppercase tracking-widest text-zakhira-gold font-semibold mb-2">Sparkle Series</span>
                <h3 className="text-3xl font-playfair font-bold mb-2">Diamond Solitaires</h3>
                <p className="text-xs text-white/80 max-w-xs mb-6">GIA & IGI certified solitaires mounted in gold</p>
                <Link to="/shop?category=Earring" className="border border-white/80 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-white hover:text-zakhira-dark transition">
                  Explore Edit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ZAKHIRA CLUB BANNER ===== */}
      <section className="relative py-24 overflow-hidden bg-zakhira-dark text-white">
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <span className="inline-block text-zakhira-gold tracking-[0.25em] text-xs font-semibold uppercase mb-4">
            ✨ EXCLUSIVE PRIVILEGES
          </span>
          <h2 className="text-4xl md:text-6xl font-playfair font-bold mb-4">
            The ZAKHIRA Club
          </h2>
          <p className="text-xl md:text-2xl font-light text-zakhira-gold italic mb-3">Shine Brighter. Enjoy More.</p>
          <p className="text-sm md:text-base text-white/70 mb-8 max-w-xl mx-auto leading-relaxed">
            Join our VIP Circle to receive private invitations to new launch trunk shows, personal jewelry styling, and 10% off your first purchase.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/shop">
              <button className="bg-zakhira-gold text-white px-8 py-3.5 rounded-sm hover:bg-opacity-90 transition font-semibold text-xs tracking-widest uppercase">
                Shop Exclusive Sale
              </button>
            </Link>
            <Link to="/register">
              <button className="border border-white/40 text-white px-8 py-3.5 rounded-sm hover:bg-white/10 transition font-semibold text-xs tracking-widest uppercase">
                Join ZAKHIRA Club
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS SECTION ===== */}
      <section className="py-20 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-zakhira-gold tracking-[0.3em] text-xs font-semibold uppercase mb-2">
              ✨ CLIENT REVIEWS
            </span>
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-zakhira-dark mb-2">What Our Patron Say</h2>
            <p className="text-gray-500 text-sm">Real stories from our valued customers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white p-8 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition">
                <Quote className="w-8 h-8 text-zakhira-gold mb-4 opacity-40" />
                <div className="flex items-center gap-1 text-zakhira-gold mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3 border-t border-gray-50 pt-4">
                  <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h4 className="font-playfair font-bold text-sm text-zakhira-dark">{t.name}</h4>
                    <p className="text-xs text-gray-400">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VIDEO REVIEWS ===== */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-zakhira-gold tracking-[0.3em] text-xs font-semibold uppercase mb-2">
              🎬 IN MOTION
            </span>
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-zakhira-dark mb-2">See Our Jewellery in Action</h2>
            <p className="text-gray-500 text-sm">Watch unboxings and styling reviews by top creators</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videoReviews.map((v) => (
              <div key={v.id} className="group relative overflow-hidden rounded-lg aspect-[4/3] bg-gray-200 cursor-pointer shadow-md">
                <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition flex flex-col items-center justify-center p-4 text-center">
                  <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition shadow-lg">
                    <Play className="w-6 h-6 text-zakhira-gold fill-zakhira-gold ml-0.5" />
                  </div>
                  <h4 className="text-white font-playfair font-semibold text-base mt-4">{v.title}</h4>
                  <span className="text-white/70 text-xs mt-1">{v.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className="py-16 border-t bg-zakhira-light">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-2xl font-playfair font-bold text-zakhira-dark mb-2">Stay Connected</h3>
            <p className="text-gray-500 text-xs mb-6">Subscribe to receive early access to signature collection releases and private sales.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to ZAKHIRA newsletter!'); }} className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                required
                placeholder="Enter your email address" 
                className="flex-1 px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-zakhira-gold text-sm"
              />
              <button type="submit" className="bg-zakhira-dark text-white px-8 py-3 rounded-sm hover:bg-opacity-90 transition text-xs font-semibold tracking-wider uppercase whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
