import axios from 'axios';

// Create axios instance with baseURL
const API_URL = 'http://localhost:5001/api';

// Configure axios to include credentials and handle tokens
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if it exists
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const { data } = await axiosInstance.post('/auth/refresh-token', { refreshToken });
          localStorage.setItem('authToken', data.authToken);
          axiosInstance.defaults.headers['x-auth-token'] = data.authToken;
          return axiosInstance(originalRequest);
        } catch (err) {
          authService.logout();
          return Promise.reject(err);
        }
      }
    }
    return Promise.reject(error);
  }
);

// Auth services
const authService = {
  // Login user
  login: async (email, password) => {
    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      if (response.data.status === 'OK') {
        localStorage.setItem('authToken', response.data.token);
        console.log('User logged in successfully'); // Terminal comment
        return { success: true };
      }
      return { success: false, message: 'Login failed' };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Server error' 
      };
    }
  },

  // Register user
  signup: async (userData) => {
    try {
      const response = await axiosInstance.post('/auth/signup', userData);
      if (response.data.status === 'OK') {
        console.log('User registered successfully'); // Terminal comment
        return { success: true, message: response.data.message };
      }
      return { success: false, message: 'Registration failed' };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Server error' 
      };
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    console.log('User logged out'); // Terminal comment
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return localStorage.getItem('authToken') ? true : false;
  },

  // Get user profile
  getProfile: async () => {
    try {
      const response = await axiosInstance.get('/profile');
      if (response.data.status === 'OK') {
        return { success: true, user: response.data.user };
      }
      return { success: false, message: 'Failed to get profile' };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Server error' 
      };
    }
  },

  // Update user profile
  updateProfile: async (userData) => {
    try {
      const response = await axiosInstance.put('/profile', userData);
      if (response.data.status === 'OK') {
        console.log('Profile updated successfully'); // Terminal comment
        return { success: true, message: response.data.message };
      }
      return { success: false, message: 'Failed to update profile' };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Server error' 
      };
    }
  }
};

export default authService;