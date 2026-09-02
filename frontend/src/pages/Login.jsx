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

  const handleFillAdmin = () => {
    setEmail('admin@zakhira.com');
    setPassword('adminpassword123');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50/50 py-12 px-4">
      <div className="bg-white p-8 md:p-10 rounded-xl shadow-lg border border-gray-100 max-w-md w-full space-y-6">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-zakhira-gold block mb-1">
            WELCOME BACK
          </span>
          <h2 className="text-3xl font-playfair font-bold text-zakhira-dark">
            Account Login
          </h2>
          <p className="text-gray-500 text-xs mt-1">
            Sign in to access your orders, wishlist and VIP privileges.
          </p>
        </div>

        {/* Demo Admin Auto-fill Helper */}
        <div className="bg-gold/10 border border-zakhira-gold/30 p-3 rounded-lg flex items-center justify-between text-xs text-zakhira-dark">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-zakhira-gold flex-shrink-0" />
            <span>Admin Demo Account Available</span>
          </div>
          <button
            type="button"
            onClick={handleFillAdmin}
            className="text-[11px] bg-zakhira-gold text-white px-2.5 py-1 rounded font-bold uppercase tracking-wider hover:bg-opacity-90 transition"
          >
            Auto-fill Admin
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-zakhira-gold"
              />
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-semibold text-gray-700">Password</label>
              <a href="#" onClick={(e) => e.preventDefault()} className="text-zakhira-gold text-[11px] hover:underline">
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
                className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-zakhira-gold"
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-zakhira-gold text-white py-3.5 rounded font-semibold text-xs tracking-widest uppercase hover:bg-opacity-90 transition shadow-md disabled:opacity-50 mt-2 flex items-center justify-center gap-2"
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="border-t border-gray-100 pt-6 text-center text-xs text-gray-500">
          Don't have a ZAKHIRA account yet?{' '}
          <Link to="/register" className="text-zakhira-gold font-bold hover:underline">
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
