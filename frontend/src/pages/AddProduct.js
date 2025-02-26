import React, { useState } from 'react';
import api from '../axios';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    const product = { name, price, stock };

    try {
      const response = await api.post('/products', product);
      setMessage('Produto cadastrado com sucesso!');
      setName('');
      setPrice('');
      setStock('');
    } catch (error) {
      setError('Erro ao cadastrar produto. Verifique os dados.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Adicionar Produto</h2>

        {message && <p className="text-green-600 text-sm">{message}</p>}
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <form onSubmit={handleAddProduct} className="space-y-4">
          <input
            type="text"
            placeholder="Nome do Produto"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="number"
            placeholder="Preço"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="number"
            placeholder="Quantidade em Estoque"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Adicionar
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;