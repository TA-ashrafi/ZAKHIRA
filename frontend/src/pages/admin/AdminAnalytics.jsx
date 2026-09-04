import { useState, useEffect } from 'react';
import { 
  BarChart2, 
  TrendingUp, 
  ShoppingBag, 
  AlertTriangle, 
  PieChart, 
  Award,
  Crown,
  DollarSign
} from 'lucide-react';
import productService from '../../services/product.service';
import orderService from '../../services/order.service';
import Loader from '../../components/common/Loader';

const AdminAnalytics = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      setLoading(true);
      try {
        const [prodRes, orderRes] = await Promise.all([
          productService.getProducts().catch(() => ({ success: false, data: [] })),
          orderService.getAllOrders().catch(() => ({ success: false, data: [] }))
        ]);

        if (prodRes && prodRes.data) {
          setProducts(Array.isArray(prodRes.data) ? prodRes.data : []);
        } else if (Array.isArray(prodRes)) {
          setProducts(prodRes);
        }

        if (orderRes && orderRes.data) {
          setOrders(Array.isArray(orderRes.data) ? orderRes.data : []);
        } else if (Array.isArray(orderRes)) {
          setOrders(orderRes);
        }
      } catch (err) {
        // Fallback gracefully
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  // Compute key analytics metrics
  const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || order.totalPrice || 0), 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

  // Category breakdown
  const categoryStats = products.reduce((acc, p) => {
    const cat = p.category || 'Uncategorized';
    if (!acc[cat]) {
      acc[cat] = { count: 0, totalStock: 0, totalValue: 0 };
    }
    acc[cat].count += 1;
    acc[cat].totalStock += (p.stockQuantity || 0);
    acc[cat].totalValue += (p.price || 0) * (p.stockQuantity || 1);
    return acc;
  }, {});

  const categoryList = Object.keys(categoryStats).map(cat => ({
    name: cat,
    ...categoryStats[cat]
  })).sort((a, b) => b.totalValue - a.totalValue);

  // Total Catalog Worth
  const totalCatalogValue = products.reduce((sum, p) => sum + ((p.price || 0) * (p.stockQuantity || 1)), 0);

  // Low stock products
  const lowStockItems = products.filter(p => (p.stockQuantity || 0) <= 3);

  // Top Products by Price / Popularity
  const topProducts = [...products].sort((a, b) => (b.price || 0) - (a.price || 0)).slice(0, 5);

  if (loading) return <Loader />;

  return (
    <div className="space-y-8 text-[#F8F6F1]">
      {/* Header Banner */}
      <div className="bg-[#141414] p-6 md:p-8 rounded-2xl border border-[#C9A86C]/30 shadow-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BarChart2 className="w-6 h-6 text-[#C9A86C]" />
            <span className="text-xs font-bold text-[#C9A86C] tracking-[0.2em] uppercase">STORE INTELLIGENCE</span>
          </div>
          <h1 className="text-3xl font-playfair font-bold text-white mt-1">Analytics Dashboard</h1>
          <p className="text-gray-400 text-xs mt-1">Real-time revenue performance, category breakdown, and stock health</p>
        </div>

        <div className="bg-[#1A1A1A] border border-[#C9A86C]/30 px-5 py-3 rounded-xl text-right">
          <span className="text-[10px] text-gray-400 uppercase tracking-widest block">Total Revenue</span>
          <span className="font-playfair font-bold text-2xl text-[#C9A86C]">₹{totalRevenue.toLocaleString()}</span>
        </div>
      </div>

      {/* Top 4 Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#141414] p-6 rounded-2xl border border-[#C9A86C]/20 shadow-xl relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Total Sales Revenue</p>
              <h3 className="text-2xl font-playfair font-bold text-[#C9A86C] mt-2">₹{totalRevenue.toLocaleString()}</h3>
            </div>
            <div className="p-3 bg-[#C9A86C]/10 rounded-xl text-[#C9A86C] border border-[#C9A86C]/30">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <p className="text-[11px] text-emerald-400 mt-4 flex items-center gap-1 font-medium">
            ↑ Active revenue generated from verified orders
          </p>
        </div>

        <div className="bg-[#141414] p-6 rounded-2xl border border-[#C9A86C]/20 shadow-xl relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Total Orders Processed</p>
              <h3 className="text-2xl font-playfair font-bold text-white mt-2">{totalOrders}</h3>
            </div>
            <div className="p-3 bg-sky-500/10 rounded-xl text-sky-400 border border-sky-500/30">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>
          <p className="text-[11px] text-gray-400 mt-4 font-medium">
            Avg Order Value: <span className="text-[#C9A86C] font-bold">₹{avgOrderValue.toLocaleString()}</span>
          </p>
        </div>

        <div className="bg-[#141414] p-6 rounded-2xl border border-[#C9A86C]/20 shadow-xl relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Catalog Inventory Worth</p>
              <h3 className="text-2xl font-playfair font-bold text-white mt-2">₹{totalCatalogValue.toLocaleString()}</h3>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400 border border-purple-500/30">
              <PieChart className="w-6 h-6" />
            </div>
          </div>
          <p className="text-[11px] text-gray-400 mt-4 font-medium">
            Total Items in Vault: <span className="text-white font-bold">{products.length}</span>
          </p>
        </div>

        <div className="bg-[#141414] p-6 rounded-2xl border border-[#C9A86C]/20 shadow-xl relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Stock Alert Status</p>
              <h3 className="text-2xl font-playfair font-bold text-amber-400 mt-2">{lowStockItems.length} Items</h3>
            </div>
            <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400 border border-amber-500/30">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
          <p className="text-[11px] text-amber-300 mt-4 font-medium">
            Requires restocking attention (Stock ≤ 3)
          </p>
        </div>
      </div>

      {/* Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category Performance */}
        <div className="bg-[#141414] p-6 md:p-8 rounded-2xl border border-[#C9A86C]/30 shadow-xl space-y-6">
          <div className="flex justify-between items-center border-b border-white/10 pb-4">
            <div>
              <h2 className="text-xl font-playfair font-bold text-white">Sales & Value by Category</h2>
              <p className="text-xs text-gray-400 mt-0.5">Which jewellery category drives the highest sales</p>
            </div>
            <span className="text-xs text-[#C9A86C] font-bold uppercase tracking-wider">{categoryList.length} Categories</span>
          </div>

          <div className="space-y-4">
            {categoryList.map((cat, idx) => {
              const percent = totalCatalogValue > 0 ? Math.round((cat.totalValue / totalCatalogValue) * 100) : 0;
              return (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-white flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#C9A86C]" />
                      {cat.name}
                    </span>
                    <span className="text-[#C9A86C] font-mono">
                      ₹{cat.totalValue.toLocaleString()} ({percent}%)
                    </span>
                  </div>
                  <div className="h-2.5 w-full bg-[#1A1A1A] rounded-full overflow-hidden border border-white/5">
                    <div 
                      className="h-full bg-gradient-to-r from-[#C9A86C] to-[#E2C792] rounded-full transition-all duration-500" 
                      style={{ width: `${Math.max(percent, 8)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-400">
                    <span>{cat.count} Product Variations</span>
                    <span>{cat.totalStock} Units in Stock</span>
                  </div>
                </div>
              );
            })}

            {categoryList.length === 0 && (
              <p className="text-xs text-gray-400 text-center py-6">No category metrics available yet.</p>
            )}
          </div>
        </div>

        {/* Top Loved & Highest Value Products */}
        <div className="bg-[#141414] p-6 md:p-8 rounded-2xl border border-[#C9A86C]/30 shadow-xl space-y-6">
          <div className="flex justify-between items-center border-b border-white/10 pb-4">
            <div>
              <h2 className="text-xl font-playfair font-bold text-white">Top Loved & Premium Items</h2>
              <p className="text-xs text-gray-400 mt-0.5">Most valued jewellery pieces in the vault</p>
            </div>
            <Award className="w-5 h-5 text-[#C9A86C]" />
          </div>

          <div className="space-y-4">
            {topProducts.map((p, i) => (
              <div key={p._id || i} className="flex items-center justify-between p-3.5 bg-[#1A1A1A] rounded-xl border border-white/5 hover:border-[#C9A86C]/40 transition">
                <div className="flex items-center gap-3">
                  <span className="font-playfair font-bold text-sm text-[#C9A86C] w-5 text-center">#{i + 1}</span>
                  <img 
                    src={(p.images && p.images[0]) || 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800'} 
                    alt={p.name} 
                    className="w-10 h-10 object-cover rounded-lg bg-black border border-[#C9A86C]/30 flex-shrink-0"
                  />
                  <div>
                    <h4 className="font-semibold text-xs text-white line-clamp-1">{p.name}</h4>
                    <p className="text-[10px] text-gray-400">{p.category} • {p.goldPurity || '22K'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-xs text-[#C9A86C] block">₹{p.price?.toLocaleString()}</span>
                  <span className="text-[10px] text-emerald-400">{p.stockQuantity || 0} Available</span>
                </div>
              </div>
            ))}

            {topProducts.length === 0 && (
              <p className="text-xs text-gray-400 text-center py-6">No products available in database.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
