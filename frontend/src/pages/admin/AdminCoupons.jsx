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
        setFormData({ code: '', discountPercentage: '', minPurchase: '' });
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
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-playfair font-bold text-zakhira-dark">Manage Coupons & Promo Codes</h1>
        <p className="text-gray-500 text-xs mt-1">Create and manage discount codes for marketing campaigns</p>
      </div>

      {/* Create Coupon Form */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="font-playfair font-bold text-lg text-zakhira-dark mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
          <Tag className="w-5 h-5 text-zakhira-gold" />
          Create New Discount Coupon
        </h2>

        <form onSubmit={handleCreate} className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs items-end">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Coupon Code *</label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              required
              placeholder="e.g. FESTIVE20"
              className="w-full px-3 py-2 border border-gray-300 rounded uppercase focus:outline-none focus:ring-1 focus:ring-zakhira-gold"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Discount % *</label>
            <input
              type="number"
              name="discountPercentage"
              value={formData.discountPercentage}
              onChange={handleChange}
              required
              min="1"
              max="100"
              placeholder="15"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-zakhira-gold"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Min Purchase Amount (₹)</label>
            <input
              type="number"
              name="minPurchase"
              value={formData.minPurchase}
              onChange={handleChange}
              min="0"
              placeholder="999"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-zakhira-gold"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="bg-zakhira-gold text-white py-2.5 rounded font-semibold uppercase text-xs hover:bg-opacity-90 transition flex items-center justify-center gap-1.5 shadow"
          >
            <Plus className="w-4 h-4" /> {submitting ? 'Creating...' : 'Create Coupon'}
          </button>
        </form>
      </div>

      {/* Coupons Table */}
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-gray-50 text-gray-500 uppercase font-semibold text-[10px] tracking-wider">
                <tr>
                  <th className="px-4 py-3">Code</th>
                  <th className="px-4 py-3">Discount</th>
                  <th className="px-4 py-3">Min Purchase</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {coupons.map((c) => (
                  <tr key={c._id} className="hover:bg-gray-50/50 transition">
                    <td className="px-4 py-3 font-mono font-bold text-zakhira-gold text-sm uppercase">
                      {c.code}
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-900">
                      {c.discountPercentage}% OFF
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {c.minPurchase > 0 ? `₹${c.minPurchase}` : 'No Minimum'}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        Active
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleDelete(c._id, c.code)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded transition"
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
              <Tag className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p>No coupon codes created yet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminCoupons;
