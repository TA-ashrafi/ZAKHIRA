import { Link, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, 
  Heart, 
  User, 
  Search, 
  Menu,
  X 
} from 'lucide-react';
import { useState } from 'react';

import logo from '../../assets/logo/zakhira-logo.svg';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'NEW IN', path: '/shop?sort=newest' },
    { name: 'NECKLACES', path: '/shop?category=Necklace' },
    { name: 'EARRINGS', path: '/shop?category=Earring' },
    { name: 'RINGS', path: '/shop?category=Ring' },
    { name: 'PENDANTS', path: '/shop?category=Pendant' },
    { name: 'BRACELETS', path: '/shop?category=Bracelet' },
    { name: 'COLLECTIONS', path: '/collections' },
    { name: 'SALE', path: '/shop?sale=true' },
  ];

  return (
    <>
      {/* ===== TOP BAR ===== */}
      <div className="bg-zakhira-dark text-white/80 text-xs py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="tracking-wider">FREE SHIPPING ON ORDERS OVER ₹999</span>
            <span className="text-zakhira-gold">|</span>
            <span>10% OFF FIRST ORDER | CODE: ZAKHIRA10</span>
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/faq" className="hover:text-zakhira-gold transition">HELP & FAQ</Link>
            <Link to="/orders" className="hover:text-zakhira-gold transition">TRACK ORDER</Link>
          </div>
        </div>
      </div>

      {/* ===== MAIN NAVBAR ===== */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo - Fallback with text if logo not available */}
            <Link to="/" className="flex items-center">
              <span className="text-3xl font-playfair font-bold text-zakhira-gold tracking-wider">
                ZAKHIRA
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-xs tracking-[0.2em] uppercase hover:text-zakhira-gold transition ${
                    location.pathname === link.path.split('?')[0] 
                      ? 'text-zakhira-gold' 
                      : 'text-zakhira-dark'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-5">
              {/* Search */}
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="hover:text-zakhira-gold transition"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <Link to="/wishlist" className="relative hover:text-zakhira-gold transition">
                <Heart className="w-5 h-5" />
                <span className="absolute -top-1 -right-2 bg-zakhira-gold text-white text-[9px] rounded-full h-4 w-4 flex items-center justify-center">
                  0
                </span>
              </Link>

              {/* Cart */}
              <Link to="/cart" className="relative hover:text-zakhira-gold transition">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-1 -right-2 bg-zakhira-gold text-white text-[9px] rounded-full h-4 w-4 flex items-center justify-center">
                  0
                </span>
              </Link>

              {/* User */}
              <Link to="/login" className="hover:text-zakhira-gold transition">
                <User className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          {isSearchOpen && (
            <div className="py-4 border-t">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for jewellery..."
                  className="w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-zakhira-gold"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t py-4">
            <div className="container mx-auto px-4 flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-sm tracking-wider hover:text-zakhira-gold transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t pt-3 flex space-x-6">
                <Link to="/wishlist" className="text-sm hover:text-zakhira-gold">Wishlist</Link>
                <Link to="/cart" className="text-sm hover:text-zakhira-gold">Cart</Link>
                <Link to="/login" className="text-sm hover:text-zakhira-gold">Login</Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;