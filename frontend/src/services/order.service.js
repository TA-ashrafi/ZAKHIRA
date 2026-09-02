import api from './api';

export const orderService = {
  placeOrder: async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  getOrders: async () => {
    const response = await api.get('/orders');
    return response.data;
  },

  getAllOrders: async () => {
    const response = await api.get('/orders/admin/all');
    return response.data;
  },

  getOrderById: async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  updateOrderStatus: async (id, orderStatus) => {
    const response = await api.put(`/orders/${id}/status`, { orderStatus });
    return response.data;
  },
};

export default orderService;
