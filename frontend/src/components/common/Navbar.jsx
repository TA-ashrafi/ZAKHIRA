import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, 
  Heart, 
  User, 
  Search, 
  Menu,
  X,
  LogOut,
  ShieldAlert,
  UserCheck,
  Phone,
  Mail,
  HelpCircle,
  Clock,
  MessageCircle
} from 'lucide-react';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';
import useWishlist from '../../hooks/useWishlist';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'NEW IN', path: '/shop?sort=newest' },
    { name: 'NECKLACES', path: '/shop?category=Necklace' },
    { name: 'EARRINGS', path: '/shop?category=Earring' },
    { name: 'RINGS', path: '/shop?category=Ring' },
    { name: 'PENDANTS', path: '/shop?category=Pendant' },
    { name: 'BRACELETS', path: '/shop?category=Bracelet' },
    { name: 'COLLECTIONS', path: '/shop' },
    { name: 'SALE', path: '/shop' },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 transition-all duration-300">
        {/* ===== TOP ANNOUNCEMENT & UTILITY BAR ===== */}
        <div className="hidden md:block bg-black/50 border-b border-white/10 text-white/70 text-[10px] tracking-wider py-1.5 px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            {/* Left Highlights */}
            <div className="flex items-center space-x-5">
              <span className="font-light flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-zakhira-gold animate-pulse"></span>
                LIVE GOLD 24K: ₹7,450/g
              </span>
              <span className="text-white/20">|</span>
              <span className="font-light">INSURED EXPRESS SHIPPING WORLDWIDE</span>
              <span className="text-white/20">|</span>
              <span className="text-zakhira-gold font-semibold">USE CODE: ZAKHIRA10 FOR 10% OFF</span>
            </div>

            {/* Right Action Links */}
            <div className="flex items-center space-x-5 text-[10px] uppercase font-medium">
              {isAdmin && (
                <Link to="/admin" className="text-zakhira-gold font-bold hover:underline flex items-center gap-1">
                  <ShieldAlert className="w-3 h-3" /> Admin Portal
                </Link>
              )}
              
              <button 
                onClick={() => setIsHelpOpen(true)}
                className="hover:text-zakhira-gold transition flex items-center gap-1 cursor-pointer"
              >
                <HelpCircle className="w-3 h-3 text-zakhira-gold" /> HELP & SUPPORT
              </button>

              <Link to="/track-order" className="hover:text-zakhira-gold transition">
                TRACK ORDER
              </Link>

              <Link 
                to={isAuthenticated ? "/profile" : "/login"} 
                className="hover:text-zakhira-gold transition font-semibold text-zakhira-gold border border-zakhira-gold/40 px-2.5 py-0.5 rounded-full hover:bg-zakhira-gold hover:text-black"
              >
                {isAuthenticated ? "MY ACCOUNT" : "LOGIN / REGISTER"}
              </Link>
            </div>
          </div>
        </div>

        {/* ===== MAIN NAVBAR ===== */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between">
          {/* Mobile Menu Toggle Button */}
          <button 
            className="lg:hidden text-white/90 hover:text-zakhira-gold transition p-1.5 rounded-md hover:bg-white/5"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo - Plain Text ZAKHIRA */}
          <Link to="/" className="flex items-center group">
            <span className="text-2xl md:text-3xl font-playfair font-bold text-white tracking-[0.2em] uppercase group-hover:text-zakhira-gold transition duration-300">
              ZAKHIRA
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-[11px] font-medium tracking-[0.2em] uppercase transition duration-200 py-1 ${
                  location.pathname + location.search === link.path 
                    ? 'text-zakhira-gold border-b-2 border-zakhira-gold' 
                    : 'text-white/80 hover:text-zakhira-gold'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Utilities (Search, Wishlist, Cart, Profile) */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Search Toggle */}
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-white/80 hover:text-zakhira-gold transition p-1.5 rounded-full hover:bg-white/5"
              title="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Icon */}
            <Link to="/wishlist" className="relative text-white/80 hover:text-zakhira-gold transition p-1.5 rounded-full hover:bg-white/5" title="Wishlist">
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-zakhira-gold text-black text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <Link to="/cart" className="relative text-white/80 hover:text-zakhira-gold transition p-1.5 rounded-full hover:bg-white/5" title="Cart">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-zakhira-gold text-black text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Profile / Dropdown */}
            <div className="relative">
              {isAuthenticated ? (
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center p-1 rounded-full border border-zakhira-gold/60 hover:ring-2 hover:ring-zakhira-gold/50 transition"
                  title="Account"
                >
                  <div className="w-7 h-7 bg-zakhira-gold/20 text-zakhira-gold rounded-full flex items-center justify-center font-bold text-xs uppercase">
                    {user?.name ? user.name[0] : 'U'}
                  </div>
                </button>
              ) : (
                <Link 
                  to="/login" 
                  className="hidden sm:flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zakhira-gold border border-zakhira-gold/50 px-3 py-1.5 rounded-full hover:bg-zakhira-gold hover:text-black transition"
                >
                  <User className="w-4 h-4" />
                  <span>Login</span>
                </Link>
              )}

              {/* User Dropdown Menu */}
              {isAuthenticated && showUserDropdown && (
                <div 
                  className="absolute right-0 mt-2 w-52 bg-[#141414] border border-zakhira-gold/30 rounded-lg shadow-2xl py-2 z-50 text-sm text-white"
                  onMouseLeave={() => setShowUserDropdown(false)}
                >
                  <div className="px-4 py-2 border-b border-white/10">
                    <p className="font-semibold text-zakhira-gold truncate">{user?.name}</p>
                    <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                  </div>

                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setShowUserDropdown(false)}
                      className="flex items-center gap-2 px-4 py-2 text-zakhira-gold font-semibold hover:bg-zakhira-gold/10 transition"
                    >
                      <ShieldAlert className="w-4 h-4" />
                      Admin Control Panel
                    </Link>
                  )}

                  <Link
                    to="/profile"
                    onClick={() => setShowUserDropdown(false)}
                    className="flex items-center gap-2 px-4 py-2 text-gray-200 hover:bg-white/5 transition"
                  >
                    <UserCheck className="w-4 h-4 text-zakhira-gold" />
                    My Profile
                  </Link>

                  <Link
                    to="/track-order"
                    onClick={() => setShowUserDropdown(false)}
                    className="flex items-center gap-2 px-4 py-2 text-gray-200 hover:bg-white/5 transition"
                  >
                    <Clock className="w-4 h-4 text-zakhira-gold" />
                    Track My Orders
                  </Link>

                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-rose-400 hover:bg-rose-500/10 transition text-left font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout Account
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ===== EXPANDABLE SEARCH BAR ===== */}
        {isSearchOpen && (
          <div className="px-4 pb-4 pt-1 bg-black/90 border-t border-white/10 animate-fadeIn">
            <form onSubmit={handleSearchSubmit} className="relative max-w-xl mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for fine necklaces, diamond rings, gold bangles..."
                className="w-full px-5 py-2.5 bg-white/10 border border-zakhira-gold/40 rounded-full text-white placeholder:text-gray-400 text-xs focus:outline-none focus:ring-2 focus:ring-zakhira-gold pr-10"
                autoFocus
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-zakhira-gold p-1 hover:scale-110 transition">
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* ===== MOBILE MENU OVERLAY ===== */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl pt-28 px-6 overflow-y-auto">
          <div className="flex flex-col space-y-4 text-center max-w-md mx-auto">
            <span className="text-xs uppercase tracking-[0.3em] text-zakhira-gold font-bold">COLLECTIONS & CATEGORIES</span>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm font-medium tracking-[0.25em] uppercase text-white/90 hover:text-zakhira-gold transition py-2 border-b border-white/5"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-4 flex flex-col space-y-3">
              {isAdmin && (
                <Link to="/admin" className="text-zakhira-gold text-sm font-bold bg-zakhira-gold/10 py-2 rounded-lg" onClick={() => setIsMenuOpen(false)}>
                  Admin Panel
                </Link>
              )}
              <button onClick={() => { setIsMenuOpen(false); setIsHelpOpen(true); }} className="text-white/80 text-sm py-1 hover:text-zakhira-gold">
                Help & Concierge
              </button>
              <Link to="/track-order" className="text-white/80 text-sm py-1 hover:text-zakhira-gold" onClick={() => setIsMenuOpen(false)}>
                Track Order
              </Link>
              <Link to="/wishlist" className="text-white/80 text-sm py-1 hover:text-zakhira-gold" onClick={() => setIsMenuOpen(false)}>
                Wishlist ({wishlistCount})
              </Link>
              <Link to="/cart" className="text-white/80 text-sm py-1 hover:text-zakhira-gold" onClick={() => setIsMenuOpen(false)}>
                Shopping Cart ({cartCount})
              </Link>
              {isAuthenticated ? (
                <Link to="/profile" className="text-zakhira-gold text-sm font-bold border border-zakhira-gold/50 py-2.5 rounded-full" onClick={() => setIsMenuOpen(false)}>
                  My Account ({user?.name})
                </Link>
              ) : (
                <Link to="/login" className="bg-zakhira-gold text-black text-sm font-bold py-2.5 rounded-full uppercase tracking-wider" onClick={() => setIsMenuOpen(false)}>
                  Login / Register
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ===== HELP & CONCIERGE MODAL ===== */}
      {isHelpOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141414] border border-zakhira-gold/40 rounded-2xl max-w-lg w-full p-6 text-white relative shadow-2xl animate-scaleUp">
            {/* Close button */}
            <button 
              onClick={() => setIsHelpOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Title */}
            <div className="text-center mb-6">
              <h3 className="font-playfair text-2xl font-bold text-white">Royal Concierge & Help</h3>
              <p className="text-xs text-gray-400 mt-1">Our private jewellery advisors are at your service 24/7</p>
            </div>

            {/* Contact Details */}
            <div className="space-y-3 mb-6">
              <a 
                href="https://wa.me/918527580809" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between bg-emerald-950/40 border border-emerald-500/30 p-3.5 rounded-xl text-emerald-300 hover:bg-emerald-900/30 transition text-xs"
              >
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-emerald-400" />
                  <div>
                    <p className="font-bold">WhatsApp Concierge</p>
                    <p className="text-[11px] opacity-80">+91 8527580809</p>
                  </div>
                </div>
                <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-[10px] font-semibold uppercase">Chat Live</span>
              </a>

              <a 
                href="tel:+918527580809" 
                className="flex items-center justify-between bg-white/5 border border-white/10 p-3.5 rounded-xl hover:bg-white/10 transition text-xs"
              >
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-zakhira-gold" />
                  <div>
                    <p className="font-bold">Direct Call Line</p>
                    <p className="text-[11px] text-gray-400">+91 8527580809</p>
                  </div>
                </div>
                <span className="text-zakhira-gold text-[10px] uppercase tracking-wider font-semibold">Call Now</span>
              </a>

              <a 
                href="mailto:tahseenashrafi29@gmail.com" 
                className="flex items-center justify-between bg-white/5 border border-white/10 p-3.5 rounded-xl hover:bg-white/10 transition text-xs"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-zakhira-gold" />
                  <div>
                    <p className="font-bold">Email Support</p>
                    <p className="text-[11px] text-gray-400">tahseenashrafi29@gmail.com</p>
                  </div>
                </div>
                <span className="text-zakhira-gold text-[10px] uppercase tracking-wider font-semibold">Send Mail</span>
              </a>
            </div>

            {/* Quick Links & Info */}
            <div className="border-t border-white/10 pt-4 text-xs space-y-2 text-gray-300">
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-400">Insured Shipping Policy:</span>
                <span className="font-semibold text-white">Complimentary Express</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-400">Purity Guarantee:</span>
                <span className="font-semibold text-zakhira-gold">100% BIS Hallmarked</span>
              </div>
            </div>

            {/* Close CTA */}
            <button 
              onClick={() => setIsHelpOpen(false)}
              className="mt-6 w-full bg-zakhira-gold text-black py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#b8975b] transition"
            >
              Close Help Menu
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
