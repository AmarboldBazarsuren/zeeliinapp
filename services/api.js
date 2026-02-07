import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Environment configuration
const API_CONFIG = {
  development: {
    android: 'http://10.0.2.2:5000/api',
    ios: 'http://localhost:5000/api',
    default: 'http://192.168.88.4:5000/api',
  },
  production: {
    default: 'https://your-production-api.com/api',
  },
};

const getBaseURL = () => {
  if (__DEV__) {
    if (Platform.OS === 'android') return API_CONFIG.development.android;
    if (Platform.OS === 'ios') return API_CONFIG.development.ios;
    return API_CONFIG.development.default;
  }
  return API_CONFIG.production.default;
};

const API_URL = getBaseURL();
const TIMEOUT_MS = 30000;

// Fetch with timeout
const fetchWithTimeout = (url, options = {}, timeout = TIMEOUT_MS) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Хүсэлт хугацаа хэтэрсэн')), timeout)
    ),
  ]);
};

// API request wrapper with retry
const apiRequest = async (endpoint, options = {}, retries = 3) => {
  let lastError;

  for (let i = 0; i < retries; i++) {
    try {
      const token = await AsyncStorage.getItem('userToken');

      const config = {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options.headers,
        },
      };

      if (__DEV__) {
        console.log(`[API] ${options.method || 'GET'} ${API_URL}${endpoint}`);
        if (config.body) console.log('[Body]', config.body);
      }

      const response = await fetchWithTimeout(`${API_URL}${endpoint}`, config);
      const data = await response.json();

      if (__DEV__) console.log('[Response]', data);

      if (!response.ok) {
        if (response.status === 401) {
          await AsyncStorage.multiRemove(['userToken', 'userData']);
          throw new Error('Нэвтрэх хугацаа дууссан. Дахин нэвтэрнэ үү');
        }
        throw new Error(data.message || `HTTP ${response.status}: Алдаа гарлаа`);
      }

      if (!data.success) {
        throw new Error(data.message || 'Алдаа гарлаа');
      }

      return data;
    } catch (error) {
      lastError = error;

      if (
        error.message.includes('Нэвтрэх хугацаа') ||
        error.message === 'Network request failed'
      ) {
        break;
      }

      if (i < retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
        if (__DEV__) console.log(`[Retry] ${i + 2}/${retries}`);
      }
    }
  }

  if (lastError.message === 'Network request failed') {
    throw new Error('Сүлжээний алдаа. Интернет холболтоо шалгана уу');
  }

  throw lastError;
};

// Auth API
export const authAPI = {
  login: async (phone, password) => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ phone, password }),
    });
    return {
      ...response,
      token: response.data?.token || response.token,
      user: response.data?.user || response.user,
    };
  },

  register: async (userData) => {
    const response = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    return {
      ...response,
      token: response.data?.token || response.token,
      user: response.data?.user || response.user,
    };
  },

  logout: async () => {
    try {
      await apiRequest('/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      await AsyncStorage.multiRemove(['userToken', 'userData']);
    }
  },

  forgotPassword: async (phone) => {
    return apiRequest('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ phone }),
    });
  },
};

// User API
export const userAPI = {
  getProfile: async () => {
    const response = await apiRequest('/users/me', { method: 'GET' });
    return response.data || response;
  },

  updatePersonalInfo: async (personalInfo) => {
    const response = await apiRequest('/users/personal-info', {
      method: 'PUT',
      body: JSON.stringify(personalInfo),
    });
    return response.data || response;
  },

  updateProfile: async (profileData) => {
    const response = await apiRequest('/users/update-profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
    return response.data || response;
  },
};

// Loan API
export const loanAPI = {
  getMyLoans: async () => {
    const response = await apiRequest('/loans/my-loans', { method: 'GET' });
    return response.data || response;
  },

  getLoan: async (loanId) => {
    const response = await apiRequest(`/loans/${loanId}`, { method: 'GET' });
    return response.data || response;
  },

  applyLoan: async (loanData) => {
    return apiRequest('/loans/apply', {
      method: 'POST',
      body: JSON.stringify(loanData),
    });
  },
};

// Wallet API
export const walletAPI = {
  getBalance: async () => {
    const response = await apiRequest('/wallet/balance', { method: 'GET' });
    return response.data || response;
  },

  getTransactions: async () => {
    const response = await apiRequest('/wallet/transactions', { method: 'GET' });
    return response.data || response;
  },

  withdraw: async (amount, bankAccountNumber) => {
    return apiRequest('/wallet/withdraw', {
      method: 'POST',
      body: JSON.stringify({ amount, bankAccountNumber }),
    });
  },

  topup: async (amount) => {
    return apiRequest('/wallet/topup', {
      method: 'POST',
      body: JSON.stringify({ amount }),
    });
  },
};

// Health check
export const healthCheck = async () => {
  try {
    const response = await fetchWithTimeout(`${API_URL.replace('/api', '')}/api/health`);
    return response.ok;
  } catch {
    return false;
  }
};

export { API_URL };
export default { authAPI, userAPI, loanAPI, walletAPI, healthCheck };