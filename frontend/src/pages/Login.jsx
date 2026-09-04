import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const result = await login({ email, password });
    setIsSubmitting(false);

    if (result && result.success) {
      if (result.user?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate(from, { replace: true });
      }
    }
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center bg-[#0D0D0D] py-16 px-4 overflow-hidden">
      {/* Background Wallpaper Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center filter brightness-40 contrast-110 scale-105 transition-transform duration-1000"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1920')`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/80 to-[#0D0D0D]/60 pointer-events-none" />

      {/* Login Card Container */}
      <div className="relative z-10 bg-[#141414]/90 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-[0_0_50px_rgba(201,168,108,0.15)] border border-[#C9A86C]/40 max-w-md w-full space-y-6">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.35em] font-semibold text-[#C9A86C] block mb-2">
            ROYAL MEMBER PORTAL
          </span>
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white tracking-wide">
            Account Login
          </h2>
          <p className="text-gray-400 text-xs mt-2 font-light">
            Sign in to access your private orders, wishlist and concierge service.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          <div>
            <label className="block font-semibold text-gray-200 mb-1.5 uppercase tracking-wider text-[10px]">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-3.5 bg-[#1A1A1A]/80 border border-[#C9A86C]/30 text-white rounded-xl focus:outline-none focus:border-[#C9A86C] focus:ring-1 focus:ring-[#C9A86C] placeholder-gray-500 font-medium text-xs transition"
              />
              <Mail className="w-4 h-4 text-[#C9A86C] absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="font-semibold text-gray-200 uppercase tracking-wider text-[10px]">
                Password
              </label>
              <a href="#" onClick={(e) => e.preventDefault()} className="text-[#C9A86C] text-[11px] hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3.5 bg-[#1A1A1A]/80 border border-[#C9A86C]/30 text-white rounded-xl focus:outline-none focus:border-[#C9A86C] focus:ring-1 focus:ring-[#C9A86C] placeholder-gray-500 font-medium text-xs transition"
              />
              <Lock className="w-4 h-4 text-[#C9A86C] absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#C9A86C] text-black py-4 rounded-xl font-bold text-xs tracking-widest uppercase hover:bg-[#b8975b] transition shadow-lg shadow-[#C9A86C]/20 disabled:opacity-50 mt-2 flex items-center justify-center gap-2 group cursor-pointer"
          >
            {isSubmitting ? 'Authenticating...' : 'Sign In To Portal'} 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="border-t border-white/10 pt-6 text-center text-xs text-gray-400 space-y-3">
          <p>
            Don't have a ZAKHIRA account yet?{' '}
            <Link to="/register" className="text-[#C9A86C] font-bold hover:underline">
              Register Now
            </Link>
          </p>

          <div className="inline-flex items-center justify-center gap-1.5 text-[10px] text-gray-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C9A86C]" />
            <span>256-Bit SSL Encrypted & Private Access</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
