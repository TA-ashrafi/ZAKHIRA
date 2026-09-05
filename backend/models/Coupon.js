import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Coupon code is required'],
    unique: true,
    uppercase: true,
    trim: true
  },
  discountPercentage: {
    type: Number,
    required: [true, 'Discount percentage is required'],
    min: 1,
    max: 100
  },
  minPurchase: {
    type: Number,
    default: 0
  },
  expiryType: {
    type: String,
    enum: ['NONE', 'TIME', 'DAY', 'DATE', 'USED'],
    default: 'NONE'
  },
  expiryValue: {
    type: String,
    default: ''
  },
  maxUses: {
    type: Number,
    default: 0
  },
  usedCount: {
    type: Number,
    default: 0
  },
  expiresAt: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Coupon', couponSchema);
