import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ isAdmin, children }) => {
  if (!isAdmin) {
    // Se o usuário não for admin, redireciona para a página inicial
    return <Navigate to="/" />;
  }

  return children; // Se for admin, renderiza o conteúdo da página
};

export default PrivateRoute;