import api from "./api";

export const orderService = {
  // Create order
  createOrder: (orderData) => api.post("/orders", orderData),

  // Get order by ID
  getOrderById: (id) => api.get(`/orders/${id}`),

  // Get user orders
  getMyOrders: () => api.get("/orders/my-orders"),

  // Confirm payment
  confirmPayment: (orderId, paymentData) =>
    api.post(`/orders/${orderId}/payment`, paymentData),
};
