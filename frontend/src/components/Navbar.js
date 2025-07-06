import logo from '../assets/logo.png';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    toast.success('Logout realizado com sucesso!');
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate('/')}
      >
        <img src={logo} alt="Tech Store Logo" className="h-10" />
      </div>

      <div className="flex items-center gap-4 text-white">
        {user?.isAdmin && (
          <Link to="/admin" className="hover:text-yellow-400 font-semibold">
            Gestão de Estoque
          </Link>
        )}

        {isAuthenticated ? (
          <>
            {/* Nome do usuário */}
            <span className="font-semibold">{user.username}</span>

            {/* Botão do Carrinho */}
            <Link
              to="/cart"
              className="relative bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-4 rounded"
            >
              Carrinho
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-xs font-bold px-2 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Botão Sair */}
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded"
            >
              Sair
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-4 rounded"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-1 px-4 rounded"
            >
              Cadastro
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;