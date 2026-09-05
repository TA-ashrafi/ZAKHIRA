import { useState, useEffect } from 'react';
import { User, Package, MapPin, Phone, Mail, Edit3, Save, X } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import orderService from '../services/order.service';
import OrderCard from '../components/user/OrderCard';
import Loader from '../components/common/Loader';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    pincode: user?.address?.pincode || '',
    country: user?.address?.country || 'India',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        street: user.address?.street || '',
        city: user.address?.city || '',
        state: user.address?.state || '',
        pincode: user.address?.pincode || '',
        country: user.address?.country || 'India',
      });
    }

    const fetchOrders = async () => {
      setLoadingOrders(true);
      try {
        const res = await orderService.getOrders();
        if (res.success && res.data) {
          setOrders(res.data);
        }
      } catch (err) {
        console.error('Failed to load user orders', err);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      phone: formData.phone,
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        country: formData.country,
      },
    };

    const res = await updateProfile(payload);
    if (res.success) {
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-[#0D0D0D] text-white min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-playfair font-bold text-white mb-8">
          My Account & Orders
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Profile Details */}
          <div className="lg:col-span-1">
            <div className="bg-[#141414] p-6 rounded-xl border border-[#C9A86C]/30 shadow-2xl sticky top-24">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#C9A86C]/20 border border-[#C9A86C] text-[#C9A86C] rounded-full flex items-center justify-center font-bold text-lg uppercase">
                    {user?.name ? user.name[0] : 'U'}
                  </div>
                  <div>
                    <h3 className="font-playfair font-bold text-base text-white">{user?.name}</h3>
                    <span className="text-xs text-[#C9A86C] uppercase font-semibold">{user?.role || 'Valued Member'}</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="p-2 text-[#C9A86C] hover:bg-white/5 rounded-full transition cursor-pointer"
                  title={isEditing ? 'Cancel' : 'Edit Profile'}
                >
                  {isEditing ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                </button>
              </div>

              {!isEditing ? (
                <div className="space-y-3 text-xs text-gray-300">
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-[#C9A86C] flex-shrink-0" />
                    <span>{user?.email}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#C9A86C] flex-shrink-0" />
                    <span>{user?.phone || 'No phone number added'}</span>
                  </div>
                  <div className="flex items-start gap-2.5 border-t border-white/10 pt-3">
                    <MapPin className="w-4 h-4 text-[#C9A86C] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white block mb-0.5">Primary Shipping Address</span>
                      {user?.address?.street ? (
                        <span>
                          {user.address.street}, {user.address.city}, {user.address.state} - {user.address.pincode}
                        </span>
                      ) : (
                        <span className="text-gray-400">No address saved yet.</span>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-gray-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 bg-[#1A1A1A] border border-gray-700 rounded text-white focus:outline-none focus:border-[#C9A86C]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-300 mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-[#1A1A1A] border border-gray-700 rounded text-white focus:outline-none focus:border-[#C9A86C]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-300 mb-1">Street</label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-[#1A1A1A] border border-gray-700 rounded text-white focus:outline-none focus:border-[#C9A86C]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-semibold text-gray-300 mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-[#1A1A1A] border border-gray-700 rounded text-white focus:outline-none focus:border-[#C9A86C]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-gray-300 mb-1">Pincode</label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-[#1A1A1A] border border-gray-700 rounded text-white focus:outline-none focus:border-[#C9A86C]"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#C9A86C] text-black py-2.5 rounded font-bold uppercase text-xs hover:bg-[#b8975b] transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" /> Save Changes
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Order History */}
          <div className="lg:col-span-2">
            <h2 className="font-playfair font-bold text-xl text-white mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-[#C9A86C]" />
              Order History ({orders.length})
            </h2>

            {loadingOrders ? (
              <Loader />
            ) : orders.length > 0 ? (
              orders.map((order) => (
                <OrderCard 
                  key={order._id} 
                  order={order} 
                  onOrderUpdated={async () => {
                    const res = await orderService.getOrders();
                    if (res.success && res.data) setOrders(res.data);
                  }} 
                />
              ))
            ) : (
              <div className="bg-[#141414] p-12 rounded-xl border border-white/10 text-center">
                <Package className="w-12 h-12 text-[#C9A86C] mx-auto mb-3 opacity-50" />
                <h3 className="font-playfair text-lg font-bold text-white mb-1">No Orders Placed Yet</h3>
                <p className="text-gray-400 text-xs mb-6">Explore our jewellery catalog and place your first order!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
