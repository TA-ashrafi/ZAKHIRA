import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit2, Trash2, Package } from 'lucide-react';
import productService from '../../services/product.service';
import Loader from '../../components/common/Loader';
import toast from 'react-hot-toast';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categoriesList = ['ALL', 'Necklace', 'Earring', 'Ring', 'Bracelet', 'Pendant', 'Anklet'];

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await productService.getProducts();
      if (res.success && res.data) {
        setProducts(res.data);
      } else if (Array.isArray(res)) {
        setProducts(res);
      }
    } catch (err) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        const res = await productService.deleteProduct(id);
        if (res.success) {
          toast.success('Product deleted successfully!');
          setProducts((prev) => prev.filter((p) => p._id !== id));
        }
      } catch (err) {
        toast.error('Failed to delete product');
      }
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || p.category?.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#141414] p-6 rounded-2xl border border-[#C9A86C]/30 shadow-lg">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-[#F8F6F1]">Manage Products</h1>
          <p className="text-gray-400 text-xs mt-1">View, edit, or remove luxury jewellery catalog items</p>
        </div>

        <Link
          to="/admin/add-product"
          className="bg-[#C9A86C] text-black px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#b8975b] transition flex items-center gap-1.5 shadow-md"
        >
          <Plus className="w-4 h-4" /> Add New Product
        </Link>
      </div>

      {/* Search & Category Filter Tabs */}
      <div className="space-y-4">
        <div className="bg-[#141414] p-4 rounded-xl border border-[#C9A86C]/20 shadow-sm flex items-center gap-3 max-w-md">
          <Search className="w-4 h-4 text-[#C9A86C]" />
          <input
            type="text"
            placeholder="Search product name or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs focus:outline-none bg-transparent text-white placeholder-gray-500 font-medium"
          />
        </div>

        {/* Category Group Tabs */}
        <div className="flex flex-wrap gap-2 pt-1">
          {categoriesList.map((cat) => {
            const count = cat === 'ALL'
              ? products.length
              : products.filter(p => p.category?.toLowerCase() === cat.toLowerCase()).length;
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-[#C9A86C] text-black shadow-lg scale-105'
                    : 'bg-[#141414] text-gray-300 border border-white/10 hover:border-[#C9A86C]/50 hover:text-white'
                }`}
              >
                <span>{cat === 'ALL' ? 'All Products' : `${cat}s`}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                  isActive ? 'bg-black text-[#C9A86C]' : 'bg-white/10 text-gray-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Table */}
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-[#141414] rounded-2xl border border-[#C9A86C]/20 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-[#F8F6F1]">
              <thead className="bg-[#1A1A1A] text-[#C9A86C] uppercase font-bold text-[10px] tracking-wider border-b border-white/10">
                <tr>
                  <th className="px-5 py-4">Product</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">Price</th>
                  <th className="px-5 py-4">Gold Purity</th>
                  <th className="px-5 py-4">Stock</th>
                  <th className="px-5 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredProducts.map((p) => (
                  <tr key={p._id} className="hover:bg-white/5 transition">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={(p.images && p.images[0]) || 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800'}
                          alt={p.name}
                          className="w-11 h-11 object-cover rounded-lg bg-gray-900 border border-[#C9A86C]/30 flex-shrink-0"
                        />
                        <div>
                          <p className="font-semibold text-white text-sm line-clamp-1">{p.name}</p>
                          {(p.isFeatured || p.isBestSeller) && (
                            <span className="text-[9px] font-bold text-[#C9A86C] uppercase tracking-wider block mt-0.5">
                              ★ Featured Best Seller
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-medium text-gray-300">{p.category}</td>
                    <td className="px-5 py-4 font-bold text-[#C9A86C] text-sm">₹{p.price?.toLocaleString()}</td>
                    <td className="px-5 py-4 text-gray-300 font-medium">{p.goldPurity || 'N/A'}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        p.stockQuantity > 0 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}>
                        {p.stockQuantity > 0 ? `${p.stockQuantity} in stock` : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          to={`/admin/edit-product/${p._id}`}
                          className="p-2 text-sky-400 hover:bg-sky-500/10 rounded-lg transition border border-sky-500/30"
                          title="Edit Product"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(p._id, p.name)}
                          className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg transition border border-rose-500/30"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="p-12 text-center text-gray-400">
              <Package className="w-12 h-12 mx-auto mb-3 text-[#C9A86C] opacity-60" />
              <p className="text-sm font-medium text-gray-300">No products match your search query.</p>
              <p className="text-xs text-gray-500 mt-1">Try searching with a different keyword or category.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
