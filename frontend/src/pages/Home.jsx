import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Truck, 
  RotateCcw, 
  Headphones, 
  ArrowRight, 
  Star,
  Quote
} from 'lucide-react';
import { categoriesData } from '../data/products';
import productService from '../services/product.service';
import ProductCard from '../components/user/ProductCard';
import hero_img from '../assets/images/hero_img.png';
import necklace1Img from '../assets/images/products/necklace-1.jpg';
import necklace2Img from '../assets/images/products/necklace-2.jpg';
import earring1Img from '../assets/images/products/earring-1.jpg';
import earring2Img from '../assets/images/products/earring-2.jpg';
import ring1Img from '../assets/images/products/ring-1.jpg';
import pendant1Img from '../assets/images/products/pendant-1.jpg';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const res = await productService.getProducts();
        if (res.success && Array.isArray(res.data)) {
          setProducts(res.data);
        } else if (Array.isArray(res)) {
          setProducts(res);
        } else {
          setProducts([]);
        }
      } catch (err) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // Strict filtering from DB products only
  const bestSellers = products.filter(p => p.isBestSeller || p.isFeatured || p.featured);

  const necklacesList = products.filter(p => 
    p.category?.toLowerCase() === 'necklace' || 
    p.category?.toLowerCase() === 'necklaces'
  );

  const earringsList = products.filter(p => 
    p.category?.toLowerCase() === 'earring' || 
    p.category?.toLowerCase() === 'earrings'
  );

  // 3D Curved Showcase Items using local assets
  const curvedGalleryItems = [
    {
      id: 1,
      title: 'THE ROSELINE RING',
      category: 'Rings',
      image: ring1Img,
      tiltClass: 'rotate-[-10deg] translate-y-6 scale-95 opacity-85 hover:opacity-100 hover:scale-100 hover:rotate-0',
      link: '/shop?category=Ring'
    },
    {
      id: 2,
      title: 'THE ZOË EARRINGS',
      category: 'Earrings',
      image: earring1Img,
      tiltClass: 'rotate-[-5deg] translate-y-2 scale-98 hover:scale-105 hover:rotate-0',
      link: '/shop?category=Earring'
    },
    {
      id: 3,
      title: 'ROYAL SOLITAIRE PENDANT',
      category: 'Necklaces',
      isCenter: true,
      image: pendant1Img,
      tiltClass: 'rotate-0 scale-105 z-20 shadow-2xl border-2 border-[#C9A86C]',
      link: '/shop?category=Necklace'
    },
    {
      id: 4,
      title: 'THE CHUBBY HOOPS',
      category: 'Earrings',
      image: earring2Img,
      tiltClass: 'rotate-[5deg] translate-y-2 scale-98 hover:scale-105 hover:rotate-0',
      link: '/shop?category=Earring'
    },
    {
      id: 5,
      title: 'THE ROYAL CHOKER',
      category: 'Necklaces',
      image: necklace1Img,
      tiltClass: 'rotate-[10deg] translate-y-6 scale-95 opacity-85 hover:opacity-100 hover:scale-100 hover:rotate-0',
      link: '/shop?category=Necklace'
    }
  ];

  // Testimonials Data
  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      location: 'Mumbai, India',
      rating: 5,
      text: 'Absolutely stunning! The quality of the jewellery is exceptional. I received so many compliments on my solitaire pendant necklace.'
    },
    {
      id: 2,
      name: 'Ananya Patel',
      location: 'Delhi, India',
      rating: 5,
      text: 'ZAKHIRA has become my go-to for fine jewellery. Their attention to detail, hallmarked purity and customer service is unmatched.'
    },
    {
      id: 3,
      name: 'Riya Gupta',
      location: 'Jaipur, India',
      rating: 5,
      text: 'The gold purity is exactly as promised. I love the timeless designs and the luxury velvet packaging is top tier!'
    }
  ];

  return (
    <div className="bg-[#0D0D0D] text-[#F8F6F1]">
      {/* 1. ===== LUXURY FULL-SCREEN HERO SECTION ===== */}
      <section className="relative h-screen w-full bg-gradient-to-b from-[#2B080C] via-[#1A0306] to-[#0D0D0D] overflow-hidden flex flex-col justify-between items-center pt-24 pb-8">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[#C9A86C]/10 blur-[160px] rounded-full" />
        </div>

        <h1 className="font-playfair text-[15vw] md:text-[18vw] leading-none font-bold text-center text-transparent bg-clip-text bg-gradient-to-b from-[#C9A86C]/30 via-[#C9A86C]/15 to-transparent tracking-tighter select-none absolute inset-0 flex items-center justify-center pointer-events-none">
          ZAKHIRA
        </h1>

        <div className="relative z-10 text-center px-4 mt-4">
          <span className="font-playfair italic text-[#C9A86C] text-xl md:text-3xl font-light tracking-wider drop-shadow-md">
            Crafted for Royalty & Eternal Elegance
          </span>
        </div>

        <div className="relative z-10 flex items-center justify-center w-full flex-1 my-auto">
          <img
            src={hero_img}
            alt="ZAKHIRA Fine Jewellery"
            className="max-h-[58vh] md:max-h-[70vh] w-auto object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.9)] filter brightness-105 contrast-105 transition-transform duration-700 hover:scale-102"
            loading="eager"
          />
        </div>

        <div className="relative z-20 text-center space-y-3 pb-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link
              to="/shop"
              className="bg-zakhira-gold text-black font-bold text-xs uppercase tracking-[0.2em] px-8 py-3.5 rounded-full hover:bg-[#b8975b] transition shadow-lg shadow-zakhira-gold/20 flex items-center gap-2 group"
            >
              <span>Explore Royal Archives</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/shop?category=Necklace"
              className="border border-zakhira-gold/60 text-zakhira-gold font-bold text-xs uppercase tracking-[0.2em] px-8 py-3.5 rounded-full hover:bg-zakhira-gold/10 transition backdrop-blur-sm"
            >
              View Bridal Collection
            </Link>
          </div>
        </div>
      </section>

      {/* 2. ===== SHOP BY CATEGORY ===== */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs text-[#C9A86C] uppercase tracking-widest font-semibold block mb-2">ROYAL ARCHIVES</span>
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-2">Shop by Category</h2>
            <p className="text-gray-400 text-sm max-w-md mx-auto">Discover timeless creations tailored for every milestone</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categoriesData.map((cat) => (
              <Link 
                to={cat.link} 
                key={cat.id} 
                className="group relative overflow-hidden rounded-xl aspect-square border border-[#C9A86C]/20 shadow-xl hover:border-[#C9A86C] transition-all duration-300 will-change-transform"
              >
                <div className="absolute inset-0 bg-gray-900 overflow-hidden">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-500 ease-out" 
                    loading="lazy" 
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-5">
                  <div className="text-white w-full">
                    <h3 className="text-lg md:text-xl font-playfair font-bold tracking-wider">{cat.name}</h3>
                    <span className="text-xs text-[#C9A86C] mt-1 group-hover:underline flex items-center gap-1 font-medium">
                      Explore Archives <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ===== FEATURES BAR ===== */}
      <section className="py-12 border-t border-b border-white/10 bg-[#141414]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-2">
              <Truck className="w-7 h-7 mx-auto text-[#C9A86C] mb-2.5" />
              <h4 className="font-playfair font-semibold text-sm text-white">Insured Free Shipping</h4>
              <p className="text-xs text-gray-400 mt-0.5">Complimentary worldwide delivery</p>
            </div>
            <div className="text-center p-2">
              <RotateCcw className="w-7 h-7 mx-auto text-[#C9A86C] mb-2.5" />
              <h4 className="font-playfair font-semibold text-sm text-white">30-Day Privilege Return</h4>
              <p className="text-xs text-gray-400 mt-0.5">Hassle-free guarantee</p>
            </div>
            <div className="text-center p-2">
              <Shield className="w-7 h-7 mx-auto text-[#C9A86C] mb-2.5" />
              <h4 className="font-playfair font-semibold text-sm text-white">100% BIS Hallmarked</h4>
              <p className="text-xs text-gray-400 mt-0.5">Certified purity guaranteed</p>
            </div>
            <div className="text-center p-2">
              <Headphones className="w-7 h-7 mx-auto text-[#C9A86C] mb-2.5" />
              <h4 className="font-playfair font-semibold text-sm text-white">Private Concierge</h4>
              <p className="text-xs text-gray-400 mt-0.5">24/7 dedicated support</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ===== PATRON FAVORITES / BEST SELLERS SECTION ===== */}
      <section className="py-20 bg-[#141414]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
            <div>
              <span className="text-xs text-[#C9A86C] uppercase tracking-widest font-semibold block mb-1">PATRON FAVORITES</span>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white">Best Sellers</h2>
              <p className="text-gray-400 text-sm mt-1">Icons celebrated for superior craftsmanship and timeless beauty</p>
            </div>
            <Link to="/shop" className="text-[#C9A86C] hover:underline flex items-center gap-1 text-xs font-semibold uppercase tracking-wider">
              View Entire Collection <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {bestSellers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {bestSellers.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-white/10 rounded-xl bg-[#0D0D0D]">
              <p className="text-gray-400 text-sm">No best seller products added yet.</p>
              <p className="text-xs text-[#C9A86C] mt-1">Add new products from the Admin Panel to display them here.</p>
            </div>
          )}
        </div>
      </section>

      {/* 5. ===== CURATED PERSPECTIVE ===== */}
      <section className="py-24 bg-[#0A0A0A] overflow-hidden border-t border-b border-[#C9A86C]/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#C9A86C] text-xs font-semibold tracking-[0.3em] uppercase block mb-2">CURATED PERSPECTIVE</span>
            <h2 className="font-playfair text-3xl sm:text-5xl text-white font-normal">
              High Jewelry <span className="italic text-[#C9A86C]">Masterpieces</span>
            </h2>
          </div>

          <div className="flex flex-wrap lg:flex-nowrap justify-center items-center gap-4 sm:gap-6 py-6 px-2">
            {curvedGalleryItems.map((item) => (
              <Link
                key={item.id}
                to={item.link}
                className={`relative group w-48 sm:w-56 md:w-64 h-80 sm:h-96 rounded-2xl overflow-hidden bg-[#141414] border border-[#C9A86C]/30 transition-all duration-500 transform ${item.tiltClass}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {item.isCenter && (
                  <span className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white text-[10px] font-semibold tracking-wider px-3 py-1 rounded-full uppercase border border-white/30">
                    {item.category}
                  </span>
                )}

                <div className="absolute bottom-6 left-4 right-4 text-left">
                  <h3 className="font-playfair text-lg sm:text-xl text-white font-medium group-hover:text-[#C9A86C] transition-colors">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ===== NEW NECKLACES SECTION ===== */}
      <section className="py-20 bg-[#0D0D0D] border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <span className="text-xs text-[#C9A86C] uppercase tracking-[0.3em] font-semibold block mb-1">
                ROYAL ADORNMENTS
              </span>
              <h2 className="text-3xl md:text-5xl font-playfair font-bold text-white tracking-wide">
                NECKLACES
              </h2>
              <p className="text-gray-400 text-sm mt-2 max-w-xl">
                Exquisite heritage chokers, diamond solitaires, and 22K hallmarked gold pendants designed to crown your elegance.
              </p>
            </div>
            <Link
              to="/shop?category=Necklace"
              className="bg-[#C9A86C]/10 border border-[#C9A86C] text-[#C9A86C] hover:bg-[#C9A86C] hover:text-black transition-all px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2"
            >
              <span>Explore All Necklaces</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {necklacesList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {necklacesList.map((item) => (
                <ProductCard key={item._id} product={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-white/10 rounded-xl bg-[#141414]">
              <p className="text-gray-400 text-sm">No necklace products available currently.</p>
              <p className="text-xs text-[#C9A86C] mt-1">Add products under category "Necklace" from the Admin Panel to show them here.</p>
            </div>
          )}
        </div>
      </section>

      {/* 7. ===== NEW EARRINGS SECTION ===== */}
      <section className="py-20 bg-[#121212] border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <span className="text-xs text-[#C9A86C] uppercase tracking-[0.3em] font-semibold block mb-1">
                SOLITAIRES & JHUMKAS
              </span>
              <h2 className="text-3xl md:text-5xl font-playfair font-bold text-white tracking-wide">
                EARRINGS
              </h2>
              <p className="text-gray-400 text-sm mt-2 max-w-xl">
                Chandelier drops, certified diamond studs, and royal Polki jhumkas handcrafted in fine gold.
              </p>
            </div>
            <Link
              to="/shop?category=Earring"
              className="bg-[#C9A86C]/10 border border-[#C9A86C] text-[#C9A86C] hover:bg-[#C9A86C] hover:text-black transition-all px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2"
            >
              <span>Explore All Earrings</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {earringsList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {earringsList.map((item) => (
                <ProductCard key={item._id} product={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-white/10 rounded-xl bg-[#0D0D0D]">
              <p className="text-gray-400 text-sm">No earring products available currently.</p>
              <p className="text-xs text-[#C9A86C] mt-1">Add products under category "Earring" from the Admin Panel to show them here.</p>
            </div>
          )}
        </div>
      </section>

      {/* 8. ===== SIGNATURE SERIES ===== */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-[#C9A86C] tracking-[0.3em] text-xs font-semibold uppercase mb-2">
              SIGNATURE SERIES
            </span>
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-2">Featured Collections</h2>
            <p className="text-gray-400 text-sm">Curated jewelry lines crafted for your defining moments</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative group overflow-hidden rounded-xl h-96 border border-[#C9A86C]/30 shadow-xl">
              <div className="absolute inset-0 bg-gray-900">
                <img 
                  src={necklace1Img} 
                  alt="Royal Wedding" 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700 filter brightness-90" 
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition flex flex-col items-center justify-center text-white p-6 text-center">
                <span className="text-xs uppercase tracking-widest text-[#C9A86C] font-semibold mb-2">Bridal Edit</span>
                <h3 className="text-3xl font-playfair font-bold mb-2">Royal Wedding</h3>
                <p className="text-xs text-gray-300 max-w-xs mb-6">Opulent statement necklaces and heritage craftsmanship</p>
                <Link to="/shop?category=Necklace" className="border border-[#C9A86C] text-[#C9A86C] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-[#C9A86C] hover:text-black transition rounded-full">
                  Explore Edit
                </Link>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-xl h-96 border border-[#C9A86C]/30 shadow-xl">
              <div className="absolute inset-0 bg-gray-900">
                <img 
                  src={ring1Img} 
                  alt="Everyday Minimalist" 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700 filter brightness-90" 
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition flex flex-col items-center justify-center text-white p-6 text-center">
                <span className="text-xs uppercase tracking-widest text-[#C9A86C] font-semibold mb-2">Modern Luxury</span>
                <h3 className="text-3xl font-playfair font-bold mb-2">Everyday Minimalist</h3>
                <p className="text-xs text-gray-300 max-w-xs mb-6">Lightweight 18K & 22K gold rings and delicate pendants</p>
                <Link to="/shop?category=Ring" className="border border-[#C9A86C] text-[#C9A86C] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-[#C9A86C] hover:text-black transition rounded-full">
                  Explore Edit
                </Link>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-xl h-96 border border-[#C9A86C]/30 shadow-xl">
              <div className="absolute inset-0 bg-gray-900">
                <img 
                  src={earring1Img} 
                  alt="Diamond Solitaires" 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700 filter brightness-90" 
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition flex flex-col items-center justify-center text-white p-6 text-center">
                <span className="text-xs uppercase tracking-widest text-[#C9A86C] font-semibold mb-2">Sparkle Series</span>
                <h3 className="text-3xl font-playfair font-bold mb-2">Diamond Solitaires</h3>
                <p className="text-xs text-gray-300 max-w-xs mb-6">GIA & IGI certified solitaires mounted in gold</p>
                <Link to="/shop?category=Earring" className="border border-[#C9A86C] text-[#C9A86C] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-[#C9A86C] hover:text-black transition rounded-full">
                  Explore Edit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. ===== ROYAL BRAND STORY ===== */}
      <section className="py-24 bg-gradient-to-b from-[#0D0D0D] via-[#1A1814] to-[#0D0D0D] border-t border-b border-[#C9A86C]/20 relative">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <span className="text-[#C9A86C] text-xs tracking-[0.4em] font-bold uppercase block mb-3">
            HERITAGE & CRAFTSMANSHIP
          </span>
          <h2 className="text-3xl md:text-5xl font-playfair font-bold text-white mb-6 leading-tight">
            Centuries of Royal Legacy,<br />Sculpted in Pure Gold & Precious Gems
          </h2>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-3xl mx-auto mb-12 font-light">
            Every ZAKHIRA creation is handcrafted by master artisans using ethically sourced 22K/24K BIS-hallmarked gold and certified conflict-free diamonds. From intricate royal Polki settings to sleek modern silhouettes, we preserve timeless elegance for generations to come.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left border-t border-[#C9A86C]/20 pt-10">
            <div>
              <span className="font-playfair text-3xl font-bold text-[#C9A86C] block mb-1">100%</span>
              <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-1">BIS Hallmarked Gold</h4>
              <p className="text-xs text-gray-400">Every single gram is certified for purity with hallmark laser etching.</p>
            </div>
            <div>
              <span className="font-playfair text-3xl font-bold text-[#C9A86C] block mb-1">GIA / IGI</span>
              <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-1">Certified Diamonds</h4>
              <p className="text-xs text-gray-400">Includes international certificates guaranteeing cut, clarity and color.</p>
            </div>
            <div>
              <span className="font-playfair text-3xl font-bold text-[#C9A86C] block mb-1">Lifetime</span>
              <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-1">Buyback & Exchange</h4>
              <p className="text-xs text-gray-400">Full value buyback guarantees and complimentary annual cleaning & polishing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-20 bg-[#141414]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-[#C9A86C] tracking-[0.3em] text-xs font-semibold uppercase mb-2">
              CLIENT REVIEWS
            </span>
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-2">What Our Patrons Say</h2>
            <p className="text-gray-400 text-sm">Real stories from our valued customers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-[#0D0D0D] p-8 rounded-xl border border-[#C9A86C]/20 shadow-md">
                <Quote className="w-8 h-8 text-[#C9A86C] mb-4 opacity-60" />
                <div className="flex items-center gap-1 text-[#C9A86C] mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 italic font-light">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                  <div>
                    <h4 className="font-playfair font-bold text-sm text-white">{t.name}</h4>
                    <p className="text-xs text-gray-400">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-16 border-t border-white/10 bg-[#0A0A0A]">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-2xl font-playfair font-bold text-white mb-2">Stay Connected</h3>
            <p className="text-gray-400 text-xs mb-6">Subscribe to receive early access to signature collection releases and private sales.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to ZAKHIRA newsletter!'); }} className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                required
                placeholder="Enter your email address" 
                className="flex-1 px-4 py-3 bg-[#141414] border border-[#C9A86C]/30 text-white rounded-md focus:outline-none focus:border-[#C9A86C] text-sm"
              />
              <button type="submit" className="bg-[#C9A86C] text-black hover:bg-[#b8975b] px-8 py-3 rounded-md transition text-xs font-semibold tracking-wider uppercase whitespace-nowrap">
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
