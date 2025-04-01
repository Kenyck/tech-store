import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <Link to="/">
        <img src={logo} alt="Tech Store Logo" className="h-10" />
      </Link>
      <Link to="/admin" className="text-white bg-yellow-500 px-4 py-2 rounded">Administração</Link>
    </nav>
  );
};

export default Navbar;