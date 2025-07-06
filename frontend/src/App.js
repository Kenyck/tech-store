import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ManageProducts from './pages/ManageProducts';
import Login from './pages/Login';
import Register from './pages/RegisterPage';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import CartPage from './pages/CartPage';

import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

function AppContent() {
  const { loading } = useAuth();

  if (loading) return null; 

  return (
    <>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <ManageProducts />
              </PrivateRoute>
            }
          />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          <Route path="/cart" element={<CartPage />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;