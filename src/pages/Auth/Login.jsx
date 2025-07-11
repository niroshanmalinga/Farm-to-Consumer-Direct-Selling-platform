import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Tractor } from 'lucide-react';
import { loginUser, clearError } from '../../store/slices/authSlice';
import Button from '../../components/UI/Button';
import toast from 'react-hot-toast';

const schema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  userType: yup
    .string()
    .oneOf(['consumer', 'farmer'], 'Please select a user type')
    .required('User type is required'),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { isLoading, error, isAuthenticated, user } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      userType: 'consumer',
    },
  });

  const userType = watch('userType');

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      const from = location.state?.from?.pathname || 
                   (user.userType === 'farmer' ? '/farmer/dashboard' : '/');
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, user, navigate, location]);

  // Clear errors when component mounts
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const onSubmit = async (data) => {
    try {
      // Use mock login for development
      const mockResponse = await mockLogin(data.email, data.password, data.userType);
      dispatch({
        type: 'auth/login/fulfilled',
        payload: mockResponse,
      });
      
      toast.success('Login successful!');
      
      const from = location.state?.from?.pathname || 
                   (data.userType === 'farmer' ? '/farmer/dashboard' : '/');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message || 'Login failed');
    }
  };

  // Mock login function for development
  const mockLogin = async (email, password, userType) => {
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-cream-50 to-earth-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center">
            <Link to="/" className="inline-flex items-center space-x-2 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">🌱</span>
              </div>
              <div>
                <h1 className="font-display font-bold text-2xl text-gray-900">
                  Farm<span className="text-primary-500">Fresh</span>
                </h1>
              </div>
            </Link>
            
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600">
              Sign in to your account to continue
            </p>
          </div>

          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* User Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  I am a
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="relative">
                    <input
                      type="radio"
                      value="consumer"
                      {...register('userType')}
                      className="sr-only"
                    />
                    <div className={`
                      flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200
                      ${userType === 'consumer' 
                        ? 'border-primary-500 bg-primary-50 text-primary-700' 
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}>
                      <User className="w-5 h-5 mr-2" />
                      <span className="font-medium">Consumer</span>
                    </div>
                  </label>
                  
                  <label className="relative">
                    <input
                      type="radio"
                      value="farmer"
                      {...register('userType')}
                      className="sr-only"
                    />
                    <div className={`
                      flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200
                      ${userType === 'farmer' 
                        ? 'border-primary-500 bg-primary-50 text-primary-700' 
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}>
                      <Tractor className="w-5 h-5 mr-2" />
                      <span className="font-medium">Farmer</span>
                    </div>
                  </label>
                </div>
                {errors.userType && (
                  <p className="mt-1 text-sm text-red-600">{errors.userType.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    {...register('email')}
                    className={`
                      input-field pl-10
                      ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
                    `}
                    placeholder="Enter your email"
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    {...register('password')}
                    className={`
                      input-field pl-10 pr-10
                      ${errors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
                    `}
                    placeholder="Enter your password"
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary-600 hover:text-primary-500 font-medium"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                loading={isLoading}
                fullWidth
                size="lg"
              >
                Sign In
              </Button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </motion.div>

          {/* Demo Credentials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-blue-50 border border-blue-200 rounded-xl p-4"
          >
            <h3 className="text-sm font-medium text-blue-800 mb-2">Demo Credentials</h3>
            <div className="text-xs text-blue-700 space-y-1">
              <p><strong>Consumer:</strong> consumer@demo.com / password123</p>
              <p><strong>Farmer:</strong> farmer@demo.com / password123</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;