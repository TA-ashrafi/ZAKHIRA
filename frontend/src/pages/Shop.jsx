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
    <div className="bg-gray-50/30 min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-zakhira-dark text-white py-12 px-4 border-b border-zakhira-gold/20">
        <div className="container mx-auto text-center max-w-2xl">
          <span className="text-zakhira-gold text-xs uppercase tracking-[0.3em] font-semibold block mb-2">
            FINE JEWELLERY COLLECTION
          </span>
          <h1 className="text-3xl md:text-5xl font-playfair font-bold">
            {selectedCategory === 'All' ? 'Complete Collection' : `${selectedCategory}s`}
          </h1>
          {searchQuery && (
            <p className="text-zakhira-gold text-sm mt-2">
              Search results for "{searchQuery}"
            </p>
          )}
          <p className="text-white/60 text-xs md:text-sm mt-2">
            Explore 100% hallmarked gold, diamond and gemstone jewellery crafted for perfection.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Category Navigation Bar */}
        <div className="flex items-center justify-between gap-4 overflow-x-auto pb-4 mb-6 border-b border-gray-200 scrollbar-none">
          <div className="flex items-center space-x-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-5 py-2 text-xs font-semibold rounded-full uppercase tracking-wider transition whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-zakhira-gold text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-zakhira-gold hover:text-zakhira-gold'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Filter and Sort Toolbar */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3 text-xs text-gray-600">
            <button
              onClick={() => setShowMobileFilter(!showMobileFilter)}
              className="flex items-center gap-2 border border-gray-200 px-3 py-2 rounded text-xs font-semibold hover:border-zakhira-gold hover:text-zakhira-gold transition"
            >
              <SlidersHorizontal className="w-4 h-4 text-zakhira-gold" />
              Price Filter
            </button>
            <span className="text-gray-400">|</span>
            <span>
              Showing <strong className="text-zakhira-dark">{products.length}</strong> products
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <label className="text-gray-500 font-medium">Sort By:</label>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="border border-gray-200 rounded px-3 py-2 bg-white text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-zakhira-gold text-zakhira-dark"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
            </select>
            {(searchQuery || selectedCategory !== 'All' || minPrice || maxPrice) && (
              <button
                onClick={handleClearFilters}
                className="text-xs text-red-600 hover:underline flex items-center gap-1 font-medium ml-2"
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
            className="bg-white p-4 rounded-lg border border-zakhira-gold/30 shadow-sm mb-8 flex flex-wrap items-center gap-4 text-xs animate-fadeIn"
          >
            <span className="font-semibold text-zakhira-dark">Filter by Price (₹):</span>
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="px-3 py-1.5 border rounded w-28 focus:outline-none focus:ring-1 focus:ring-zakhira-gold"
            />
            <span>to</span>
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="px-3 py-1.5 border rounded w-28 focus:outline-none focus:ring-1 focus:ring-zakhira-gold"
            />
            <button
              type="submit"
              className="bg-zakhira-gold text-white px-4 py-1.5 rounded font-semibold hover:bg-opacity-90 transition"
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
          <div className="bg-white rounded-lg p-12 text-center border border-gray-200 max-w-md mx-auto my-12">
            <Filter className="w-12 h-12 text-zakhira-gold mx-auto mb-3 opacity-60" />
            <h3 className="font-playfair text-xl font-bold text-gray-800 mb-1">
              No Jewellery Found
            </h3>
            <p className="text-gray-500 text-xs mb-6">
              We couldn't find any products matching your selected criteria. Try adjusting your filter parameters.
            </p>
            <button
              onClick={handleClearFilters}
              className="bg-zakhira-gold text-white px-6 py-2.5 rounded text-xs font-semibold uppercase tracking-wider hover:bg-opacity-90 transition"
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
