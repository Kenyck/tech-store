import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ManageProducts from './pages/ManageProducts';
import Login from './pages/Login';
import Register from './pages/RegisterPage';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { Toaster } from 'react-hot-toast';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState('');

  // Ao carregar a app, verifica o token e popula estado
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:5000/api/verify-token', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(r => r.json())
        .then(data => {
          if (data.username) {
            setUsername(data.username);
            setIsAdmin(data.isAdmin);
          } else {
            localStorage.removeItem('token');
          }
        })
        .catch(() => localStorage.removeItem('token'));
    }
  }, []);

  const isAuthenticated = Boolean(username); // ou !!localStorage.getItem('token')

  return (
    <>
      <Navbar
        isAdmin={isAdmin}
        username={username}
        setIsAdmin={setIsAdmin}
        setUsername={setUsername}
      />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container mx-auto p-4">
        <Routes>
          {/* pública: Home */}
          <Route path="/" element={<Home />} />

          {/* admin-only */}
          <Route
            path="/admin"
            element={
              <PrivateRoute isAdmin={isAdmin}>
                <ManageProducts />
              </PrivateRoute>
            }
          />

          {/* somente para quem NÃO está logado */}
          <Route
            path="/login"
            element={
              <PublicRoute isAuthenticated={isAuthenticated}>
                <Login setIsAdmin={setIsAdmin} setUsername={setUsername} />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute isAuthenticated={isAuthenticated}>
                <Register />
              </PublicRoute>
            }
          />

          {/* redireciona qualquer outra URL */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
}

export default App;