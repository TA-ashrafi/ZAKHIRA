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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-playfair font-bold text-zakhira-dark">Registered Users</h1>
        <p className="text-gray-500 text-xs mt-1">Directory of registered patrons and administrative personnel</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-3 max-w-md">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search user name, email, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-xs focus:outline-none"
        />
      </div>

      {/* Users Table */}
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-gray-50 text-gray-500 uppercase font-semibold text-[10px] tracking-wider">
                <tr>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Joined Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((u) => (
                  <tr key={u._id} className="hover:bg-gray-50/50 transition">
                    <td className="px-4 py-3 font-semibold text-gray-900">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-zakhira-gold/20 text-zakhira-gold rounded-full flex items-center justify-center font-bold text-xs uppercase">
                          {u.name ? u.name[0] : 'U'}
                        </div>
                        <span>{u.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{u.email}</td>
                    <td className="px-4 py-3 text-gray-600">{u.phone || 'N/A'}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        u.role === 'admin' ? 'bg-purple-100 text-purple-800 border border-purple-200' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {u.role === 'admin' ? '👑 Admin' : 'Customer'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="p-8 text-center text-gray-400">
              <Users className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p>No users found matching query.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
