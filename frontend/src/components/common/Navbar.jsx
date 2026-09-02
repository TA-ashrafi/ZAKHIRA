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
  UserCheck
} from 'lucide-react';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';
import useWishlist from '../../hooks/useWishlist';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
      {/* ===== TOP BAR - BLACK ===== */}
      <div className="bg-[#1A1A1A] text-white/60 text-[10px] py-2 hidden md:block absolute top-0 left-0 right-0 z-50 border-b border-white/5">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="tracking-wider font-light flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-zakhira-gold animate-pulse"></span>
              LIVE GOLD 24K: ₹7,450/g
            </span>
            <span className="text-white/20">|</span>
            <span className="tracking-wider font-light">INSURED EXPRESS SHIPPING</span>
            <span className="text-white/20">|</span>
            <span className="text-zakhira-gold font-semibold tracking-wider">10% OFF: ZAKHIRA10</span>
          </div>
          <div className="flex items-center space-x-6 text-[10px] tracking-wider uppercase">
            {isAdmin && (
              <Link to="/admin" className="text-zakhira-gold font-semibold hover:underline flex items-center gap-1">
                <ShieldAlert className="w-3 h-3" /> Admin
              </Link>
            )}
            <Link to="/shop" className="hover:text-zakhira-gold transition">HELP</Link>
            <Link to="/track-order" className="hover:text-zakhira-gold transition">TRACK</Link>
            <Link to={isAuthenticated ? "/profile" : "/login"} className="hover:text-zakhira-gold transition">
              {isAuthenticated ? "ACCOUNT" : "LOGIN"}
            </Link>
          </div>
        </div>
      </div>

      {/* ===== MAIN NAVBAR - CLEAN TRANSPARENT (SAME AS BEFORE) ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent px-4 md:px-8 py-4 md:py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white/80 hover:text-zakhira-gold transition p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl md:text-3xl font-playfair font-bold text-white tracking-widest uppercase hover:text-zakhira-gold transition">
              ZAKHIRA
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-[10px] font-light tracking-[0.25em] uppercase hover:text-zakhira-gold transition ${
                  location.pathname + location.search === link.path 
                    ? 'text-zakhira-gold border-b border-zakhira-gold pb-1' 
                    : 'text-white/70'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4 md:space-x-5">
            {/* Search */}
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-white/70 hover:text-zakhira-gold transition p-1"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <Link to="/wishlist" className="relative text-white/70 hover:text-zakhira-gold transition p-1">
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-zakhira-gold text-black text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative text-white/70 hover:text-zakhira-gold transition p-1">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-zakhira-gold text-black text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User */}
            <div className="relative">
              {isAuthenticated ? (
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center p-1 rounded-full hover:ring-2 hover:ring-zakhira-gold/50 transition"
                >
                  <div className="w-7 h-7 bg-zakhira-gold/20 border border-zakhira-gold/50 text-zakhira-gold rounded-full flex items-center justify-center font-semibold text-xs uppercase">
                    {user?.name ? user.name[0] : 'U'}
                  </div>
                </button>
              ) : (
                <Link to="/login" className="text-white/70 hover:text-zakhira-gold transition p-1">
                  <User className="w-5 h-5" />
                </Link>
              )}

              {/* Dropdown */}
              {isAuthenticated && showUserDropdown && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md border border-white/20 rounded-md shadow-xl py-2 z-50 text-sm"
                  onMouseLeave={() => setShowUserDropdown(false)}
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="font-semibold text-gray-800 truncate">{user?.name}</p>
                    <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                  </div>

                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setShowUserDropdown(false)}
                      className="flex items-center gap-2 px-4 py-2 text-zakhira-gold font-semibold hover:bg-gold/10 transition"
                    >
                      <ShieldAlert className="w-4 h-4" />
                      Admin Panel
                    </Link>
                  )}

                  <Link
                    to="/profile"
                    onClick={() => setShowUserDropdown(false)}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
                  >
                    <UserCheck className="w-4 h-4" />
                    My Profile
                  </Link>

                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <form onSubmit={handleSearchSubmit} className="relative max-w-xl mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for fine jewellery..."
                className="w-full px-5 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white placeholder:text-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-zakhira-gold pr-10"
                autoFocus
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-zakhira-gold p-1 hover:scale-110 transition">
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md pt-24 px-6">
          <div className="flex flex-col space-y-4 text-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm font-light tracking-[0.3em] uppercase text-white/80 hover:text-zakhira-gold transition py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="border-t border-white/10 pt-4 flex flex-col space-y-3">
              {isAdmin && (
                <Link to="/admin" className="text-zakhira-gold text-sm font-semibold" onClick={() => setIsMenuOpen(false)}>
                  👑 Admin Panel
                </Link>
              )}
              <Link to="/track-order" className="text-white/60 text-sm" onClick={() => setIsMenuOpen(false)}>
                Track Order
              </Link>
              <Link to="/wishlist" className="text-white/60 text-sm" onClick={() => setIsMenuOpen(false)}>
                Wishlist ({wishlistCount})
              </Link>
              <Link to="/cart" className="text-white/60 text-sm" onClick={() => setIsMenuOpen(false)}>
                Cart ({cartCount})
              </Link>
              {isAuthenticated ? (
                <Link to="/profile" className="text-white/60 text-sm" onClick={() => setIsMenuOpen(false)}>
                  My Account ({user?.name})
                </Link>
              ) : (
                <Link to="/login" className="text-zakhira-gold text-sm font-semibold" onClick={() => setIsMenuOpen(false)}>
                  Login / Register
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;