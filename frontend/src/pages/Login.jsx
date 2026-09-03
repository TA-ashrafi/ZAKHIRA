import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Lock, Mail, ArrowRight } from 'lucide-react';
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
    <div className="min-h-[85vh] flex items-center justify-center bg-[#0D0D0D] py-16 px-4">
      <div className="bg-[#141414] p-8 md:p-10 rounded-2xl shadow-2xl border border-[#C9A86C]/30 max-w-md w-full space-y-6">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C9A86C] block mb-1">
            WELCOME BACK
          </span>
          <h2 className="text-3xl font-playfair font-bold text-white">
            Account Login
          </h2>
          <p className="text-gray-400 text-xs mt-2">
            Sign in to access your orders, wishlist and private concierge.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          <div>
            <label className="block font-semibold text-gray-200 mb-1.5">Email Address</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-3 bg-[#1A1A1A] border border-gray-700 text-white rounded-lg focus:outline-none focus:border-[#C9A86C] focus:ring-1 focus:ring-[#C9A86C] placeholder-gray-500 font-medium text-sm transition"
              />
              <Mail className="w-4 h-4 text-[#C9A86C] absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="font-semibold text-gray-200">Password</label>
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
                className="w-full pl-10 pr-4 py-3 bg-[#1A1A1A] border border-gray-700 text-white rounded-lg focus:outline-none focus:border-[#C9A86C] focus:ring-1 focus:ring-[#C9A86C] placeholder-gray-500 font-medium text-sm transition"
              />
              <Lock className="w-4 h-4 text-[#C9A86C] absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#C9A86C] text-black py-3.5 rounded-lg font-bold text-xs tracking-widest uppercase hover:bg-[#b8975b] transition shadow-lg shadow-[#C9A86C]/10 disabled:opacity-50 mt-2 flex items-center justify-center gap-2"
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="border-t border-white/10 pt-6 text-center text-xs text-gray-400">
          Don't have a ZAKHIRA account yet?{' '}
          <Link to="/register" className="text-[#C9A86C] font-bold hover:underline">
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
