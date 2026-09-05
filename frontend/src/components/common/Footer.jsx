import { Link } from 'react-router-dom';
import { 
  Globe, 
  Share2, 
  MessageCircle, 
  Mail, 
  Phone, 
  MapPin,
  CreditCard,
  Shield,
  Truck,
  RotateCcw
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zakhira-dark text-white/80">
      {/* ===== STAY CONNECTED NEWSLETTER SECTION ===== */}
      <div className="bg-[#141414] border-b border-[#C9A86C]/30 py-10 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-[#C9A86C] text-xs font-bold uppercase tracking-[0.3em]">ROYAL CIRCLE</span>
          <h3 className="text-2xl md:text-3xl font-playfair font-bold text-white">Stay Connected</h3>
          <p className="text-gray-400 text-xs max-w-lg mx-auto">
            Subscribe to receive private invitations to new fine jewellery collection launches and exclusive VIP privileges.
          </p>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const input = e.target.elements.email;
              const emailVal = input.value.trim();
              if (!emailVal) return;
              try {
                const res = await fetch('/api/subscribers', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email: emailVal }),
                });
                const data = await res.json();
                if (data.success) {
                  alert(data.message || 'Thank you for subscribing us!');
                  input.value = '';
                } else {
                  alert(data.message || 'Subscription failed');
                }
              } catch (err) {
                alert('Thank you for subscribing us!');
                input.value = '';
              }
            }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email address..."
              className="flex-1 px-4 py-3 bg-[#0D0D0D] border border-gray-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#C9A86C]"
            />
            <button
              type="submit"
              className="bg-[#C9A86C] text-black px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#b8975b] transition cursor-pointer shadow"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* ===== TOP SECTION ===== */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Brand */}
            <div className="md:col-span-1.5">
              <h3 className="text-3xl font-playfair text-zakhira-gold mb-4">
                ZAKHIRA
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Timeless jewellery crafted with precision, passion, and the finest materials. 
                Made for every moment of your life.
              </p>
              <div className="flex space-x-4 mt-6 text-zakhira-gold">
                <a href="https://wa.me/918527580809" target="_blank" rel="noreferrer" className="hover:text-white transition" title="WhatsApp">
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a href="mailto:tahseenashrafi29@gmail.com" className="hover:text-white transition" title="Email">
                  <Mail className="w-5 h-5" />
                </a>
                <a href="tel:+918527580809" className="hover:text-white transition" title="Call">
                  <Phone className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Shop */}
            <div>
              <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
                Shop
              </h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/shop" className="hover:text-zakhira-gold transition">All Jewellery</Link></li>
                <li><Link to="/shop?category=Necklace" className="hover:text-zakhira-gold transition">Necklaces</Link></li>
                <li><Link to="/shop?category=Earring" className="hover:text-zakhira-gold transition">Earrings</Link></li>
                <li><Link to="/shop?category=Ring" className="hover:text-zakhira-gold transition">Rings</Link></li>
                <li><Link to="/shop?category=Bracelet" className="hover:text-zakhira-gold transition">Bracelets</Link></li>
                <li><Link to="/shop?category=Pendant" className="hover:text-zakhira-gold transition">Pendants</Link></li>
              </ul>
            </div>

            {/* Customer Care */}
            <div>
              <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
                Customer Care
              </h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/contact" className="hover:text-zakhira-gold transition">Contact Us</Link></li>
                <li><Link to="/shipping-info" className="hover:text-zakhira-gold transition">Shipping Info</Link></li>
                <li><Link to="/returns-exchanges" className="hover:text-zakhira-gold transition">Returns & Exchanges</Link></li>
                <li><Link to="/faq" className="hover:text-zakhira-gold transition">FAQ</Link></li>
                <li><Link to="/track-order" className="hover:text-zakhira-gold transition">Track Order</Link></li>
              </ul>
            </div>

            {/* About */}
            <div>
              <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
                About
              </h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/our-story" className="hover:text-zakhira-gold transition">Our Story</Link></li>
                <li><Link to="/craftsmanship" className="hover:text-zakhira-gold transition">Craftsmanship</Link></li>
                <li><Link to="/sustainability" className="hover:text-zakhira-gold transition">Sustainability</Link></li>
                <li><Link to="/store-locator" className="hover:text-zakhira-gold transition">Store Locator</Link></li>
                <li><Link to="/careers" className="hover:text-zakhira-gold transition">Careers</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
                Get in Touch
              </h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-zakhira-gold mt-0.5 flex-shrink-0" />
                  <a 
                    href="mailto:tahseenashrafi29@gmail.com" 
                    className="hover:text-zakhira-gold transition text-white/90 break-all"
                  >
                    tahseenashrafi29@gmail.com
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-zakhira-gold mt-0.5 flex-shrink-0" />
                  <a 
                    href="https://wa.me/918527580809" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-zakhira-gold transition text-white/90"
                  >
                    +91 8527580809
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-zakhira-gold mt-0.5 flex-shrink-0" />
                  <span className="text-white/60">
                    Jaipur, Rajasthan, India
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ===== MIDDLE SECTION - Features ===== */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <Truck className="w-6 h-6 text-zakhira-gold" />
              <div>
                <h5 className="text-white text-sm font-medium">Free Shipping</h5>
                <p className="text-xs text-white/60">On orders over ₹999</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="w-6 h-6 text-zakhira-gold" />
              <div>
                <h5 className="text-white text-sm font-medium">Easy Returns</h5>
                <p className="text-xs text-white/60">30-day hassle free</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-zakhira-gold" />
              <div>
                <h5 className="text-white text-sm font-medium">Secure Payment</h5>
                <p className="text-xs text-white/60">100% secure checkout</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-zakhira-gold" />
              <div>
                <h5 className="text-white text-sm font-medium">Trusted Quality</h5>
                <p className="text-xs text-white/60">Hallmarked jewellery</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== BOTTOM SECTION ===== */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6 text-xs">
            <span>© {currentYear} ZAKHIRA. All rights reserved.</span>
            <Link to="/returns-exchanges" className="hover:text-zakhira-gold transition">Privacy Policy</Link>
            <Link to="/returns-exchanges" className="hover:text-zakhira-gold transition">Terms of Service</Link>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/60">Secure payments by</span>
            <div className="flex gap-2">
              <span className="bg-white/10 px-3 py-1 rounded text-xs">VISA</span>
              <span className="bg-white/10 px-3 py-1 rounded text-xs">Mastercard</span>
              <span className="bg-white/10 px-3 py-1 rounded text-xs">₹ UPI</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
