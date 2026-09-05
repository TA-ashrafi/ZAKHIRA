import express from 'express';
import { subscribe, getSubscribers } from '../controllers/subscriber.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', subscribe);
router.get('/', protect, admin, getSubscribers);

export default router;
