import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      Cookies.remove('token');
      Cookies.remove('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => {
    Cookies.remove('token');
    Cookies.remove('user');
  },
};

// User API
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
};

// Shop API
export const shopAPI = {
  getShops: () => api.get('/shops'),
  getShop: (id) => api.get(`/shops/${id}`),
  createShop: (data) => api.post('/shops', data),
  updateShop: (id, data) => api.put(`/shops/${id}`, data),
  deleteShop: (id) => api.delete(`/shops/${id}`),
};

// Product API
export const productAPI = {
  getProducts: (params = {}) => api.get('/products', { params }),
  getProduct: (id) => api.get(`/products/${id}`),
  createProduct: (data) => api.post('/products', data),
  updateProduct: (id, data) => api.put(`/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/products/${id}`),
  getProductsByShop: (shopId, params = {}) => api.get(`/products/shop/${shopId}`, { params }),
};

// Order API
export const orderAPI = {
  getOrders: (params = {}) => api.get('/orders', { params }),
  getOrder: (id) => api.get(`/orders/${id}`),
  createOrder: (data) => api.post('/orders', data),
  updateOrderStatus: (id, data) => api.put(`/orders/${id}/status`, data),
  updatePaymentStatus: (id, data) => api.put(`/orders/${id}/payment`, data),
  getOrdersByShop: (shopId, params = {}) => api.get(`/orders/shop/${shopId}`, { params }),
  getOrderAnalytics: (shopId, params = {}) => api.get(`/orders/shop/${shopId}/analytics`, { params }),
};

// Category API
export const categoryAPI = {
  getCategories: (params = {}) => api.get('/categories', { params }),
  getCategoryTree: () => api.get('/categories/tree'),
  getCategory: (id) => api.get(`/categories/${id}`),
  getCategoryProducts: (id, params = {}) => api.get(`/categories/${id}/products`, { params }),
  createCategory: (data) => api.post('/categories', data),
  updateCategory: (id, data) => api.put(`/categories/${id}`, data),
  deleteCategory: (id) => api.delete(`/categories/${id}`),
};

// Notification API
export const notificationAPI = {
  getNotifications: (params = {}) => api.get('/notifications', { params }),
  markAsRead: (id) => api.put(`/notifications/${id}/read`),
  markAllAsRead: () => api.put('/notifications/read-all'),
  deleteNotification: (id) => api.delete(`/notifications/${id}`),
  getShopNotifications: (shopId, params = {}) => api.get(`/notifications/shop/${shopId}`, { params }),
};

// Admin API
export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard'),
  getUsers: (params = {}) => api.get('/admin/users', { params }),
  updateUserStatus: (id, data) => api.put(`/admin/users/${id}/status`, data),
  updateUserRole: (id, data) => api.put(`/admin/users/${id}/role`, data),
  getShops: (params = {}) => api.get('/admin/shops', { params }),
  updateShopStatus: (id, data) => api.put(`/admin/shops/${id}/status`, data),
  getOrders: (params = {}) => api.get('/admin/orders', { params }),
  updateOrderStatus: (id, data) => api.put(`/admin/orders/${id}/status`, data),
  getRevenueAnalytics: (params = {}) => api.get('/admin/analytics/revenue', { params }),
};

export default api;
