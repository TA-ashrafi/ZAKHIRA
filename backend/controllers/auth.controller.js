import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { sendEmail, getWelcomeEmailTemplate } from '../utils/sendEmail.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

// Register User
export const register = async (req, res) => {
  try {
    const { name, email, password, phone, role, adminSecret } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email and password'
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    let userRole = 'user';
    if (role === 'admin') {
      const validSecret = process.env.ADMIN_SECRET || 'zakhira_admin_2026';
      if (adminSecret === validSecret) {
        userRole = 'admin';
      } else {
        return res.status(400).json({
          success: false,
          message: 'Invalid Admin Secret Key'
        });
      }
    }

    const user = await User.create({ name, email, password, phone, role: userRole });

    // Asynchronously send welcome email without blocking response
    sendEmail({
      to: user.email,
      subject: '✨ Welcome to ZAKHIRA Royal Atelier',
      html: getWelcomeEmailTemplate(user.name)
    }).catch(err => console.error('Welcome email dispatch error:', err));

    res.status(201).json({
      success: true,
      message: 'User registered successfully!',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
        token: generateToken(user._id)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// Toggle User Role (Admin only)
export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role specified'
      });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    user.role = role;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User role updated to ${role}!`,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// Login User
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Login successful!',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
        token: generateToken(user._id)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// Get Current User
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// Update User Profile
export const updateProfile = async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (address) user.address = address;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully!',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// Get All Users (Admin only)
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// Test Email Dispatch API Endpoint
export const testEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const targetEmail = email || process.env.SENDER_EMAIL || 'tahseenashrafi29@gmail.com';

    const result = await sendEmail({
      to: targetEmail,
      subject: '✨ ZAKHIRA Diagnostic Test Email',
      html: getWelcomeEmailTemplate('Valued Client')
    });

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: `Email dispatched successfully to ${targetEmail}`,
        details: result
      });
    } else {
      return res.status(500).json({
        success: false,
        message: `Email dispatch failed to ${targetEmail}`,
        error: result.error
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error sending test email'
    });
  }
};
