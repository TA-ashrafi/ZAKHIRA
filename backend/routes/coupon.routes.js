import express from 'express';
import {
  createCoupon,
  getCoupons,
  applyCoupon,
  deleteCoupon
} from '../controllers/coupon.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { admin } from '../middleware/admin.middleware.js';

const router = express.Router();

router.post('/', protect, admin, createCoupon);
router.get('/', protect, admin, getCoupons);
router.post('/apply', applyCoupon);
router.delete('/:id', protect, admin, deleteCoupon);

export default router;
