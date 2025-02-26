import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '' });

  // Função para buscar produtos
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  // Função para adicionar um produto
  const addProduct = async (e) => {
    e.preventDefault();
  
    const productData = {
      name: newProduct.name,
      price: parseFloat(newProduct.price),  // Certifique-se de que o preço seja um número
      stock: parseInt(newProduct.stock),     // Certifique-se de que o estoque seja um número
    };
  
    try {
      // Enviando a requisição POST
      const response = await axios.post('http://localhost:5000/products', productData, {
        headers: {
          'Content-Type': 'application/json',  // Adiciona o header correto para enviar dados JSON
        },
      });
  
      console.log('Produto adicionado:', response.data);
      fetchProducts(); // Recarregar os produtos após adicionar
      setNewProduct({ name: '', price: '', stock: '' }); // Limpar o formulário
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
    }
  };

  // Função para lidar com o filtro de busca
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center mb-6">Tech Store</h1>

      {/* Formulário para adicionar produto */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Adicionar Produto</h2>
        <form onSubmit={addProduct} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nome do Produto</label>
            <input
              type="text"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Preço</label>
            <input
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Estoque</label>
            <input
              type="number"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Adicionar Produto
          </button>
        </form>
      </div>

      {/* Campo de pesquisa */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Pesquisar produtos"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Lista de Produtos */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Produtos</h2>
        {filteredProducts.length > 0 ? (
          <ul>
            {filteredProducts.map((product) => (
              <li key={product.id} className="mb-4 p-4 border rounded-md shadow-md">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p>Preço: R$ {product.price}</p>
                <p>Estoque: {product.stock}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum produto encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default Home;