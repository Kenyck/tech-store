import React, { useEffect, useState } from 'react';
import api from '../axios';

const SearchProduct = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProducts();
  }, []);

  // Filtra os produtos com base no termo de pesquisa
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg">
        <h1 className="text-xl font-bold text-gray-700 mb-4 text-center">
          Produtos Cadastrados
        </h1>

        {/* Barra de Pesquisa */}
        <input
          type="text"
          placeholder="Buscar produto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />

        {/* Lista de Produtos */}
        <ul className="space-y-2">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <li key={product.id} className="border p-4 rounded-md bg-gray-50">
                <h2 className="font-bold text-gray-800">{product.name}</h2>
                <p className="text-gray-600">Preço: R$ {product.price}</p>
                <p className="text-gray-600">Estoque: {product.stock}</p>
              </li>
            ))
          ) : (
            <p className="text-gray-500 text-center">Nenhum produto encontrado.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SearchProduct;