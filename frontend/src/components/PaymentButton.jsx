import { useState } from 'react';
import { CreditCard, ShieldCheck } from 'lucide-react';
import paymentService from '../services/payment.service';
import toast from 'react-hot-toast';

const PaymentButton = ({ amount, userDetails, onSuccess, disabled }) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) {
      toast.error('Invalid order amount');
      return;
    }

    setLoading(true);

    try {
      // 1. Get Razorpay key
      const keyRes = await paymentService.getKey();
      const razorpayKey = keyRes.key;

      // 2. Create Razorpay Order
      const orderRes = await paymentService.createOrder(amount);
      if (!orderRes.success || !orderRes.order) {
        toast.error('Failed to initiate payment session');
        setLoading(false);
        return;
      }

      const order = orderRes.order;

      // 3. Configure Razorpay Options
      const options = {
        key: razorpayKey,
        amount: order.amount,
        currency: order.currency || 'INR',
        name: 'ZAKHIRA',
        description: 'Fine Haute Joaillerie Purchase',
        image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=200',
        order_id: order.id,
        handler: async function (response) {
          try {
            // 4. Verify Payment Signature
            const verifyRes = await paymentService.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.success) {
              toast.success('Payment Successful! Processing Order...');
              onSuccess && onSuccess(response.razorpay_payment_id);
            } else {
              toast.error('Payment Verification Failed!');
            }
          } catch (err) {
            toast.error('Payment verification error');
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: userDetails?.name || '',
          email: userDetails?.email || '',
          contact: userDetails?.phone || '',
        },
        notes: {
          address: 'ZAKHIRA Jaipur Flagship Atelier',
        },
        theme: {
          color: '#C9A86C',
        },
        modal: {
          ondismiss: function () {
            toast.error('Payment cancelled by user');
            setLoading(false);
          },
        },
      };

      // 4. Open Razorpay Popup
      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        toast.error('Razorpay SDK failed to load. Please check your internet connection.');
        setLoading(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Payment processing failed');
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handlePayment}
      disabled={disabled || loading}
      className="w-full bg-[#C9A86C] text-black py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#b8975b] transition flex items-center justify-center gap-2 shadow-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <CreditCard className="w-4 h-4" />
      {loading ? 'Opening Secure Payment Gateway...' : `Pay ₹${amount?.toLocaleString()} via Razorpay`}
    </button>
  );
};

export default PaymentButton;
