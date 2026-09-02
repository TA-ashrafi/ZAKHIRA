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

  applyCoupon: async (code, totalAmount) => {
    const response = await api.post('/coupons/apply', { code, totalAmount });
    return response.data;
  },

  deleteCoupon: async (id) => {
    const response = await api.delete(`/coupons/${id}`);
    return response.data;
  },
};

export default couponService;
