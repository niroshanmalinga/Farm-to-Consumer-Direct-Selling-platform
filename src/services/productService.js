import api from './api';

export const productService = {
  // Get all products with filters
  getProducts: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== '') {
        if (Array.isArray(filters[key])) {
          queryParams.append(key, filters[key].join(','));
        } else {
          queryParams.append(key, filters[key]);
        }
      }
    });

    const response = await api.get(`/products?${queryParams.toString()}`);
    return response;
  },

  // Get product by ID
  getProductById: async (productId) => {
    const response = await api.get(`/products/${productId}`);
    return response;
  },

  // Search products
  searchProducts: async (searchQuery) => {
    const response = await api.get(`/products/search?q=${encodeURIComponent(searchQuery)}`);
    return response;
  },

  // Get product categories
  getCategories: async () => {
    const response = await api.get('/products/categories');
    return response;
  },

  // Get seasonal products
  getSeasonalProducts: async () => {
    const response = await api.get('/products/seasonal');
    return response;
  },

  // Get featured products
  getFeaturedProducts: async () => {
    const response = await api.get('/products/featured');
    return response;
  },

  // Mock data for development
  mockGetProducts: async (filters = {}) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const mockProducts = [
      {
        id: '1',
        name: 'Organic Tomatoes',
        description: 'Fresh, juicy organic tomatoes grown without pesticides',
        price: 250,
        unit: 'kg',
        category: 'Vegetables',
        farmer: {
          id: 'f1',
          name: 'Farmer John',
          farmName: 'Green Valley Farm',
          location: 'Kandy, Sri Lanka',
          rating: 4.8,
        },
        images: [
          'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&dpr=1',
          'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&dpr=1',
        ],
        stock: 50,
        inStock: true,
        isOrganic: true,
        harvestDate: '2024-01-15',
        expiryDate: '2024-01-25',
        nutritionInfo: {
          calories: 18,
          protein: 0.9,
          carbs: 3.9,
          fiber: 1.2,
        },
        tags: ['organic', 'fresh', 'local'],
        rating: 4.7,
        reviewCount: 23,
        createdAt: '2024-01-10T00:00:00Z',
      },
      {
        id: '2',
        name: 'Fresh Coconuts',
        description: 'King coconuts straight from the tree, perfect for drinking',
        price: 80,
        unit: 'piece',
        category: 'Fruits',
        farmer: {
          id: 'f2',
          name: 'Farmer Silva',
          farmName: 'Coconut Grove',
          location: 'Galle, Sri Lanka',
          rating: 4.9,
        },
        images: [
          'https://images.pexels.com/photos/1002543/pexels-photo-1002543.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&dpr=1',
          'https://images.pexels.com/photos/1002544/pexels-photo-1002544.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&dpr=1',
        ],
        stock: 100,
        inStock: true,
        isOrganic: false,
        harvestDate: '2024-01-16',
        expiryDate: '2024-01-30',
        nutritionInfo: {
          calories: 354,
          protein: 3.3,
          carbs: 15.2,
          fiber: 9,
        },
        tags: ['fresh', 'local', 'king-coconut'],
        rating: 4.9,
        reviewCount: 45,
        createdAt: '2024-01-12T00:00:00Z',
      },
      {
        id: '3',
        name: 'Organic Rice',
        description: 'Premium quality organic red rice, traditionally grown',
        price: 180,
        unit: 'kg',
        category: 'Grains',
        farmer: {
          id: 'f3',
          name: 'Farmer Perera',
          farmName: 'Heritage Rice Farm',
          location: 'Anuradhapura, Sri Lanka',
          rating: 4.6,
        },
        images: [
          'https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&dpr=1',
          'https://images.pexels.com/photos/1393383/pexels-photo-1393383.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&dpr=1',
        ],
        stock: 200,
        inStock: true,
        isOrganic: true,
        harvestDate: '2023-12-20',
        expiryDate: '2024-12-20',
        nutritionInfo: {
          calories: 130,
          protein: 2.7,
          carbs: 28,
          fiber: 0.4,
        },
        tags: ['organic', 'red-rice', 'traditional'],
        rating: 4.5,
        reviewCount: 67,
        createdAt: '2024-01-05T00:00:00Z',
      },
      {
        id: '4',
        name: 'Fresh Spinach',
        description: 'Crispy green spinach leaves, perfect for salads and cooking',
        price: 120,
        unit: 'bunch',
        category: 'Vegetables',
        farmer: {
          id: 'f1',
          name: 'Farmer John',
          farmName: 'Green Valley Farm',
          location: 'Kandy, Sri Lanka',
          rating: 4.8,
        },
        images: [
          'https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&dpr=1',
        ],
        stock: 30,
        inStock: true,
        isOrganic: true,
        harvestDate: '2024-01-17',
        expiryDate: '2024-01-22',
        nutritionInfo: {
          calories: 23,
          protein: 2.9,
          carbs: 3.6,
          fiber: 2.2,
        },
        tags: ['organic', 'leafy-greens', 'fresh'],
        rating: 4.6,
        reviewCount: 18,
        createdAt: '2024-01-15T00:00:00Z',
      },
      {
        id: '5',
        name: 'Ripe Bananas',
        description: 'Sweet, naturally ripened bananas from local plantations',
        price: 150,
        unit: 'dozen',
        category: 'Fruits',
        farmer: {
          id: 'f4',
          name: 'Farmer Fernando',
          farmName: 'Tropical Fruits',
          location: 'Matale, Sri Lanka',
          rating: 4.7,
        },
        images: [
          'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&dpr=1',
        ],
        stock: 80,
        inStock: true,
        isOrganic: false,
        harvestDate: '2024-01-14',
        expiryDate: '2024-01-21',
        nutritionInfo: {
          calories: 89,
          protein: 1.1,
          carbs: 22.8,
          fiber: 2.6,
        },
        tags: ['sweet', 'ripe', 'local'],
        rating: 4.4,
        reviewCount: 32,
        createdAt: '2024-01-08T00:00:00Z',
      },
      {
        id: '6',
        name: 'Ceylon Cinnamon',
        description: 'Authentic Ceylon cinnamon sticks, world-renowned spice',
        price: 800,
        unit: '100g',
        category: 'Spices',
        farmer: {
          id: 'f5',
          name: 'Farmer Jayawardena',
          farmName: 'Spice Garden',
          location: 'Matara, Sri Lanka',
          rating: 4.9,
        },
        images: [
          'https://images.pexels.com/photos/1340116/pexels-photo-1340116.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&dpr=1',
        ],
        stock: 25,
        inStock: true,
        isOrganic: true,
        harvestDate: '2023-11-15',
        expiryDate: '2025-11-15',
        nutritionInfo: {
          calories: 247,
          protein: 4,
          carbs: 81,
          fiber: 53,
        },
        tags: ['ceylon', 'authentic', 'premium'],
        rating: 4.8,
        reviewCount: 89,
        createdAt: '2023-12-01T00:00:00Z',
      },
    ];

    // Apply filters
    let filteredProducts = [...mockProducts];
    
    if (filters.category) {
      filteredProducts = filteredProducts.filter(p => 
        p.category.toLowerCase() === filters.category.toLowerCase()
      );
    }
    
    if (filters.inStock) {
      filteredProducts = filteredProducts.filter(p => p.inStock);
    }
    
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      filteredProducts = filteredProducts.filter(p => p.price >= min && p.price <= max);
    }

    return {
      products: filteredProducts,
      totalProducts: filteredProducts.length,
      totalPages: Math.ceil(filteredProducts.length / (filters.limit || 12)),
    };
  },

  mockGetCategories: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return [
      { id: '1', name: 'Vegetables', count: 45, icon: '🥬' },
      { id: '2', name: 'Fruits', count: 32, icon: '🍎' },
      { id: '3', name: 'Grains', count: 18, icon: '🌾' },
      { id: '4', name: 'Spices', count: 25, icon: '🌶️' },
      { id: '5', name: 'Herbs', count: 15, icon: '🌿' },
      { id: '6', name: 'Dairy', count: 12, icon: '🥛' },
    ];
  },

  mockGetSeasonalProducts: async () => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return [
      {
        id: '1',
        name: 'Organic Tomatoes',
        price: 250,
        image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
        season: 'Winter',
        availability: 'Peak Season',
      },
      {
        id: '3',
        name: 'Organic Rice',
        price: 180,
        image: 'https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
        season: 'Year Round',
        availability: 'Available',
      },
    ];
  },
};