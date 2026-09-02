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
          className="p-2 border rounded-lg hover:bg-white transition text-gray-600"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-playfair font-bold text-zakhira-dark">
            {isEditMode ? 'Edit Product' : 'Add New Product'}
          </h1>
          <p className="text-gray-500 text-xs mt-0.5">Fill in product attributes and pricing details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-6 text-xs">
        {/* Name & Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Product Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g. Royal Solitaire Pendant Necklace"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-zakhira-gold"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-zakhira-gold bg-white"
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
          <label className="block font-semibold text-gray-700 mb-1">Description *</label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Describe craftsmanship, gold specifications, stones, styling recommendations..."
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-zakhira-gold"
          ></textarea>
        </div>

        {/* Prices & Stock */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Price (₹) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              placeholder="12900"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-zakhira-gold"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Original / Compare Price (₹)</label>
            <input
              type="number"
              name="comparePrice"
              value={formData.comparePrice}
              onChange={handleChange}
              min="0"
              placeholder="15900"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-zakhira-gold"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Stock Quantity *</label>
            <input
              type="number"
              name="stockQuantity"
              value={formData.stockQuantity}
              onChange={handleChange}
              required
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-zakhira-gold"
            />
          </div>
        </div>

        {/* Specifications */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Gold Purity</label>
            <select
              name="goldPurity"
              value={formData.goldPurity}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-zakhira-gold bg-white"
            >
              <option value="18K">18K</option>
              <option value="22K">22K</option>
              <option value="24K">24K</option>
              <option value="Not Applicable">Not Applicable</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Stone Type</label>
            <select
              name="stoneType"
              value={formData.stoneType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-zakhira-gold bg-white"
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
            <label className="block font-semibold text-gray-700 mb-1">Weight (grams)</label>
            <input
              type="number"
              step="0.1"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="3.2"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-zakhira-gold"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Ring Size (If Ring)</label>
            <input
              type="number"
              name="ringSize"
              value={formData.ringSize}
              onChange={handleChange}
              min="4"
              max="12"
              placeholder="7"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-zakhira-gold"
            />
          </div>
        </div>

        {/* Featured Toggle */}
        <div className="flex items-center gap-3 pt-2">
          <input
            type="checkbox"
            id="isFeatured"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
            className="w-4 h-4 text-zakhira-gold border-gray-300 rounded focus:ring-zakhira-gold"
          />
          <label htmlFor="isFeatured" className="font-semibold text-gray-800 cursor-pointer">
            Mark as Featured Product (Displayed in Best Sellers & Highlights)
          </label>
        </div>

        {/* Product Images Section */}
        <div className="pt-4 border-t border-gray-100 space-y-3">
          <label className="block font-semibold text-gray-700">Product Images</label>

          {/* Upload Button */}
          <div className="flex flex-wrap gap-3 items-center">
            <label className="cursor-pointer bg-zakhira-dark text-white px-4 py-2 rounded font-semibold text-xs hover:bg-opacity-90 flex items-center gap-2">
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
                placeholder="https://images.unsplash.com/photo-..."
                className="flex-1 px-3 py-1.5 border border-gray-300 rounded"
              />
              <button
                type="button"
                onClick={handleAddImageUrl}
                className="bg-gray-100 border text-gray-700 px-3 py-1.5 rounded font-semibold hover:bg-gray-200"
              >
                Add URL
              </button>
            </div>
          </div>

          {/* Image Previews */}
          <div className="flex flex-wrap gap-4 pt-2">
            {formData.images.map((url, idx) => (
              <div key={idx} className="relative w-24 h-24 border rounded-lg overflow-hidden bg-gray-50 group">
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
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-6 py-2.5 border rounded text-xs font-semibold hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-zakhira-gold text-white px-8 py-2.5 rounded font-semibold text-xs uppercase tracking-wider hover:bg-opacity-90 flex items-center gap-2 shadow"
          >
            <Save className="w-4 h-4" /> {isEditMode ? 'Update Product' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddProduct;
