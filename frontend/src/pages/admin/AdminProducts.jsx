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

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await productService.getProducts();
      if (res.success && res.data) {
        setProducts(res.data);
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

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-zakhira-dark">Manage Products</h1>
          <p className="text-gray-500 text-xs mt-1">View, edit, or remove jewellery catalog items</p>
        </div>

        <Link
          to="/admin/add-product"
          className="bg-zakhira-gold text-white px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-opacity-90 transition flex items-center gap-1.5 shadow-md"
        >
          <Plus className="w-4 h-4" /> Add New Product
        </Link>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-3 max-w-md">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search product name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-xs focus:outline-none"
        />
      </div>

      {/* Product Table */}
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-gray-50 text-gray-500 uppercase font-semibold text-[10px] tracking-wider">
                <tr>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Gold Purity</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProducts.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-50/50 transition">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={(p.images && p.images[0]) || 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800'}
                          alt={p.name}
                          className="w-10 h-10 object-cover rounded bg-gray-100 flex-shrink-0"
                        />
                        <div>
                          <p className="font-semibold text-gray-900 line-clamp-1">{p.name}</p>
                          {p.isFeatured && (
                            <span className="text-[9px] font-bold text-zakhira-gold uppercase tracking-wider">★ Featured</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-600">{p.category}</td>
                    <td className="px-4 py-3 font-bold text-zakhira-gold">₹{p.price?.toLocaleString()}</td>
                    <td className="px-4 py-3 text-gray-600">{p.goldPurity || 'N/A'}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        p.stockQuantity > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {p.stockQuantity > 0 ? `${p.stockQuantity} in stock` : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          to={`/admin/edit-product/${p._id}`}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition"
                          title="Edit Product"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(p._id, p.name)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded transition"
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
            <div className="p-8 text-center text-gray-400">
              <Package className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p>No products match your search query.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
