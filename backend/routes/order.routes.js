import express from 'express';
import {
  placeOrder,
  getOrders,
  getOrderById,
  updateOrderStatus
} from '../controllers/order.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { admin } from '../middleware/admin.middleware.js';

const router = express.Router();

router.post('/', protect, placeOrder);
router.get('/', protect, getOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/status', protect, admin, updateOrderStatus);

export default router;