import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, User, Phone, ArrowRight, Shield } from 'lucide-react';
import useAuth from '../hooks/useAuth';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'user',
    adminSecret: '',
  });
  const [isAdminRegister, setIsAdminRegister] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const payload = {
      ...formData,
      role: isAdminRegister ? 'admin' : 'user',
    };
    const result = await register(payload);
    setIsSubmitting(false);

    if (result && result.success) {
      if (payload.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50/50 py-12 px-4">
      <div className="bg-white p-8 md:p-10 rounded-xl shadow-lg border border-gray-100 max-w-md w-full">
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-zakhira-gold block mb-1">
            JOIN THE CLUB
          </span>
          <h2 className="text-3xl font-playfair font-bold text-zakhira-dark">
            Create Account
          </h2>
          <p className="text-gray-500 text-xs mt-1">
            Register for a VIP membership and enjoy bespoke jewelry recommendations.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Full Name *</label>
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Priya Sharma"
                className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-zakhira-gold"
              />
              <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Email Address *</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="priya@example.com"
                className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-zakhira-gold"
              />
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Password * (Min 6 chars)</label>
            <div className="relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-zakhira-gold"
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Phone Number</label>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 9876543210"
                className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-zakhira-gold"
              />
              <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Admin Role Toggle Option */}
          <div className="pt-2 border-t border-gray-100">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
              <input
                type="checkbox"
                checked={isAdminRegister}
                onChange={(e) => {
                  setIsAdminRegister(e.target.checked);
                  if (e.target.checked) {
                    setFormData((prev) => ({ ...prev, adminSecret: 'zakhira_admin_2026' }));
                  }
                }}
                className="rounded border-gray-300 text-zakhira-gold focus:ring-zakhira-gold"
              />
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-zakhira-gold" /> Register as Administrator
              </span>
            </label>

            {isAdminRegister && (
              <div className="mt-3 bg-amber-50 p-3 rounded border border-amber-200">
                <label className="block text-[11px] font-bold text-amber-900 mb-1">
                  Admin Secret Key *
                </label>
                <input
                  type="password"
                  name="adminSecret"
                  value={formData.adminSecret}
                  onChange={handleChange}
                  placeholder="zakhira_admin_2026"
                  required={isAdminRegister}
                  className="w-full px-2.5 py-1.5 border border-amber-300 rounded text-xs bg-white focus:outline-none focus:ring-1 focus:ring-zakhira-gold"
                />
                <p className="text-[10px] text-amber-700 mt-1">Default Key: <code>zakhira_admin_2026</code></p>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-zakhira-gold text-white py-3.5 rounded font-semibold text-xs tracking-widest uppercase hover:bg-opacity-90 transition shadow-md disabled:opacity-50 mt-2 flex items-center justify-center gap-2"
          >
            {isSubmitting ? 'Creating Account...' : isAdminRegister ? 'Register Admin Account' : 'Register Account'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 border-t border-gray-100 pt-6 text-center text-xs text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-zakhira-gold font-bold hover:underline">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
