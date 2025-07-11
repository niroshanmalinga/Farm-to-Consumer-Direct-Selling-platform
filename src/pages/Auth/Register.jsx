import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  MapPin, 
  Tractor,
  Building,
  FileText
} from 'lucide-react';
import { registerUser, clearError } from '../../store/slices/authSlice';
import Button from '../../components/UI/Button';
import toast from 'react-hot-toast';

const baseSchema = {
  userType: yup
    .string()
    .oneOf(['consumer', 'farmer'], 'Please select a user type')
    .required('User type is required'),
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .required('Full name is required'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
    .matches(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
    .matches(/(?=.*\d)/, 'Password must contain at least one number')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  phone: yup
    .string()
    .matches(/^(\+94|0)[0-9]{9}$/, 'Please enter a valid Sri Lankan phone number')
    .required('Phone number is required'),
  location: yup
    .string()
    .required('Location is required'),
  terms: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions'),
};

const farmerSchema = yup.object({
  ...baseSchema,
  farmName: yup
    .string()
    .min(2, 'Farm name must be at least 2 characters')
    .required('Farm name is required'),
  bio: yup
    .string()
    .min(10, 'Bio must be at least 10 characters')
    .max(500, 'Bio must not exceed 500 characters')
    .required('Bio is required'),
});

const consumerSchema = yup.object(baseSchema);

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [searchParams] = useSearchParams();
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { isLoading, error, isAuthenticated } = useSelector((state) => state.auth);

  const defaultUserType = searchParams.get('type') === 'farmer' ? 'farmer' : 'consumer';

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(watch('userType') === 'farmer' ? farmerSchema : consumerSchema),
    defaultValues: {
      userType: defaultUserType,
    },
  });

  const userType = watch('userType');

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Clear errors when component mounts
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const onSubmit = async (data) => {
    try {
      // Remove confirmPassword from data
      const { confirmPassword, terms, ...userData } = data;
      
      // Use mock registration for development
      const mockResponse = await mockRegister(userData);
      dispatch({
        type: 'auth/register/fulfilled',
        payload: mockResponse,
      });
      
      toast.success('Registration successful! Welcome to FarmFresh!');
      navigate(userType === 'farmer' ? '/farmer/dashboard' : '/', { replace: true });
    } catch (error) {
      toast.error(error.message || 'Registration failed');
    }
  };

  // Mock registration function for development
  const mockRegister = async (userData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockUser = {
      id: Date.now().toString(),
      ...userData,
      avatar: `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1`,
      emailVerified: false,
      createdAt: new Date().toISOString(),
      ...(userData.userType === 'farmer' && {
        certifications: [],
        totalProducts: 0,
        rating: 0,
        reviewCount: 0,
      }),
    };

    const mockToken = 'mock-jwt-token-' + Date.now();

    return {
      user: mockUser,
      token: mockToken,
    };
  };

  const sriLankanCities = [
    'Colombo', 'Kandy', 'Galle', 'Jaffna', 'Negombo', 'Anuradhapura', 
    'Polonnaruwa', 'Batticaloa', 'Matara', 'Ratnapura', 'Kurunegala', 
    'Puttalam', 'Kalutara', 'Gampaha', 'Matale', 'Hambantota', 'Trincomalee'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-cream-50 to-earth-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
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
              Join FarmFresh
            </h2>
            <p className="text-gray-600">
              Create your account and start your fresh food journey
            </p>
          </div>

          {/* Registration Form */}
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
                  I want to join as a
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

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      id="name"
                      type="text"
                      {...register('name')}
                      className={`
                        input-field pl-10
                        ${errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
                      `}
                      placeholder="Enter your full name"
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
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
              </div>

              {/* Phone and Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      id="phone"
                      type="tel"
                      {...register('phone')}
                      className={`
                        input-field pl-10
                        ${errors.phone ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
                      `}
                      placeholder="+94 77 123 4567"
                    />
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                  )}
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <select
                      id="location"
                      {...register('location')}
                      className={`
                        input-field pl-10 appearance-none
                        ${errors.location ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
                      `}
                    >
                      <option value="">Select your city</option>
                      {sriLankanCities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  {errors.location && (
                    <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
                  )}
                </div>
              </div>

              {/* Farmer-specific fields */}
              {userType === 'farmer' && (
                <div className="space-y-6 border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900">Farm Information</h3>
                  
                  {/* Farm Name */}
                  <div>
                    <label htmlFor="farmName" className="block text-sm font-medium text-gray-700 mb-2">
                      Farm Name
                    </label>
                    <div className="relative">
                      <input
                        id="farmName"
                        type="text"
                        {...register('farmName')}
                        className={`
                          input-field pl-10
                          ${errors.farmName ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
                        `}
                        placeholder="Enter your farm name"
                      />
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                    {errors.farmName && (
                      <p className="mt-1 text-sm text-red-600">{errors.farmName.message}</p>
                    )}
                  </div>

                  {/* Bio */}
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                      About Your Farm
                    </label>
                    <div className="relative">
                      <textarea
                        id="bio"
                        rows={4}
                        {...register('bio')}
                        className={`
                          input-field pl-10 resize-none
                          ${errors.bio ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
                        `}
                        placeholder="Tell us about your farm, farming practices, and what makes your produce special..."
                      />
                      <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    </div>
                    {errors.bio && (
                      <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      {...register('password')}
                      className={`
                        input-field pl-10 pr-10
                        ${errors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
                      `}
                      placeholder="Create a strong password"
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

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      {...register('confirmPassword')}
                      className={`
                        input-field pl-10 pr-10
                        ${errors.confirmPassword ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
                      `}
                      placeholder="Confirm your password"
                    />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>

              {/* Terms and Conditions */}
              <div>
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    {...register('terms')}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1"
                  />
                  <span className="text-sm text-gray-600">
                    I agree to the{' '}
                    <Link to="/terms" className="text-primary-600 hover:text-primary-500 font-medium">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-primary-600 hover:text-primary-500 font-medium">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
                {errors.terms && (
                  <p className="mt-1 text-sm text-red-600">{errors.terms.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                loading={isLoading}
                fullWidth
                size="lg"
              >
                Create Account
              </Button>
            </form>

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;