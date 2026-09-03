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
    <div className="min-h-[85vh] flex items-center justify-center bg-[#0D0D0D] py-16 px-4">
      <div className="bg-[#141414] p-8 md:p-10 rounded-2xl shadow-2xl border border-[#C9A86C]/30 max-w-md w-full">
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C9A86C] block mb-1">
            JOIN THE CLUB
          </span>
          <h2 className="text-3xl font-playfair font-bold text-white">
            Create Account
          </h2>
          <p className="text-gray-400 text-xs mt-2">
            Register for a VIP membership and enjoy bespoke jewelry recommendations.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-gray-200 mb-1.5">Full Name *</label>
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Priya Sharma"
                className="w-full pl-10 pr-4 py-3 bg-[#1A1A1A] border border-gray-700 text-white rounded-lg focus:outline-none focus:border-[#C9A86C] focus:ring-1 focus:ring-[#C9A86C] placeholder-gray-500 font-medium text-sm transition"
              />
              <User className="w-4 h-4 text-[#C9A86C] absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-200 mb-1.5">Email Address *</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="priya@example.com"
                className="w-full pl-10 pr-4 py-3 bg-[#1A1A1A] border border-gray-700 text-white rounded-lg focus:outline-none focus:border-[#C9A86C] focus:ring-1 focus:ring-[#C9A86C] placeholder-gray-500 font-medium text-sm transition"
              />
              <Mail className="w-4 h-4 text-[#C9A86C] absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-200 mb-1.5">Password * (Min 6 chars)</label>
            <div className="relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-[#1A1A1A] border border-gray-700 text-white rounded-lg focus:outline-none focus:border-[#C9A86C] focus:ring-1 focus:ring-[#C9A86C] placeholder-gray-500 font-medium text-sm transition"
              />
              <Lock className="w-4 h-4 text-[#C9A86C] absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-200 mb-1.5">Phone Number</label>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 9876543210"
                className="w-full pl-10 pr-4 py-3 bg-[#1A1A1A] border border-gray-700 text-white rounded-lg focus:outline-none focus:border-[#C9A86C] focus:ring-1 focus:ring-[#C9A86C] placeholder-gray-500 font-medium text-sm transition"
              />
              <Phone className="w-4 h-4 text-[#C9A86C] absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Admin Role Toggle Option */}
          <div className="pt-2 border-t border-white/10">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-200">
              <input
                type="checkbox"
                checked={isAdminRegister}
                onChange={(e) => {
                  setIsAdminRegister(e.target.checked);
                  if (!e.target.checked) {
                    setFormData((prev) => ({ ...prev, adminSecret: '' }));
                  }
                }}
                className="rounded border-gray-700 bg-[#1A1A1A] text-[#C9A86C] focus:ring-[#C9A86C]"
              />
              <span className="flex items-center gap-1 text-gray-200">
                <Shield className="w-3.5 h-3.5 text-[#C9A86C]" /> Register as Administrator
              </span>
            </label>

            {isAdminRegister && (
              <div className="mt-3 bg-[#1A1A1A] p-3 rounded-lg border border-[#C9A86C]/40">
                <label className="block text-[11px] font-bold text-[#C9A86C] mb-1">
                  Admin Secret Key *
                </label>
                <input
                  type="password"
                  name="adminSecret"
                  value={formData.adminSecret}
                  onChange={handleChange}
                  placeholder="Enter administrator passcode"
                  required={isAdminRegister}
                  className="w-full px-3 py-2 border border-gray-700 rounded text-xs bg-[#0D0D0D] text-white focus:outline-none focus:border-[#C9A86C]"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#C9A86C] text-black py-3.5 rounded-lg font-bold text-xs tracking-widest uppercase hover:bg-[#b8975b] transition shadow-lg shadow-[#C9A86C]/10 disabled:opacity-50 mt-2 flex items-center justify-center gap-2"
          >
            {isSubmitting ? 'Creating Account...' : isAdminRegister ? 'Register Admin Account' : 'Register Account'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-[#C9A86C] font-bold hover:underline">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
