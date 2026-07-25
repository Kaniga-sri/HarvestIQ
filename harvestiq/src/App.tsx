import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProtectedRoute } from './components/common/ProtectedRoute';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { FarmerDashboard } from './pages/FarmerDashboard';
import { AddProductPage } from './pages/AddProductPage';
import { ManageProductsPage } from './pages/ManageProductsPage';
import { ConsumerDashboard } from './pages/ConsumerDashboard';
import { MarketplacePage } from './pages/MarketplacePage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderHistoryPage } from './pages/OrderHistoryPage';
import { UserProfilePage } from './pages/UserProfilePage';
import { AdminDashboard } from './pages/AdminDashboard';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />

            {/* Protected Farmer Routes */}
            <Route
              path="/farmer-dashboard"
              element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <FarmerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-product"
              element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <AddProductPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-products"
              element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <ManageProductsPage />
                </ProtectedRoute>
              }
            />

            {/* Protected Consumer Routes */}
            <Route
              path="/consumer-dashboard"
              element={
                <ProtectedRoute allowedRoles={['consumer', 'farmer', 'admin']}>
                  <ConsumerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order-history"
              element={
                <ProtectedRoute allowedRoles={['consumer', 'farmer', 'admin']}>
                  <OrderHistoryPage />
                </ProtectedRoute>
              }
            />

            {/* Protected Admin Routes */}
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Authenticated Routes (Any Role) */}
            <Route
              path="/checkout"
              element={
                <ProtectedRoute allowedRoles={['consumer', 'farmer', 'admin']}>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute allowedRoles={['consumer', 'farmer', 'admin']}>
                  <UserProfilePage />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
