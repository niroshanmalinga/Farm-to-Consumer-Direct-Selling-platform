import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/Auth/ProtectedRoute';

// Pages
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Products from './pages/Products/Products';

function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route path="farmers" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl font-bold">Farmers Page - Coming Soon</h1></div>} />
              <Route path="about" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl font-bold">About Page - Coming Soon</h1></div>} />
              <Route path="contact" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl font-bold">Contact Page - Coming Soon</h1></div>} />
              
              {/* Protected Consumer Routes */}
              <Route 
                path="profile" 
                element={
                  <ProtectedRoute requiredUserType="consumer">
                    <div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl font-bold">Consumer Profile - Coming Soon</h1></div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="orders" 
                element={
                  <ProtectedRoute requiredUserType="consumer">
                    <div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl font-bold">Orders Page - Coming Soon</h1></div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="favorites" 
                element={
                  <ProtectedRoute requiredUserType="consumer">
                    <div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl font-bold">Favorites Page - Coming Soon</h1></div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="checkout" 
                element={
                  <ProtectedRoute>
                    <div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl font-bold">Checkout Page - Coming Soon</h1></div>
                  </ProtectedRoute>
                } 
              />
              
              {/* Protected Farmer Routes */}
              <Route 
                path="farmer/dashboard" 
                element={
                  <ProtectedRoute requiredUserType="farmer">
                    <div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl font-bold">Farmer Dashboard - Coming Soon</h1></div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="farmer/profile" 
                element={
                  <ProtectedRoute requiredUserType="farmer">
                    <div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl font-bold">Farmer Profile - Coming Soon</h1></div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="farmer/products" 
                element={
                  <ProtectedRoute requiredUserType="farmer">
                    <div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl font-bold">Farmer Products - Coming Soon</h1></div>
                  </ProtectedRoute>
                } 
              />
            </Route>

            {/* Auth Routes (outside of main layout) */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* 404 Page */}
            <Route 
              path="*" 
              element={
                <div className="min-h-screen bg-cream-50 flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-6xl font-bold text-primary-500 mb-4">404</h1>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Page Not Found</h2>
                    <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
                    <a href="/" className="btn-primary">Go Home</a>
                  </div>
                </div>
              } 
            />
          </Routes>
        </Router>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;