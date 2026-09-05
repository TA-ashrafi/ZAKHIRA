import api from './api';

const paymentService = {
  getKey: async () => {
    const response = await api.get('/payment/get-key');
    return response.data;
  },

  createOrder: async (amount) => {
    const response = await api.post('/payment/create-order', { amount });
    return response.data;
  },

  verifyPayment: async (paymentData) => {
    const response = await api.post('/payment/verify-payment', paymentData);
    return response.data;
  },
};

export default paymentService;
