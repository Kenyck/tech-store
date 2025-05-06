import logo from '../assets/logo.png';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Navbar = ({ isAdmin, username, setIsAdmin, setUsername }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAdmin(false);
    setUsername('');
    toast.success('Logout realizado com sucesso!');
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
        <img src={logo} alt="Tech Store Logo" className="h-10" />
      </div>
      <div className="flex items-center gap-4 text-white">
        {isAdmin && (
          <Link to="/admin" className="hover:text-yellow-400 font-semibold">
            Administração
          </Link>
        )}
        {username ? (
          <>
            <span className="font-semibold">{username}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded"
            >
              Sair
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-4 rounded">
              Login
            </Link>
            <Link to="/register" className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-1 px-4 rounded">
              Cadastro
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;