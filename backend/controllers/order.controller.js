import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

// Place order
export const placeOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    // Get user's cart
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    // Prepare order items
    const orderItems = cart.items.map(item => ({
      product: item.product._id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      image: (item.product.images && item.product.images.length > 0) ? item.product.images[0] : ''
    }));

    // Check stock
    for (const item of cart.items) {
      const product = await Product.findById(item.product._id);
      if (!product || product.stockQuantity < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Not enough stock for ${product ? product.name : 'product'}.`
        });
      }
    }

    // Create order
    const order = await Order.create({
      user: req.user.id,
      items: orderItems,
      totalAmount: cart.totalPrice,
      shippingAddress: shippingAddress || req.user.address,
      paymentMethod,
      paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid',
      orderStatus: 'Processing'
    });

    // Update stock
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.product._id, {
        $inc: { stockQuantity: -item.quantity }
      });
    }

    // Clear cart
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// Get user's orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// Get single order
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email phone');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if order belongs to user or user is admin
    if (order.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// Get all orders (Admin only)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// Update order status (Admin only)
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    order.orderStatus = orderStatus;
    if (orderStatus === 'Delivered') {
      order.deliveredAt = new Date();
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully!',
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};
