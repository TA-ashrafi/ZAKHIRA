import { useState, useEffect } from 'react';
import { Mail, Calendar, CheckCircle2, RefreshCw } from 'lucide-react';
import api from '../../services/api';
import Loader from '../../components/common/Loader';
import toast from 'react-hot-toast';

const AdminSubscribers = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/subscribers');
      if (res.data && res.data.success) {
        setSubscribers(res.data.data || []);
      }
    } catch (err) {
      toast.error('Failed to load subscribers list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  return (
    <div className="space-y-6 text-[#F8F6F1]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#141414] p-6 rounded-2xl border border-[#C9A86C]/30 shadow-xl">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-white">Newsletter Subscribers</h1>
          <p className="text-gray-400 text-xs mt-1">View all patrons subscribed via Stay Connected form</p>
        </div>

        <button
          onClick={fetchSubscribers}
          className="bg-[#C9A86C] text-black px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#b8975b] transition flex items-center gap-2 shadow cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" /> Refresh List
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="bg-[#141414] rounded-2xl border border-white/10 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#0D0D0D] text-gray-400 uppercase font-semibold text-[10px] tracking-wider border-b border-white/10">
                <tr>
                  <th className="px-5 py-4">#</th>
                  <th className="px-5 py-4">Email Address</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Subscribed Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {subscribers.map((sub, idx) => (
                  <tr key={sub._id || idx} className="hover:bg-white/5 transition">
                    <td className="px-5 py-4 font-mono text-gray-400 text-xs">{idx + 1}</td>
                    <td className="px-5 py-4 font-semibold text-[#C9A86C] text-sm flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      {sub.email}
                    </td>
                    <td className="px-5 py-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> {sub.status || 'Active'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-400 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gray-500" />
                      {new Date(sub.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {subscribers.length === 0 && (
            <div className="p-12 text-center text-gray-400">
              <Mail className="w-12 h-12 mx-auto mb-3 text-[#C9A86C] opacity-50" />
              <p className="text-sm font-medium text-gray-300">No newsletter subscribers recorded yet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminSubscribers;
