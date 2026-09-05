import Coupon from '../models/Coupon.js';

// Create coupon (Admin only)
export const createCoupon = async (req, res) => {
  try {
    const { code, discountPercentage, minPurchase, expiryType = 'NONE', expiryValue } = req.body;

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

    let calculatedExpiresAt = null;
    let calculatedMaxUses = 0;

    const now = new Date();

    if (expiryType === 'TIME') {
      // e.g., expiryValue in hours or minutes (default hours if number)
      const hours = Number(expiryValue) || 1;
      calculatedExpiresAt = new Date(now.getTime() + hours * 60 * 60 * 1000);
    } else if (expiryType === 'DAY') {
      const days = Number(expiryValue) || 1;
      calculatedExpiresAt = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
    } else if (expiryType === 'DATE') {
      calculatedExpiresAt = expiryValue ? new Date(expiryValue) : null;
    } else if (expiryType === 'USED') {
      calculatedMaxUses = Number(expiryValue) || 10;
    }

    const coupon = await Coupon.create({
      code: formattedCode,
      discountPercentage: Number(discountPercentage),
      minPurchase: minPurchase ? Number(minPurchase) : 0,
      expiryType,
      expiryValue: String(expiryValue || ''),
      expiresAt: calculatedExpiresAt,
      maxUses: calculatedMaxUses,
      usedCount: 0,
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
    const { code, cartTotal, totalAmount } = req.body;
    const checkAmount = Number(cartTotal || totalAmount || 0);

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

    // Check expiration by date/time
    if (coupon.expiresAt && new Date() > new Date(coupon.expiresAt)) {
      return res.status(400).json({
        success: false,
        message: 'Coupon code has expired'
      });
    }

    // Check usage limit
    if (coupon.maxUses > 0 && coupon.usedCount >= coupon.maxUses) {
      return res.status(400).json({
        success: false,
        message: `Coupon usage limit (${coupon.maxUses} uses) reached`
      });
    }

    // Check min purchase
    if (checkAmount > 0 && coupon.minPurchase > 0 && checkAmount < coupon.minPurchase) {
      return res.status(400).json({
        success: false,
        message: `Minimum purchase for this coupon is ₹${coupon.minPurchase}`
      });
    }

    const discountAmount = checkAmount > 0
      ? Math.round((checkAmount * coupon.discountPercentage) / 100)
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
