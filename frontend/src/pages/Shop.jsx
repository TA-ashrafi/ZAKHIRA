import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Filter, Grid3x3, LayoutGrid } from 'lucide-react';

const dummyProducts = [
  { _id: '1', name: 'Solitaire Pendant Necklace', price: 12900, category: 'Necklace', rating: 4.9, image: 'https://placehold.co/300x300/C9A86C/white?text=PENDANT' },
  { _id: '2', name: 'Classic Hoop Earrings', price: 8900, category: 'Earring', rating: 4.8, image: 'https://placehold.co/300x300/C9A86C/white?text=HOOP' },
  { _id: '3', name: 'Dainty Stack Ring', price: 5900, category: 'Ring', rating: 4.7, image: 'https://placehold.co/300x300/C9A86C/white?text=RING' },
  { _id: '4', name: 'Tennis Bracelet', price: 14900, category: 'Bracelet', rating: 4.9, image: 'https://placehold.co/300x300/C9A86C/white?text=BRACELET' },
  { _id: '5', name: 'Infinity Knot Ring', price: 7900, category: 'Ring', rating: 4.6, image: 'https://placehold.co/300x300/C9A86C/white?text=KNOT' },
  { _id: '6', name: 'Pearl Drop Earrings', price: 9900, category: 'Earring', rating: 4.8, image: 'https://placehold.co/300x300/C9A86C/white?text=PEARL' },
  { _id: '7', name: 'Gold Chain Necklace', price: 4500, category: 'Necklace', rating: 4.5, image: 'https://placehold.co/300x300/C9A86C/white?text=CHAIN' },
  { _id: '8', name: 'Diamond Stud Earrings', price: 19900, category: 'Earring', rating: 4.9, image: 'https://placehold.co/300x300/C9A86C/white?text=STUD' },
];

const Shop = () => {
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const categories = ['All', 'Necklace', 'Earring', 'Ring', 'Bracelet', 'Pendant'];

  const filteredProducts = category === 'All' 
    ? dummyProducts 
    : dummyProducts.filter(p => p.category === category);

  return (
    <div className="bg-gray-50/30">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-playfair text-center">Our Collection</h1>
          <p className="text-center text-gray-500 text-sm mt-1">Discover our handcrafted jewellery pieces</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-1.5 text-sm rounded-full transition ${
                  category === cat
                    ? 'bg-zakhira-gold text-white'
                    : 'bg-white border hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 text-sm">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-zakhira-gold"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
            <button className="p-2 border rounded hover:bg-gray-100">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id} className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition">
              <div className="relative overflow-hidden aspect-square bg-gray-100">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <button className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/95 text-xs px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition hover:bg-zakhira-gold hover:text-white whitespace-nowrap">
                  Quick View
                </button>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-1 text-xs text-zakhira-gold mb-1">
                  <Star className="w-3 h-3 fill-current" />
                  <span>{product.rating}</span>
                </div>
                <h3 className="font-medium text-sm truncate">{product.name}</h3>
                <p className="text-xs text-gray-400 uppercase tracking-wider">{product.category}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-zakhira-gold font-bold">₹{product.price.toLocaleString()}</span>
                  <button 
                    className="text-xs border border-zakhira-gold text-zakhira-gold px-3 py-1 rounded hover:bg-zakhira-gold hover:text-white transition"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      alert('Added to cart!');
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No products */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;