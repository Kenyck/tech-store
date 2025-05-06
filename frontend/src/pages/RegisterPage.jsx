import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  // Verifica se o usuário já está logado
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Se o token existir, redireciona para a página inicial
      navigate('/');
    }
  }, [navigate]);

  const validate = () => {
    if (username.length < 3) {
      toast.error('O nome de usuário deve ter ao menos 3 caracteres.');
      return false;
    }
    if (password.length < 6) {
      toast.error('A senha deve ter ao menos 6 caracteres.');
      return false;
    }
    if (password !== confirmPassword) {
      toast.error('As senhas não coincidem.');
      return false;
    }
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Cadastro realizado com sucesso!');
        navigate('/login');
      } else {
        toast.error(data.error || 'Erro ao realizar cadastro.');
      }
    } catch (err) {
      toast.error('Erro na conexão com o servidor.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Cadastro</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Senha</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Confirmar Senha</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-600"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default Register;