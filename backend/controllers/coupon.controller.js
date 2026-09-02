import Coupon from '../models/Coupon.js';

// Create coupon (Admin only)
export const createCoupon = async (req, res) => {
  try {
    const { code, discountPercentage, minPurchase, expiresAt } = req.body;

    if (!code || !discountPercentage) {
      return res.status(400).json({
        success: false,
        message: 'Please provide coupon code and discount percentage'
      });
    }

    const formattedCode = String(code || '').trim().toUpperCase();

    const existing = await Coupon.findOne({ code: formattedCode });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Coupon code already exists'
      });
    }

    const coupon = await Coupon.create({
      code: formattedCode,
      discountPercentage: Number(discountPercentage),
      minPurchase: minPurchase ? Number(minPurchase) : 0,
      expiresAt: expiresAt ? new Date(expiresAt) : undefined,
    });

    res.status(201).json({
      success: true,
      message: 'Coupon created successfully!',
      data: coupon
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// Get all coupons (Admin only)
export const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: coupons.length,
      data: coupons
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// Apply coupon code (User)
export const applyCoupon = async (req, res) => {
  try {
    const { code, totalAmount } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a coupon code'
      });
    }

    const formattedCode = String(code || '').trim().toUpperCase();

    const coupon = await Coupon.findOne({
      code: formattedCode,
      isActive: true
    });

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: 'Invalid or expired coupon code'
      });
    }

    if (coupon.expiresAt && new Date() > new Date(coupon.expiresAt)) {
      return res.status(400).json({
        success: false,
        message: 'Coupon code has expired'
      });
    }

    if (totalAmount && coupon.minPurchase > 0 && totalAmount < coupon.minPurchase) {
      return res.status(400).json({
        success: false,
        message: `Minimum order amount for this coupon is ₹${coupon.minPurchase}`
      });
    }

    const discountAmount = totalAmount
      ? Math.round((totalAmount * coupon.discountPercentage) / 100)
      : 0;

    res.status(200).json({
      success: true,
      message: `🎉 ${coupon.discountPercentage}% discount applied!`,
      data: {
        code: coupon.code,
        discountPercentage: coupon.discountPercentage,
        discountAmount,
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// Delete coupon (Admin only)
export const deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: 'Coupon not found'
      });
    }

    await coupon.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Coupon deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};
