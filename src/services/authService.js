import api from './api';

export const authService = {
  // Login user
  login: async (email, password, userType) => {
    const response = await api.post('/auth/login', {
      email,
      password,
      userType,
    });
    return response;
  },

  // Register user
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response;
  },

  // Logout user
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response;
  },

  // Verify email
  verifyEmail: async (token) => {
    const response = await api.post('/auth/verify-email', { token });
    return response;
  },

  // Forgot password
  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response;
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    const response = await api.post('/auth/reset-password', {
      token,
      newPassword,
    });
    return response;
  },

  // Refresh token
  refreshToken: async () => {
    const response = await api.post('/auth/refresh-token');
    return response;
  },

  // Get current user profile
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response;
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const response = await api.put('/auth/profile', profileData);
    return response;
  },

  // Change password
  changePassword: async (currentPassword, newPassword) => {
    const response = await api.put('/auth/change-password', {
      currentPassword,
      newPassword,
    });
    return response;
  },

  // Mock data for development
  mockLogin: async (email, password, userType) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data
    const mockUser = {
      id: '1',
      email,
      userType,
      name: userType === 'farmer' ? 'Farmer John' : 'Consumer Jane',
      avatar: `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1`,
      emailVerified: true,
      location: userType === 'farmer' ? 'Kandy, Sri Lanka' : 'Colombo, Sri Lanka',
      phone: '+94 77 123 4567',
      ...(userType === 'farmer' && {
        farmName: 'Green Valley Farm',
        certifications: ['Organic', 'Fair Trade'],
        bio: 'Passionate about sustainable farming and providing fresh, organic produce to our community.',
      }),
    };

    const mockToken = 'mock-jwt-token-' + Date.now();

    return {
      user: mockUser,
      token: mockToken,
    };
  },

  mockRegister: async (userData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = {
      id: Date.now().toString(),
      ...userData,
      avatar: `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1`,
      emailVerified: false,
      createdAt: new Date().toISOString(),
    };

    const mockToken = 'mock-jwt-token-' + Date.now();

    return {
      user: mockUser,
      token: mockToken,
    };
  },
};