import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ManageProducts from './pages/ManageProducts';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import { Toaster } from 'react-hot-toast';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Verifica se o admin está autenticado no localStorage ao carregar a página
    const storedAdmin = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(storedAdmin);
  }, []);

  return (
    <Router>
      <Navbar isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/admin"
            element={
              <PrivateRoute isAdmin={isAdmin}>
                <ManageProducts />
              </PrivateRoute>
            }
          />

          <Route
            path="/login"
            element={<Login setIsAdmin={setIsAdmin} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;