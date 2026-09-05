import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0
  },
  comparePrice: {
    type: Number,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['Ring', 'Necklace', 'Earring', 'Bracelet', 'Pendant', 'Anklet']
  },
  goldPurity: {
    type: String,
    enum: ['18K', '22K', '24K', 'Not Applicable']
  },
  stoneType: {
    type: String,
    enum: ['Diamond', 'Ruby', 'Emerald', 'Sapphire', 'Pearl', 'None']
  },
  ringSize: {
    type: Number,
    min: 4,
    max: 12
  },
  weight: {
    type: Number,
    min: 0
  },
  images: [{
    type: String,
    required: true
  }],
  inStock: {
    type: Boolean,
    default: true
  },
  stockQuantity: {
    type: Number,
    default: 1,
    min: 0
  },
  ratings: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isBestSeller: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Product', productSchema);