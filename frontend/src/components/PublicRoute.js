import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ isAuthenticated, children }) => {
  // Se o usuário já estiver logado, redireciona para a Home
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  // Caso contrário, renderiza o componente (Login ou Register)
  return children;
};

export default PublicRoute;