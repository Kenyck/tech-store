import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null; // ou um spinner de carregamento

  return !isAuthenticated ? children : <Navigate to="/" />;
};

export default PublicRoute;