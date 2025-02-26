import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="text-white">Início</Link>
        </li>
        <li>
          <Link to="/add" className="text-white">Cadastrar Produto</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;