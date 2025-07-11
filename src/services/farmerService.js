import api from './api';

export const farmerService = {
  // Get all farmers
  getFarmers: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== '') {
        queryParams.append(key, filters[key]);
      }
    });

    const response = await api.get(`/farmers?${queryParams.toString()}`);
    return response;
  },

  // Get farmer by ID
  getFarmerById: async (farmerId) => {
    const response = await api.get(`/farmers/${farmerId}`);
    return response;
  },

  // Update farmer profile
  updateProfile: async (profileData) => {
    const response = await api.put('/farmers/profile', profileData);
    return response;
  },

  // Get farmer's products
  getFarmerProducts: async (farmerId) => {
    const response = await api.get(`/farmers/${farmerId}/products`);
    return response;
  },

  // Add new product
  addProduct: async (productData) => {
    const response = await api.post('/farmers/products', productData);
    return response;
  },

  // Update product
  updateProduct: async (productId, productData) => {
    const response = await api.put(`/farmers/products/${productId}`, productData);
    return response;
  },

  // Delete product
  deleteProduct: async (productId) => {
    const response = await api.delete(`/farmers/products/${productId}`);
    return response;
  },

  // Get farmer analytics
  getAnalytics: async () => {
    const response = await api.get('/farmers/analytics');
    return response;
  },

  // Get farmer orders
  getFarmerOrders: async () => {
    const response = await api.get('/farmers/orders');
    return response;
  },

  // Mock data for development
  mockGetFarmers: async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return [
      {
        id: 'f1',
        name: 'Farmer John',
        farmName: 'Green Valley Farm',
        location: 'Kandy, Sri Lanka',
        bio: 'Passionate about sustainable farming and providing fresh, organic produce to our community.',
        avatar: 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
        coverImage: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1',
        rating: 4.8,
        reviewCount: 156,
        certifications: ['Organic', 'Fair Trade'],
        specialties: ['Vegetables', 'Herbs'],
        yearsExperience: 15,
        totalProducts: 23,
        joinedDate: '2020-03-15',
        contact: {
          phone: '+94 77 123 4567',
          email: 'john@greenvalley.lk',
        },
        socialMedia: {
          facebook: 'greenvalleyfarm',
          instagram: 'greenvalley_farm',
        },
        farmDetails: {
          size: '5 acres',
          farmingMethod: 'Organic',
          established: '2008',
        },
      },
      {
        id: 'f2',
        name: 'Farmer Silva',
        farmName: 'Coconut Grove',
        location: 'Galle, Sri Lanka',
        bio: 'Third-generation coconut farmer dedicated to producing the finest king coconuts in Sri Lanka.',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
        coverImage: 'https://images.pexels.com/photos/1002543/pexels-photo-1002543.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1',
        rating: 4.9,
        reviewCount: 203,
        certifications: ['Traditional'],
        specialties: ['Coconuts', 'Tropical Fruits'],
        yearsExperience: 25,
        totalProducts: 8,
        joinedDate: '2019-08-22',
        contact: {
          phone: '+94 71 987 6543',
          email: 'silva@coconutgrove.lk',
        },
        farmDetails: {
          size: '12 acres',
          farmingMethod: 'Traditional',
          established: '1995',
        },
      },
    ];
  },

  mockGetAnalytics: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      totalSales: 125000,
      totalOrders: 89,
      popularProducts: [
        { name: 'Organic Tomatoes', sales: 45, revenue: 11250 },
        { name: 'Fresh Spinach', sales: 32, revenue: 3840 },
        { name: 'Ceylon Cinnamon', sales: 18, revenue: 14400 },
      ],
      monthlyRevenue: [
        { month: 'Jan', revenue: 15000 },
        { month: 'Feb', revenue: 18000 },
        { month: 'Mar', revenue: 22000 },
        { month: 'Apr', revenue: 19000 },
        { month: 'May', revenue: 25000 },
        { month: 'Jun', revenue: 26000 },
      ],
      recentOrders: [
        {
          id: 'ORD-001',
          customer: 'Jane Doe',
          items: 'Organic Tomatoes x2',
          amount: 500,
          status: 'delivered',
          date: '2024-01-15',
        },
        {
          id: 'ORD-002',
          customer: 'John Smith',
          items: 'Fresh Spinach x3',
          amount: 360,
          status: 'preparing',
          date: '2024-01-16',
        },
      ],
    };
  },
};