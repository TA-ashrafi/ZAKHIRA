import express from 'express';
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist
} from '../controllers/wishlist.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', protect, getWishlist);
router.post('/add', protect, addToWishlist);
router.delete('/remove/:productId', protect, removeFromWishlist);

export default router;