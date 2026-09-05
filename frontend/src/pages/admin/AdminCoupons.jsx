import { useState, useEffect } from 'react';
import { Tag, Plus, Trash2, Percent, CheckCircle2, Search } from 'lucide-react';
import couponService from '../../services/coupon.service';
import Loader from '../../components/common/Loader';
import toast from 'react-hot-toast';

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    code: '',
    discountPercentage: '',
    minPurchase: '',
    expiryType: 'NONE',
    expiryValue: '',
  });

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const res = await couponService.getCoupons();
      if (res.success && res.data) {
        setCoupons(res.data);
      }
    } catch (err) {
      toast.error('Failed to load coupons');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await couponService.createCoupon(formData);
      if (res.success) {
        toast.success('Coupon created successfully!');
        setFormData({ code: '', discountPercentage: '', minPurchase: '', expiryType: 'NONE', expiryValue: '' });
        fetchCoupons();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create coupon');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, code) => {
    if (window.confirm(`Delete coupon code "${code}"?`)) {
      try {
        const res = await couponService.deleteCoupon(id);
        if (res.success) {
          toast.success('Coupon deleted');
          setCoupons((prev) => prev.filter((c) => c._id !== id));
        }
      } catch (err) {
        toast.error('Failed to delete coupon');
      }
    }
  };

  return (
    <div className="space-y-8 text-[#F8F6F1]">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-playfair font-bold text-white">Manage Coupons & Promo Codes</h1>
        <p className="text-gray-400 text-xs mt-1">Create and manage discount codes for marketing campaigns</p>
      </div>

      {/* Create Coupon Form */}
      <div className="bg-[#141414] p-6 rounded-xl border border-[#C9A86C]/30 shadow-lg">
        <h2 className="font-playfair font-bold text-lg text-white mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
          <Tag className="w-5 h-5 text-[#C9A86C]" />
          Create New Discount Coupon
        </h2>

        <form onSubmit={handleCreate} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-gray-300 mb-1">Coupon Code *</label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                required
                placeholder="e.g. FESTIVE20"
                className="w-full px-3 py-2 border border-white/10 rounded uppercase bg-[#0D0D0D] text-white focus:outline-none focus:border-[#C9A86C]"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-300 mb-1">Discount % *</label>
              <input
                type="number"
                name="discountPercentage"
                value={formData.discountPercentage}
                onChange={handleChange}
                required
                min="1"
                max="100"
                placeholder="15"
                className="w-full px-3 py-2 border border-white/10 rounded bg-[#0D0D0D] text-white focus:outline-none focus:border-[#C9A86C]"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-300 mb-1">Min Purchase Amount (₹)</label>
              <input
                type="number"
                name="minPurchase"
                value={formData.minPurchase}
                onChange={handleChange}
                min="0"
                placeholder="999"
                className="w-full px-3 py-2 border border-white/10 rounded bg-[#0D0D0D] text-white focus:outline-none focus:border-[#C9A86C]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end pt-2 border-t border-white/10">
            <div>
              <label className="block font-semibold text-[#C9A86C] mb-1">Expiry Rule Type</label>
              <select
                name="expiryType"
                value={formData.expiryType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-white/10 rounded bg-[#0D0D0D] text-white focus:outline-none focus:border-[#C9A86C]"
              >
                <option value="NONE">No Expiry (Always Active)</option>
                <option value="TIME">TIME (Valid for X Hours)</option>
                <option value="DAY">DAY (Valid for X Days)</option>
                <option value="DATE">DATE (Specific Expiry Date)</option>
                <option value="USED">USED (Limit Total Redemptions)</option>
              </select>
            </div>

            <div>
              {formData.expiryType === 'TIME' && (
                <div>
                  <label className="block font-semibold text-gray-300 mb-1">Validity (Hours)</label>
                  <input
                    type="number"
                    name="expiryValue"
                    value={formData.expiryValue}
                    onChange={handleChange}
                    placeholder="e.g. 24"
                    required
                    className="w-full px-3 py-2 border border-white/10 rounded bg-[#0D0D0D] text-white focus:outline-none focus:border-[#C9A86C]"
                  />
                </div>
              )}

              {formData.expiryType === 'DAY' && (
                <div>
                  <label className="block font-semibold text-gray-300 mb-1">Validity (Days)</label>
                  <input
                    type="number"
                    name="expiryValue"
                    value={formData.expiryValue}
                    onChange={handleChange}
                    placeholder="e.g. 7"
                    required
                    className="w-full px-3 py-2 border border-white/10 rounded bg-[#0D0D0D] text-white focus:outline-none focus:border-[#C9A86C]"
                  />
                </div>
              )}

              {formData.expiryType === 'DATE' && (
                <div>
                  <label className="block font-semibold text-gray-300 mb-1">Expiry Date</label>
                  <input
                    type="date"
                    name="expiryValue"
                    value={formData.expiryValue}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-white/10 rounded bg-[#0D0D0D] text-white focus:outline-none focus:border-[#C9A86C]"
                  />
                </div>
              )}

              {formData.expiryType === 'USED' && (
                <div>
                  <label className="block font-semibold text-gray-300 mb-1">Max Times Usable</label>
                  <input
                    type="number"
                    name="expiryValue"
                    value={formData.expiryValue}
                    onChange={handleChange}
                    placeholder="e.g. 50"
                    required
                    className="w-full px-3 py-2 border border-white/10 rounded bg-[#0D0D0D] text-white focus:outline-none focus:border-[#C9A86C]"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="bg-[#C9A86C] text-black py-2.5 rounded font-bold uppercase text-xs hover:bg-[#b8975b] transition flex items-center justify-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" /> {submitting ? 'Creating...' : 'Create Coupon'}
            </button>
          </div>
        </form>
      </div>

      {/* Coupons Table */}
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-[#141414] rounded-xl border border-white/10 shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#0D0D0D] text-gray-400 uppercase font-semibold text-[10px] tracking-wider border-b border-white/10">
                <tr>
                  <th className="px-4 py-3">Code</th>
                  <th className="px-4 py-3">Discount</th>
                  <th className="px-4 py-3">Min Purchase</th>
                  <th className="px-4 py-3">Expiry Rule</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {coupons.map((c) => (
                  <tr key={c._id} className="hover:bg-white/5 transition">
                    <td className="px-4 py-3 font-mono font-bold text-[#C9A86C] text-sm uppercase">
                      {c.code}
                    </td>
                    <td className="px-4 py-3 font-semibold text-white">
                      {c.discountPercentage}% OFF
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      {c.minPurchase > 0 ? `₹${c.minPurchase}` : 'No Minimum'}
                    </td>
                    <td className="px-4 py-3 text-gray-300 font-mono">
                      {c.expiryType === 'USED' ? `Max ${c.maxUses} uses (${c.usedCount} used)` :
                       c.expiresAt ? new Date(c.expiresAt).toLocaleDateString() : 'Never Expires'}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        Active
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleDelete(c._id, c.code)}
                        className="p-1.5 text-rose-400 hover:bg-rose-500/20 rounded transition"
                        title="Delete Coupon"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {coupons.length === 0 && (
            <div className="p-8 text-center text-gray-400">
              <Tag className="w-10 h-10 mx-auto mb-2 opacity-50 text-[#C9A86C]" />
              <p>No coupon codes created yet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminCoupons;
