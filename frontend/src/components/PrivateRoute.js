import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, isAdmin }) => {
  if (!isAdmin) {
    // Se não for admin, redireciona para login
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;