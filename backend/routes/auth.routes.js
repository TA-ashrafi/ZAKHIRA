import express from 'express';
import { 
  register, 
  login, 
  getMe, 
  updateProfile,
  getUsers
} from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { admin } from '../middleware/admin.middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.get('/users', protect, admin, getUsers);

export default router;
