import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Upload, Save, X, Image as ImageIcon } from 'lucide-react';
import productService from '../../services/product.service';
import uploadService from '../../services/upload.service';
import Loader from '../../components/common/Loader';
import toast from 'react-hot-toast';

const AdminAddProduct = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    comparePrice: '',
    category: 'Necklace',
    goldPurity: '22K',
    stoneType: 'None',
    ringSize: '',
    weight: '',
    stockQuantity: 1,
    isFeatured: false,
    isBestSeller: false,
    images: [],
  });

  const [imageUrlInput, setImageUrlInput] = useState('');

  useEffect(() => {
    if (isEditMode) {
      const fetchProduct = async () => {
        setLoading(true);
        try {
          const res = await productService.getProductById(id);
          if (res.success && res.data) {
            setFormData({
              name: res.data.name || '',
              description: res.data.description || '',
              price: res.data.price || '',
              comparePrice: res.data.comparePrice || '',
              category: res.data.category || 'Necklace',
              goldPurity: res.data.goldPurity || '22K',
              stoneType: res.data.stoneType || 'None',
              ringSize: res.data.ringSize || '',
              weight: res.data.weight || '',
              stockQuantity: res.data.stockQuantity || 1,
              isFeatured: Boolean(res.data.isFeatured),
              isBestSeller: Boolean(res.data.isBestSeller),
              images: res.data.images || [],
            });
          }
        } catch (err) {
          toast.error('Failed to load product details');
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append('images', files[i]);
    }

    setUploadingImage(true);
    try {
      const res = await uploadService.uploadImage(data);
      if (res.success) {
        const uploadedUrls = Array.isArray(res.urls) ? res.urls : [res.url || res.data];
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, ...uploadedUrls],
        }));
        toast.success('Image(s) uploaded successfully!');
      }
    } catch (err) {
      toast.error('Image upload failed. You can add image URLs manually.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleAddImageUrl = (e) => {
    e.preventDefault();
    if (imageUrlInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, imageUrlInput.trim()],
      }));
      setImageUrlInput('');
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.images.length === 0) {
      toast.error('Please add at least one product image URL or upload an image.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        comparePrice: formData.comparePrice ? Number(formData.comparePrice) : undefined,
        ringSize: formData.ringSize ? Number(formData.ringSize) : undefined,
        weight: formData.weight ? Number(formData.weight) : undefined,
        stockQuantity: Number(formData.stockQuantity),
      };

      let res;
      if (isEditMode) {
        res = await productService.updateProduct(id, payload);
      } else {
        res = await productService.createProduct(payload);
      }

      if (res.success) {
        toast.success(isEditMode ? 'Product Updated!' : 'Product Created!');
        navigate('/admin/products');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/admin/products')}
          className="p-2 border border-gray-700 bg-[#141414] rounded-lg hover:bg-[#1A1A1A] transition text-white"
        >
          <ArrowLeft className="w-5 h-5 text-[#C9A86C]" />
        </button>
        <div>
          <h1 className="text-3xl font-playfair font-bold text-white">
            {isEditMode ? 'Edit Product' : 'Add New Product'}
          </h1>
          <p className="text-gray-400 text-xs mt-0.5">Fill in product attributes, placement, and pricing details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#141414] p-8 rounded-xl border border-[#C9A86C]/30 shadow-xl space-y-6 text-xs text-white">
        {/* Name & Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-200 mb-1">Product Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g. Royal Solitaire Pendant Necklace"
              className="w-full px-3 py-2.5 bg-[#1A1A1A] border border-gray-700 rounded text-white focus:outline-none focus:border-[#C9A86C]"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-200 mb-1">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2.5 bg-[#1A1A1A] border border-gray-700 rounded text-white focus:outline-none focus:border-[#C9A86C]"
            >
              <option value="Necklace">Necklace</option>
              <option value="Earring">Earring</option>
              <option value="Ring">Ring</option>
              <option value="Bracelet">Bracelet</option>
              <option value="Pendant">Pendant</option>
              <option value="Anklet">Anklet</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold text-gray-200 mb-1">Description *</label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Describe craftsmanship, gold specifications, stones, styling recommendations..."
            className="w-full px-3 py-2.5 bg-[#1A1A1A] border border-gray-700 rounded text-white focus:outline-none focus:border-[#C9A86C]"
          ></textarea>
        </div>

        {/* Prices & Stock */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-semibold text-gray-200 mb-1">Price (₹) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              placeholder="12900"
              className="w-full px-3 py-2.5 bg-[#1A1A1A] border border-gray-700 rounded text-white focus:outline-none focus:border-[#C9A86C]"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-200 mb-1">Original / Compare Price (₹)</label>
            <input
              type="number"
              name="comparePrice"
              value={formData.comparePrice}
              onChange={handleChange}
              min="0"
              placeholder="15900"
              className="w-full px-3 py-2.5 bg-[#1A1A1A] border border-gray-700 rounded text-white focus:outline-none focus:border-[#C9A86C]"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-200 mb-1">Stock Quantity *</label>
            <input
              type="number"
              name="stockQuantity"
              value={formData.stockQuantity}
              onChange={handleChange}
              required
              min="0"
              className="w-full px-3 py-2.5 bg-[#1A1A1A] border border-gray-700 rounded text-white focus:outline-none focus:border-[#C9A86C]"
            />
          </div>
        </div>

        {/* Specifications */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10">
          <div>
            <label className="block font-semibold text-gray-200 mb-1">Gold Purity</label>
            <select
              name="goldPurity"
              value={formData.goldPurity}
              onChange={handleChange}
              className="w-full px-3 py-2.5 bg-[#1A1A1A] border border-gray-700 rounded text-white focus:outline-none focus:border-[#C9A86C]"
            >
              <option value="18K">18K</option>
              <option value="22K">22K</option>
              <option value="24K">24K</option>
              <option value="Not Applicable">Not Applicable</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-200 mb-1">Stone Type</label>
            <select
              name="stoneType"
              value={formData.stoneType}
              onChange={handleChange}
              className="w-full px-3 py-2.5 bg-[#1A1A1A] border border-gray-700 rounded text-white focus:outline-none focus:border-[#C9A86C]"
            >
              <option value="None">None</option>
              <option value="Diamond">Diamond</option>
              <option value="Ruby">Ruby</option>
              <option value="Emerald">Emerald</option>
              <option value="Sapphire">Sapphire</option>
              <option value="Pearl">Pearl</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-200 mb-1">Weight (grams)</label>
            <input
              type="number"
              step="0.1"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="3.2"
              className="w-full px-3 py-2.5 bg-[#1A1A1A] border border-gray-700 rounded text-white focus:outline-none focus:border-[#C9A86C]"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-200 mb-1">Ring Size (If Ring)</label>
            <input
              type="number"
              name="ringSize"
              value={formData.ringSize}
              onChange={handleChange}
              min="4"
              max="12"
              placeholder="7"
              className="w-full px-3 py-2.5 bg-[#1A1A1A] border border-gray-700 rounded text-white focus:outline-none focus:border-[#C9A86C]"
            />
          </div>
        </div>

        {/* Product Placement Options */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          <label className="block font-semibold text-[#C9A86C] uppercase tracking-wider text-[11px]">
            Product Placement & Section Controls
          </label>
          <div className="flex flex-col sm:flex-row gap-6">
            <label htmlFor="isBestSeller" className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                id="isBestSeller"
                name="isBestSeller"
                checked={formData.isBestSeller}
                onChange={handleChange}
                className="w-4 h-4 bg-[#1A1A1A] border-gray-700 rounded text-[#C9A86C] focus:ring-[#C9A86C]"
              />
              <span className="font-medium text-gray-200">Show in Patron Favorites (Best Sellers Section)</span>
            </label>

            <label htmlFor="isFeatured" className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                id="isFeatured"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="w-4 h-4 bg-[#1A1A1A] border-gray-700 rounded text-[#C9A86C] focus:ring-[#C9A86C]"
              />
              <span className="font-medium text-gray-200">Show in Featured Collections / Highlights</span>
            </label>
          </div>
        </div>

        {/* Product Images Section */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          <label className="block font-semibold text-gray-200">Product Images</label>

          <div className="flex flex-wrap gap-3 items-center">
            <label className="cursor-pointer bg-[#C9A86C] text-black px-4 py-2.5 rounded font-bold text-xs hover:bg-[#b8975b] flex items-center gap-2">
              <Upload className="w-4 h-4" />
              {uploadingImage ? 'Uploading...' : 'Upload Image File'}
              <input type="file" multiple accept="image/*" onChange={handleFileUpload} className="hidden" disabled={uploadingImage} />
            </label>

            <span className="text-gray-400">or add image URL:</span>

            <div className="flex gap-2 flex-1 max-w-md">
              <input
                type="url"
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                placeholder="https://res.cloudinary.com/..."
                className="flex-1 px-3 py-2 bg-[#1A1A1A] border border-gray-700 rounded text-white focus:outline-none focus:border-[#C9A86C]"
              />
              <button
                type="button"
                onClick={handleAddImageUrl}
                className="bg-gray-800 border border-gray-700 text-gray-200 px-4 py-2 rounded font-semibold hover:bg-gray-700"
              >
                Add URL
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            {formData.images.map((url, idx) => (
              <div key={idx} className="relative w-24 h-24 border border-gray-700 rounded-lg overflow-hidden bg-[#1A1A1A] group">
                <img src={url} alt={`Product ${idx}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-80 hover:opacity-100 transition"
                  title="Remove Image"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t border-white/10">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-6 py-2.5 border border-gray-700 rounded text-xs font-semibold hover:bg-[#1A1A1A]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-[#C9A86C] text-black px-8 py-2.5 rounded font-bold text-xs uppercase tracking-wider hover:bg-[#b8975b] flex items-center gap-2 shadow"
          >
            <Save className="w-4 h-4" /> {isEditMode ? 'Update Product' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddProduct;
