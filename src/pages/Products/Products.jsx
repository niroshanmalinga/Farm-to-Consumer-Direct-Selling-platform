import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Filter,
  Search,
  Grid,
  List,
  Star,
  MapPin,
  ShoppingCart,
  Heart,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { 
  fetchProducts, 
  updateFilters, 
  clearFilters,
  setCurrentPage 
} from '../../store/slices/productSlice';
import { addToCart } from '../../store/slices/cartSlice';
import Button from '../../components/UI/Button';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import Modal from '../../components/UI/Modal';
import toast from 'react-hot-toast';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  
  const dispatch = useDispatch();
  const { 
    products, 
    categories, 
    filters, 
    pagination, 
    isLoading 
  } = useSelector((state) => state.products);

  // Mock data loading
  useEffect(() => {
    const loadMockData = async () => {
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
          ],
          stock: 50,
          inStock: true,
          isOrganic: true,
          rating: 4.7,
          reviewCount: 23,
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
          ],
          stock: 100,
          inStock: true,
          isOrganic: false,
          rating: 4.9,
          reviewCount: 45,
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
          ],
          stock: 200,
          inStock: true,
          isOrganic: true,
          rating: 4.5,
          reviewCount: 67,
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
          rating: 4.6,
          reviewCount: 18,
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
          rating: 4.4,
          reviewCount: 32,
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
          rating: 4.8,
          reviewCount: 89,
        },
      ];

      const mockCategories = [
        { id: '1', name: 'Vegetables', count: 45 },
        { id: '2', name: 'Fruits', count: 32 },
        { id: '3', name: 'Grains', count: 18 },
        { id: '4', name: 'Spices', count: 25 },
        { id: '5', name: 'Herbs', count: 15 },
        { id: '6', name: 'Dairy', count: 12 },
      ];

      setTimeout(() => {
        dispatch({ 
          type: 'products/fetchProducts/fulfilled', 
          payload: { 
            products: mockProducts, 
            totalProducts: mockProducts.length, 
            totalPages: 1 
          } 
        });
        dispatch({ type: 'products/fetchCategories/fulfilled', payload: mockCategories });
      }, 1000);
    };

    loadMockData();
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart({ product, quantity: 1 }));
    toast.success(`${product.name} added to cart!`);
  };

  const handleFilterChange = (filterType, value) => {
    dispatch(updateFilters({ [filterType]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ search: searchQuery });
      dispatch(updateFilters({ search: searchQuery }));
    }
  };

  const clearAllFilters = () => {
    dispatch(clearFilters());
    setSearchQuery('');
    setSearchParams({});
  };

  const ProductCard = ({ product }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
    >
      <div className="relative overflow-hidden">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {product.isOrganic && (
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Organic
            </span>
          )}
          {!product.inStock && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Out of Stock
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200">
          <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
        </button>
      </div>

      <div className="p-6">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg text-gray-900 mb-2 hover:text-primary-600 transition-colors duration-200">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Farmer Info */}
        <div className="flex items-center space-x-2 mb-3">
          <img
            src={`https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=1`}
            alt={product.farmer.name}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="text-sm text-gray-600">{product.farmer.name}</span>
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-xs text-gray-500">{product.farmer.rating}</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center space-x-1 mb-4">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-500">{product.farmer.location}</span>
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary-600">
              Rs. {product.price}
            </span>
            <span className="text-sm text-gray-500 ml-1">per {product.unit}</span>
          </div>
          
          <Button
            onClick={() => handleAddToCart(product)}
            disabled={!product.inStock}
            size="sm"
            leftIcon={<ShoppingCart className="w-4 h-4" />}
          >
            Add to Cart
          </Button>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-gray-500">({product.reviewCount})</span>
          </div>
          <span className="text-sm text-gray-500">
            {product.stock} {product.unit} available
          </span>
        </div>
      </div>
    </motion.div>
  );

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center space-x-3">
              <input
                type="radio"
                name="category"
                value={category.name.toLowerCase()}
                checked={filters.category === category.name.toLowerCase()}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              />
              <span className="text-sm text-gray-700">{category.name}</span>
              <span className="text-xs text-gray-500">({category.count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
        <div className="space-y-3">
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.priceRange[0]}
              onChange={(e) => handleFilterChange('priceRange', [parseInt(e.target.value) || 0, filters.priceRange[1]])}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.priceRange[1]}
              onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value) || 1000])}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Availability</h3>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) => handleFilterChange('inStock', e.target.checked)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <span className="text-sm text-gray-700">In Stock Only</span>
        </label>
      </div>

      {/* Sort By */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Sort By</h3>
        <select
          value={filters.sortBy}
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="newest">Newest First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>

      {/* Clear Filters */}
      <Button
        onClick={clearAllFilters}
        variant="outline"
        fullWidth
        size="sm"
      >
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-max section-padding py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-4">
            Fresh Produce
          </h1>
          <p className="text-gray-600">
            Discover fresh, locally-sourced produce from Sri Lankan farmers
          </p>
        </div>

        {/* Search and Controls */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Search Bar */}
          <div className="flex-1">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search for fresh produce..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </form>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Mobile Filter Button */}
            <Button
              onClick={() => setShowFilters(true)}
              variant="outline"
              leftIcon={<SlidersHorizontal className="w-4 h-4" />}
              className="lg:hidden"
            >
              Filters
            </Button>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-white rounded-lg border border-gray-300 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'grid' 
                    ? 'bg-primary-500 text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'list' 
                    ? 'bg-primary-500 text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-gray-900">Filters</h2>
                <Filter className="w-5 h-5 text-gray-400" />
              </div>
              <FilterSidebar />
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Info */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {products.length} of {pagination.totalProducts} products
              </p>
            </div>

            {/* Loading State */}
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <LoadingSpinner size="lg" text="Loading fresh produce..." />
              </div>
            ) : (
              /* Products Grid */
              <AnimatePresence>
                <motion.div
                  layout
                  className={`
                    grid gap-6
                    ${viewMode === 'grid' 
                      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                      : 'grid-cols-1'
                    }
                  `}
                >
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </motion.div>
              </AnimatePresence>
            )}

            {/* Empty State */}
            {!isLoading && products.length === 0 && (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <Button onClick={clearAllFilters} variant="outline">
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <Modal
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        title="Filters"
        size="sm"
      >
        <FilterSidebar />
      </Modal>
    </div>
  );
};

export default Products;