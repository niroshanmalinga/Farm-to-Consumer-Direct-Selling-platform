import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  ArrowRight,
  Leaf,
  Users,
  Shield,
  Star,
  MapPin,
  Clock,
  TrendingUp,
  Heart,
} from 'lucide-react';
import { fetchSeasonalProducts, fetchCategories } from '../../store/slices/productSlice';
import { fetchFarmers } from '../../store/slices/farmerSlice';
import Button from '../../components/UI/Button';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const Home = () => {
  const dispatch = useDispatch();
  const { seasonalProducts, categories } = useSelector((state) => state.products);
  const { farmers } = useSelector((state) => state.farmers);

  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [productsRef, productsInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [farmersRef, farmersInView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    // Mock data loading
    const loadMockData = async () => {
      // Mock seasonal products
      const mockSeasonalProducts = [
        {
          id: '1',
          name: 'Organic Tomatoes',
          price: 250,
          image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
          season: 'Winter',
          availability: 'Peak Season',
        },
        {
          id: '2',
          name: 'Fresh Coconuts',
          price: 80,
          image: 'https://images.pexels.com/photos/1002543/pexels-photo-1002543.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
          season: 'Year Round',
          availability: 'Available',
        },
        {
          id: '3',
          name: 'Ceylon Cinnamon',
          price: 800,
          image: 'https://images.pexels.com/photos/1340116/pexels-photo-1340116.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
          season: 'Year Round',
          availability: 'Premium',
        },
      ];

      // Mock categories
      const mockCategories = [
        { id: '1', name: 'Vegetables', count: 45, icon: '🥬' },
        { id: '2', name: 'Fruits', count: 32, icon: '🍎' },
        { id: '3', name: 'Grains', count: 18, icon: '🌾' },
        { id: '4', name: 'Spices', count: 25, icon: '🌶️' },
        { id: '5', name: 'Herbs', count: 15, icon: '🌿' },
        { id: '6', name: 'Dairy', count: 12, icon: '🥛' },
      ];

      // Mock farmers
      const mockFarmers = [
        {
          id: 'f1',
          name: 'Farmer John',
          farmName: 'Green Valley Farm',
          location: 'Kandy, Sri Lanka',
          avatar: 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
          rating: 4.8,
          reviewCount: 156,
          specialties: ['Vegetables', 'Herbs'],
        },
        {
          id: 'f2',
          name: 'Farmer Silva',
          farmName: 'Coconut Grove',
          location: 'Galle, Sri Lanka',
          avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
          rating: 4.9,
          reviewCount: 203,
          specialties: ['Coconuts', 'Tropical Fruits'],
        },
      ];

      // Simulate API calls
      setTimeout(() => {
        dispatch({ type: 'products/fetchSeasonalProducts/fulfilled', payload: mockSeasonalProducts });
        dispatch({ type: 'products/fetchCategories/fulfilled', payload: mockCategories });
        dispatch({ type: 'farmers/fetchFarmers/fulfilled', payload: mockFarmers });
      }, 1000);
    };

    loadMockData();
  }, [dispatch]);

  const features = [
    {
      icon: Leaf,
      title: 'Fresh & Organic',
      description: 'Direct from farm to your table with no middlemen',
      color: 'text-green-500',
      bgColor: 'bg-green-100',
    },
    {
      icon: Users,
      title: 'Support Local Farmers',
      description: 'Empowering Sri Lankan farmers and rural communities',
      color: 'text-blue-500',
      bgColor: 'bg-blue-100',
    },
    {
      icon: Shield,
      title: 'Quality Guaranteed',
      description: 'Premium quality assurance with every purchase',
      color: 'text-purple-500',
      bgColor: 'bg-purple-100',
    },
    {
      icon: TrendingUp,
      title: 'Fair Pricing',
      description: 'Transparent pricing that benefits both farmers and consumers',
      color: 'text-orange-500',
      bgColor: 'bg-orange-100',
    },
  ];

  const stats = [
    { label: 'Happy Customers', value: '10,000+', icon: Heart },
    { label: 'Local Farmers', value: '500+', icon: Users },
    { label: 'Fresh Products', value: '1,000+', icon: Leaf },
    { label: 'Cities Served', value: '25+', icon: MapPin },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative bg-gradient-to-br from-primary-50 via-cream-50 to-earth-50 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1')] bg-cover bg-center opacity-10"></div>
        
        <div className="relative container-max section-padding py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium"
                >
                  <Leaf className="w-4 h-4" />
                  <span>Farm to Table Excellence</span>
                </motion.div>
                
                <h1 className="text-4xl lg:text-6xl font-display font-bold text-gray-900 leading-tight">
                  Fresh Produce
                  <span className="block text-primary-500">
                    Direct from
                  </span>
                  <span className="block text-earth-500">
                    Sri Lankan Farms
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Connect directly with local farmers and enjoy the freshest, 
                  highest quality produce while supporting sustainable agriculture 
                  in Sri Lanka.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              >
                <Button
                  as={Link}
                  to="/products"
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  Shop Fresh Produce
                </Button>
                <Button
                  as={Link}
                  to="/register?type=farmer"
                  variant="outline"
                  size="lg"
                >
                  Join as Farmer
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8"
              >
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-xl mb-2 mx-auto">
                      <stat.icon className="w-6 h-6 text-primary-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative z-10">
                <img
                  src="https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&dpr=1"
                  alt="Fresh Sri Lankan Produce"
                  className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </div>
              
              {/* Floating Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Same Day Delivery</div>
                    <div className="text-sm text-gray-500">Fresh to your door</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">4.9/5 Rating</div>
                    <div className="text-sm text-gray-500">Customer satisfaction</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-white">
        <div className="container-max section-padding">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
              Why Choose FarmFresh?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're revolutionizing how Sri Lankans access fresh, quality produce 
              while supporting our local farming communities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center group hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-shadow duration-300`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-max section-padding">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={productsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover fresh produce organized by category for easy shopping
            </p>
          </motion.div>

          <div ref={productsRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={productsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={`/products?category=${category.name.toLowerCase()}`}
                  className="block bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {category.count} items
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Products Section */}
      <section ref={productsRef} className="py-20 bg-white">
        <div className="container-max section-padding">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={productsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
                Seasonal Highlights
              </h2>
              <p className="text-xl text-gray-600">
                Fresh picks that are in season right now
              </p>
            </div>
            <Button
              as={Link}
              to="/products"
              variant="outline"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              View All Products
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {seasonalProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={productsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Link
                  to={`/products/${product.id}`}
                  className="block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {product.availability}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary-500">
                        Rs. {product.price}
                      </span>
                      <span className="text-sm text-gray-500">
                        {product.season}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Farmers Section */}
      <section ref={farmersRef} className="py-20 bg-primary-50">
        <div className="container-max section-padding">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={farmersInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
              Meet Our Farmers
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get to know the dedicated farmers who grow your food with passion and care
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {farmers.slice(0, 2).map((farmer, index) => (
              <motion.div
                key={farmer.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={farmersInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Link
                  to={`/farmers/${farmer.id}`}
                  className="block bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex items-start space-x-6">
                    <img
                      src={farmer.avatar}
                      alt={farmer.name}
                      className="w-20 h-20 rounded-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {farmer.name}
                      </h3>
                      <p className="text-primary-600 font-medium mb-2">
                        {farmer.farmName}
                      </p>
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {farmer.location}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">
                            {farmer.rating} ({farmer.reviewCount})
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {farmer.specialties.map((specialty) => (
                          <span
                            key={specialty}
                            className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={farmersInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-12"
          >
            <Button
              as={Link}
              to="/farmers"
              variant="outline"
              size="lg"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              Meet All Farmers
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-primary-600">
        <div className="container-max section-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-6">
              Ready to Experience Farm-Fresh Quality?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Join thousands of satisfied customers who choose fresh, 
              locally-sourced produce delivered right to their doorstep.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                as={Link}
                to="/products"
                variant="secondary"
                size="lg"
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                Start Shopping
              </Button>
              <Button
                as={Link}
                to="/register?type=farmer"
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary-500"
              >
                Become a Farmer Partner
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;