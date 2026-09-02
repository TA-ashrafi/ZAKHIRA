import api from './api';

export const couponService = {
  createCoupon: async (couponData) => {
    const response = await api.post('/coupons', couponData);
    return response.data;
  },

  getCoupons: async () => {
    const response = await api.get('/coupons');
    return response.data;
  },

  applyCoupon: async (payload) => {
    // Accepts either ({ code, totalAmount }) object or (code, totalAmount) arguments
    const code = typeof payload === 'object' ? payload.code : payload;
    const totalAmount = typeof payload === 'object' ? (payload.totalAmount || payload.cartTotal) : arguments[1];
    const response = await api.post('/coupons/apply', {
      code: String(code || '').trim().toUpperCase(),
      totalAmount
    });
    return response.data;
  },

  deleteCoupon: async (id) => {
    const response = await api.delete(`/coupons/${id}`);
    return response.data;
  },
};

export default couponService;
