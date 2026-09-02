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
      {/* ===== TOP BAR ===== */}
      <div className="bg-zakhira-dark text-white/80 text-xs py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="tracking-wider font-light">FREE SHIPPING ON ORDERS OVER ₹999</span>
            <span className="text-zakhira-gold">|</span>
            <span className="text-zakhira-gold font-medium">10% OFF FIRST ORDER | CODE: ZAKHIRA10</span>
          </div>
          <div className="flex items-center space-x-6 text-[11px] tracking-wider uppercase">
            {isAdmin && (
              <Link to="/admin" className="text-zakhira-gold font-semibold hover:underline flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" /> Admin Panel
              </Link>
            )}
            <Link to="/shop" className="hover:text-zakhira-gold transition">HELP & FAQ</Link>
            <Link to={isAuthenticated ? "/profile" : "/login"} className="hover:text-zakhira-gold transition">
              {isAuthenticated ? "MY ACCOUNT" : "LOGIN"}
            </Link>
          </div>
        </div>
      </div>

      {/* ===== MAIN NAVBAR ===== */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-zakhira-dark p-2 hover:text-zakhira-gold transition"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="text-3xl md:text-4xl font-playfair font-bold text-zakhira-gold tracking-widest uppercase">
                ZAKHIRA
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-7">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-xs font-semibold tracking-[0.18em] uppercase hover:text-zakhira-gold transition ${
                    location.pathname + location.search === link.path
                      ? 'text-zakhira-gold border-b-2 border-zakhira-gold pb-1'
                      : 'text-zakhira-dark'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4 md:space-x-5">
              {/* Search Toggle */}
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="hover:text-zakhira-gold transition p-1"
                title="Search"
              >
                <Search className="w-5 h-5 text-gray-700 hover:text-zakhira-gold" />
              </button>

              {/* Wishlist Icon */}
              <Link to="/wishlist" className="relative hover:text-zakhira-gold transition p-1" title="Wishlist">
                <Heart className="w-5 h-5 text-gray-700 hover:text-zakhira-gold" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 bg-zakhira-gold text-white text-[10px] font-bold rounded-full h-4.5 w-4.5 flex items-center justify-center px-1">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Icon */}
              <Link to="/cart" className="relative hover:text-zakhira-gold transition p-1" title="Shopping Cart">
                <ShoppingBag className="w-5 h-5 text-gray-700 hover:text-zakhira-gold" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 bg-zakhira-gold text-white text-[10px] font-bold rounded-full h-4.5 w-4.5 flex items-center justify-center px-1">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User Account Dropdown */}
              <div className="relative">
                {isAuthenticated ? (
                  <button
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className="flex items-center space-x-1.5 p-1 rounded-full hover:bg-gray-100 transition"
                  >
                    <div className="w-7 h-7 bg-zakhira-gold/20 border border-zakhira-gold text-zakhira-gold rounded-full flex items-center justify-center font-semibold text-xs uppercase">
                      {user?.name ? user.name[0] : 'U'}
                    </div>
                  </button>
                ) : (
                  <Link to="/login" className="hover:text-zakhira-gold transition p-1" title="Login / Register">
                    <User className="w-5 h-5 text-gray-700 hover:text-zakhira-gold" />
                  </Link>
                )}

                {/* Dropdown Menu */}
                {isAuthenticated && showUserDropdown && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-md shadow-xl py-2 z-50 text-sm"
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
                      My Profile & Orders
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

          {/* Search Bar Overlay */}
          {isSearchOpen && (
            <div className="py-3 border-t border-gray-100 animate-fadeIn">
              <form onSubmit={handleSearchSubmit} className="relative max-w-xl mx-auto">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for fine necklaces, rings, earrings..."
                  className="w-full px-5 py-2.5 border border-zakhira-gold/40 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-zakhira-gold pr-10 bg-gray-50/50"
                  autoFocus
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-zakhira-gold p-1 hover:scale-110 transition">
                  <Search className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Mobile Slide-out Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 py-4 shadow-lg">
            <div className="container mx-auto px-4 flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-xs font-semibold tracking-widest text-zakhira-dark hover:text-zakhira-gold transition py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <div className="border-t border-gray-100 pt-3 flex flex-col space-y-2">
                {isAdmin && (
                  <Link 
                    to="/admin" 
                    className="text-xs font-bold text-zakhira-gold py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    👑 ADMIN PANEL
                  </Link>
                )}
                <Link 
                  to="/wishlist" 
                  className="text-xs font-medium text-gray-700 py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ❤️ WISHLIST ({wishlistCount})
                </Link>
                <Link 
                  to="/cart" 
                  className="text-xs font-medium text-gray-700 py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  🛍️ CART ({cartCount})
                </Link>
                {isAuthenticated ? (
                  <Link 
                    to="/profile" 
                    className="text-xs font-medium text-gray-700 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    👤 MY ACCOUNT ({user?.name})
                  </Link>
                ) : (
                  <Link 
                    to="/login" 
                    className="text-xs font-medium text-zakhira-gold py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    🔐 LOGIN / REGISTER
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;