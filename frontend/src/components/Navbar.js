import logo from '../assets/logo.png';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Navbar = ({ isAdmin, setIsAdmin }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    setIsAdmin(false);
    toast.success('Logout realizado com sucesso!');
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
        <img src={logo} alt="Tech Store Logo" className="h-10" />
      </div>

      {/* Botões */}
      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link
            to="/admin"
            className="text-white hover:text-yellow-400 font-semibold"
          >
            Administração
          </Link>
        )}
        {isAdmin ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded"
          >
            Sair
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-4 rounded"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;