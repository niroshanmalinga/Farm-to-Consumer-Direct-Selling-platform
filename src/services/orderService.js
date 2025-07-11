import api from './api';

export const orderService = {
  // Create new order
  createOrder: async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response;
  },

  // Get user orders
  getOrders: async () => {
    const response = await api.get('/orders');
    return response;
  },

  // Get order by ID
  getOrderById: async (orderId) => {
    const response = await api.get(`/orders/${orderId}`);
    return response;
  },

  // Update order status
  updateOrderStatus: async (orderId, status) => {
    const response = await api.put(`/orders/${orderId}/status`, { status });
    return response;
  },

  // Cancel order
  cancelOrder: async (orderId) => {
    const response = await api.put(`/orders/${orderId}/cancel`);
    return response;
  },

  // Get order tracking info
  getOrderTracking: async (orderId) => {
    const response = await api.get(`/orders/${orderId}/tracking`);
    return response;
  },

  // Mock data for development
  mockCreateOrder: async (orderData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockOrder = {
      id: 'ORD-' + Date.now(),
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      trackingNumber: 'TRK-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    };

    return mockOrder;
  },

  mockGetOrders: async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return [
      {
        id: 'ORD-1705123456789',
        items: [
          {
            id: '1',
            name: 'Organic Tomatoes',
            price: 250,
            quantity: 2,
            image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
          },
          {
            id: '2',
            name: 'Fresh Coconuts',
            price: 80,
            quantity: 5,
            image: 'https://images.pexels.com/photos/1002543/pexels-photo-1002543.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
          },
        ],
        totalAmount: 900,
        status: 'delivered',
        createdAt: '2024-01-10T10:30:00Z',
        deliveredAt: '2024-01-12T14:20:00Z',
        farmer: {
          name: 'Farmer John',
          farmName: 'Green Valley Farm',
        },
        deliveryAddress: {
          street: '123 Main Street',
          city: 'Colombo',
          postalCode: '00100',
        },
        trackingNumber: 'TRK-ABC123DEF',
      },
      {
        id: 'ORD-1705123456790',
        items: [
          {
            id: '3',
            name: 'Organic Rice',
            price: 180,
            quantity: 5,
            image: 'https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
          },
        ],
        totalAmount: 900,
        status: 'out_for_delivery',
        createdAt: '2024-01-15T09:15:00Z',
        estimatedDelivery: '2024-01-18T16:00:00Z',
        farmer: {
          name: 'Farmer Perera',
          farmName: 'Heritage Rice Farm',
        },
        deliveryAddress: {
          street: '456 Garden Road',
          city: 'Kandy',
          postalCode: '20000',
        },
        trackingNumber: 'TRK-XYZ789GHI',
      },
    ];
  },
};