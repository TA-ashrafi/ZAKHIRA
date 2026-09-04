import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Search, RefreshCw } from 'lucide-react';
import { productsData } from '../data/products';
import productService from '../services/product.service';
import ProductCard from '../components/user/ProductCard';
import Loader from '../components/common/Loader';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const selectedCategory = searchParams.get('category') || 'All';
  const searchQuery = searchParams.get('search') || '';
  const sortBy = searchParams.get('sort') || 'featured';

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const categories = ['All', 'Necklace', 'Earring', 'Ring', 'Bracelet', 'Pendant', 'Anklet'];

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {};
      if (selectedCategory !== 'All') params.category = selectedCategory;
      if (searchQuery) params.search = searchQuery;
      if (sortBy) params.sort = sortBy;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;

      const res = await productService.getProducts(params);
      if (res.success && res.data) {
        setProducts(res.data);
      } else {
        setProducts(filterLocalProducts());
      }
    } catch (err) {
      setProducts(filterLocalProducts());
    } finally {
      setLoading(false);
    }
  };

  const filterLocalProducts = () => {
    let filtered = [...productsData];

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (minPrice) {
      filtered = filtered.filter((p) => p.price >= Number(minPrice));
    }

    if (maxPrice) {
      filtered = filtered.filter((p) => p.price <= Number(maxPrice));
    }

    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'featured') {
      filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return filtered;
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchQuery, sortBy]);

  const handleCategoryChange = (cat) => {
    const params = new URLSearchParams(searchParams);
    if (cat === 'All') {
      params.delete('category');
    } else {
      params.set('category', cat);
    }
    setSearchParams(params);
  };

  const handleSortChange = (e) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', e.target.value);
    setSearchParams(params);
  };

  const handleApplyPriceFilter = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  const handleClearFilters = () => {
    setMinPrice('');
    setMaxPrice('');
    setSearchParams({});
  };

  return (
    <div className="bg-[#0D0D0D] text-[#F8F6F1] min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-[#1A0306] via-[#141414] to-[#0D0D0D] text-white py-14 px-4 border-b border-[#C9A86C]/20">
        <div className="container mx-auto text-center max-w-2xl">
          <span className="text-[#C9A86C] text-xs uppercase tracking-[0.3em] font-semibold block mb-2">
            FINE JEWELLERY COLLECTION
          </span>
          <h1 className="text-3xl md:text-5xl font-playfair font-bold text-white">
            {selectedCategory === 'All' ? 'Complete Collection' : `${selectedCategory}s`}
          </h1>
          {searchQuery && (
            <p className="text-[#C9A86C] text-sm mt-2">
              Search results for "{searchQuery}"
            </p>
          )}
          <p className="text-gray-400 text-xs md:text-sm mt-2 font-light">
            Explore 100% hallmarked gold, diamond and gemstone jewellery crafted for perfection.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Category Navigation Bar */}
        <div className="flex items-center justify-between gap-4 overflow-x-auto pb-4 mb-8 border-b border-white/10 scrollbar-none">
          <div className="flex items-center space-x-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-5 py-2.5 text-xs font-semibold rounded-full uppercase tracking-wider transition whitespace-nowrap border ${
                  selectedCategory === cat
                    ? 'bg-[#C9A86C] text-black border-[#C9A86C] shadow-lg shadow-[#C9A86C]/20 font-bold'
                    : 'bg-[#141414] text-gray-300 border-white/10 hover:border-[#C9A86C] hover:text-[#C9A86C]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Filter and Sort Toolbar */}
        <div className="bg-[#141414] p-4 rounded-xl shadow-lg border border-[#C9A86C]/20 flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3 text-xs text-gray-300">
            <button
              onClick={() => setShowMobileFilter(!showMobileFilter)}
              className="flex items-center gap-2 border border-[#C9A86C]/40 px-3.5 py-2 rounded-lg text-xs font-semibold hover:bg-[#C9A86C]/10 text-[#C9A86C] transition"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#C9A86C]" />
              Price Filter
            </button>
            <span className="text-gray-600">|</span>
            <span>
              Showing <strong className="text-[#C9A86C] font-bold">{products.length}</strong> products
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <label className="text-gray-400 font-medium">Sort By:</label>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="border border-[#C9A86C]/30 rounded-lg px-3 py-2 bg-[#0D0D0D] text-xs font-semibold focus:outline-none focus:border-[#C9A86C] text-white"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
            </select>
            {(searchQuery || selectedCategory !== 'All' || minPrice || maxPrice) && (
              <button
                onClick={handleClearFilters}
                className="text-xs text-red-400 hover:underline flex items-center gap-1 font-medium ml-2"
              >
                <RefreshCw className="w-3 h-3" /> Reset
              </button>
            )}
          </div>
        </div>

        {/* Price Filter Drawer (Collapsible) */}
        {showMobileFilter && (
          <form
            onSubmit={handleApplyPriceFilter}
            className="bg-[#141414] p-4 rounded-xl border border-[#C9A86C]/30 shadow-md mb-8 flex flex-wrap items-center gap-4 text-xs animate-fadeIn"
          >
            <span className="font-semibold text-[#C9A86C]">Filter by Price (₹):</span>
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="px-3 py-2 border border-white/10 rounded-lg bg-[#0D0D0D] text-white w-28 focus:outline-none focus:border-[#C9A86C]"
            />
            <span className="text-gray-400">to</span>
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="px-3 py-2 border border-white/10 rounded-lg bg-[#0D0D0D] text-white w-28 focus:outline-none focus:border-[#C9A86C]"
            />
            <button
              type="submit"
              className="bg-[#C9A86C] text-black px-5 py-2 rounded-lg font-bold hover:bg-[#b8975b] transition"
            >
              Apply
            </button>
          </form>
        )}

        {/* Product Grid */}
        {loading ? (
          <Loader />
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-[#141414] rounded-xl p-12 text-center border border-white/10 max-w-md mx-auto my-12 shadow-xl">
            <Filter className="w-12 h-12 text-[#C9A86C] mx-auto mb-3 opacity-80" />
            <h3 className="font-playfair text-xl font-bold text-white mb-1">
              No Jewellery Found
            </h3>
            <p className="text-gray-400 text-xs mb-6">
              We couldn't find any products matching your selected criteria. Try adjusting your filter parameters.
            </p>
            <button
              onClick={handleClearFilters}
              className="bg-[#C9A86C] text-black px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#b8975b] transition"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
