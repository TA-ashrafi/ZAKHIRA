import { useState, useEffect } from 'react';
import { Users, Search, ShieldCheck, User as UserIcon } from 'lucide-react';
import authService from '../../services/auth.service';
import Loader from '../../components/common/Loader';
import toast from 'react-hot-toast';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await authService.getUsers();
      if (res.success && res.data) {
        setUsers(res.data);
      }
    } catch (err) {
      toast.error('Failed to load registered users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.phone?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 text-[#F8F6F1]">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-playfair font-bold text-white">Registered Users</h1>
        <p className="text-gray-400 text-xs mt-1">Directory of registered patrons and administrative personnel</p>
      </div>

      {/* Search Bar */}
      <div className="bg-[#141414] p-4 rounded-xl border border-[#C9A86C]/30 shadow-md flex items-center gap-3 max-w-md">
        <Search className="w-4 h-4 text-[#C9A86C]" />
        <input
          type="text"
          placeholder="Search user name, email, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-xs focus:outline-none bg-transparent text-white placeholder-gray-500"
        />
      </div>

      {/* Users Table */}
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-[#141414] rounded-xl border border-white/10 shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#0D0D0D] text-gray-400 uppercase font-semibold text-[10px] tracking-wider border-b border-white/10">
                <tr>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Joined Date</th>
                  <th className="px-4 py-3 text-center">Action / Toggle Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredUsers.map((u) => (
                  <tr key={u._id} className="hover:bg-white/5 transition">
                    <td className="px-4 py-3 font-semibold text-white">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-[#C9A86C]/20 text-[#C9A86C] border border-[#C9A86C]/30 rounded-full flex items-center justify-center font-bold text-xs uppercase">
                          {u.name ? u.name[0] : 'U'}
                        </div>
                        <span>{u.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-300">{u.email}</td>
                    <td className="px-4 py-3 text-gray-300">{u.phone || 'N/A'}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        u.role === 'admin' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'bg-gray-800 text-gray-300 border border-gray-700'
                      }`}>
                        {u.role === 'admin' ? 'Admin' : 'Customer'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={async () => {
                          const newRole = u.role === 'admin' ? 'user' : 'admin';
                          if (window.confirm(`Change ${u.name}'s role to ${newRole.toUpperCase()}?`)) {
                            try {
                              const res = await authService.updateUserRole(u._id, newRole);
                              if (res.success) {
                                toast.success(res.message);
                                setUsers((prev) =>
                                  prev.map((item) => (item._id === u._id ? { ...item, role: newRole } : item))
                                );
                              }
                            } catch (err) {
                              toast.error('Failed to change user role');
                            }
                          }
                        }}
                        className={`px-3 py-1 rounded-lg text-[11px] font-bold transition ${
                          u.role === 'admin'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                            : 'bg-[#C9A86C] text-black hover:bg-[#b8975b]'
                        }`}
                      >
                        {u.role === 'admin' ? 'Demote to User' : 'Make Admin'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="p-8 text-center text-gray-400">
              <Users className="w-10 h-10 mx-auto mb-2 opacity-50 text-[#C9A86C]" />
              <p>No users found matching query.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
