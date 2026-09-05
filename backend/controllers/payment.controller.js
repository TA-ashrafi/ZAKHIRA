import Razorpay from 'razorpay';
import crypto from 'crypto';

const getRazorpayInstance = () => {
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_zakhira_dummy_key',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'zakhira_dummy_secret',
  });
};

export const getKey = (req, res) => {
  return res.status(200).json({
    success: true,
    key: process.env.RAZORPAY_KEY_ID || 'rzp_test_zakhira_dummy_key',
  });
};

export const createOrder = async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt = 'receipt_' + Date.now() } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: 'Valid amount in INR is required' });
    }

    const razorpay = getRazorpayInstance();

    // Convert amount to paise (multiply by 100)
    const options = {
      amount: Math.round(Number(amount) * 100),
      currency,
      receipt,
    };

    const order = await razorpay.orders.create(options);

    return res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('Razorpay Order Creation Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Razorpay order creation failed',
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Missing Razorpay signature verification parameters' });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET || 'zakhira_dummy_secret';
    const body = razorpay_order_id + '|' + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      return res.status(200).json({
        success: true,
        message: 'Payment verified successfully!',
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed: Invalid HMAC SHA256 Signature',
      });
    }
  } catch (error) {
    console.error('Payment Verification Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Payment signature verification error',
    });
  }
};
