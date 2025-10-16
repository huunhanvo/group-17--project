import axios from 'axios';

// Base URL for API
const API_BASE_URL = 'http://localhost:5000';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
});

// Token management
let accessToken = localStorage.getItem('accessToken');
let refreshToken = localStorage.getItem('refreshToken');
let isRefreshing = false;
let failedQueue = [];

// Process failed requests queue
const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

// Request interceptor to add access token
api.interceptors.request.use(
    (config) => {
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // If error is 401 and we haven't already tried to refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // If already refreshing, queue this request
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return api(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            if (refreshToken) {
                try {
                    console.log('🔄 Access token expired, refreshing...');

                    const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
                        refreshToken: refreshToken
                    });

                    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;

                    // Update tokens
                    accessToken = newAccessToken;
                    refreshToken = newRefreshToken;

                    // Save to localStorage
                    localStorage.setItem('accessToken', newAccessToken);
                    localStorage.setItem('refreshToken', newRefreshToken);

                    // Update user data if provided
                    if (response.data.user) {
                        localStorage.setItem('user', JSON.stringify(response.data.user));
                    }

                    console.log('✅ Token refreshed successfully');

                    // Process failed requests queue
                    processQueue(null, newAccessToken);

                    // Retry original request with new token
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return api(originalRequest);

                } catch (refreshError) {
                    console.error('❌ Token refresh failed:', refreshError);

                    // Refresh failed, clear tokens and redirect to login
                    clearTokens();
                    processQueue(refreshError, null);

                    // Redirect to login
                    if (window.location.pathname !== '/login') {
                        window.location.href = '/login';
                    }

                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            } else {
                // No refresh token, clear everything
                clearTokens();
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }
            }
        }

        return Promise.reject(error);
    }
);

// Helper functions
const clearTokens = () => {
    accessToken = null;
    refreshToken = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // Legacy token
};

const setTokens = (newAccessToken, newRefreshToken, userData = null) => {
    accessToken = newAccessToken;
    refreshToken = newRefreshToken;

    localStorage.setItem('accessToken', newAccessToken);
    localStorage.setItem('refreshToken', newRefreshToken);

    if (userData) {
        localStorage.setItem('user', JSON.stringify(userData));
    }

    // Remove legacy token
    localStorage.removeItem('token');
};

const isAuthenticated = () => {
    return !!accessToken && !!refreshToken;
};

// API methods
const authAPI = {
    // Signup
    signup: async (userData) => {
        const response = await api.post('/auth/signup', userData);
        const { accessToken: newAccessToken, refreshToken: newRefreshToken, user } = response.data;
        setTokens(newAccessToken, newRefreshToken, user);
        return response.data;
    },

    // Login
    login: async (credentials) => {
        const response = await api.post('/auth/login', credentials);
        const { accessToken: newAccessToken, refreshToken: newRefreshToken, user } = response.data;
        setTokens(newAccessToken, newRefreshToken, user);
        return response.data;
    },

    // Logout
    logout: async () => {
        try {
            if (refreshToken) {
                await api.post('/auth/logout', { refreshToken });
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            clearTokens();
        }
    },

    // Get current user
    getMe: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    },

    // Update profile
    updateProfile: async (profileData) => {
        const response = await api.put('/auth/profile', profileData);
        return response.data;
    },

    // Upload avatar
    uploadAvatar: async (avatarData) => {
        const response = await api.post('/auth/upload-avatar', avatarData);
        return response.data;
    },

    // Forgot password
    forgotPassword: async (email) => {
        const response = await api.post('/auth/forgot-password', { email });
        return response.data;
    },

    // Reset password
    resetPassword: async (token, newPassword) => {
        const response = await api.post(`/auth/reset-password/${token}`, { newPassword });
        return response.data;
    },

    // Manual refresh (for testing)
    refreshToken: async () => {
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken: refreshToken
        });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken, user } = response.data;
        setTokens(newAccessToken, newRefreshToken, user);

        return response.data;
    }
};

// Other API methods (users, admin, etc.)
const userAPI = {
    // Get all users (admin only)
    getAllUsers: async () => {
        const response = await api.get('/users');
        return response.data;
    },

    // Delete user (admin only)
    deleteUser: async (userId) => {
        const response = await api.delete(`/users/${userId}`);
        return response.data;
    },

    // Add user
    addUser: async (userData) => {
        const response = await api.post('/users', userData);
        return response.data;
    }
};

// Socket API
const socketAPI = {
    // Get online users count
    getOnlineCount: async () => {
        const response = await api.get('/socket/online-count');
        return response.data;
    },

    // Send system announcement (admin only)
    sendAnnouncement: async (message, type = 'info') => {
        const response = await api.post('/socket/system-announcement', { message, type });
        return response.data;
    }
};

export default api;
export { authAPI, userAPI, socketAPI, clearTokens, setTokens, isAuthenticated };