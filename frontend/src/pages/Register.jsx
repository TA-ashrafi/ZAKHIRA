import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Please fill in all required fields');
      return;
    }

    const res = await register(formData);
    if (res.success) {
      navigate('/');
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center p-4 bg-[#0D0D0D] overflow-hidden">
      {/* Background wallpaper overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25 filter blur-sm scale-105" 
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1600')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/80 to-transparent" />

      {/* Compact Card Container */}
      <div className="relative z-10 w-full max-w-md bg-[#141414]/90 border border-[#C9A86C]/40 rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-xl space-y-5">
        <div className="text-center space-y-1">
          <span className="text-[10px] font-bold text-[#C9A86C] tracking-[0.3em] uppercase">PRIVILEGED MEMBERSHIP</span>
          <h1 className="text-2xl font-playfair font-bold text-white">Join ZAKHIRA</h1>
          <p className="text-gray-400 text-xs">Create your private account to unlock exclusive bridal concierge</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block text-gray-300 font-semibold mb-1">Full Name *</label>
            <div className="relative">
              <User className="w-4 h-4 text-[#C9A86C] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Royal Patron Name"
                className="w-full pl-9 pr-3 py-2.5 bg-[#0D0D0D] border border-gray-700 text-white rounded-xl focus:outline-none focus:border-[#C9A86C]"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">Email Address *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#C9A86C] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="patron@domain.com"
                className="w-full pl-9 pr-3 py-2.5 bg-[#0D0D0D] border border-gray-700 text-white rounded-xl focus:outline-none focus:border-[#C9A86C]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-300 font-semibold mb-1">Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#C9A86C] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 bg-[#0D0D0D] border border-gray-700 text-white rounded-xl focus:outline-none focus:border-[#C9A86C]"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-1">Phone Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#C9A86C] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                  className="w-full pl-9 pr-3 py-2.5 bg-[#0D0D0D] border border-gray-700 text-white rounded-xl focus:outline-none focus:border-[#C9A86C]"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C9A86C] text-black font-bold py-3 rounded-xl uppercase tracking-widest hover:bg-[#b8975b] transition flex items-center justify-center gap-2 cursor-pointer shadow-lg mt-2"
          >
            {loading ? 'Creating Account...' : 'Register Account'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 border-t border-white/10 text-center space-y-2">
          <p className="text-xs text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-[#C9A86C] font-bold hover:underline">
              Sign In Here
            </Link>
          </p>
          <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-500">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C9A86C]" />
            <span>Encrypted 256-Bit SSL Data Protection</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
