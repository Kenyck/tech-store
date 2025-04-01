import React, { useEffect, useState } from 'react';
import api from '../axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

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

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Produtos Disponíveis</h1>
      <input
        type="text"
        placeholder="Pesquisar produtos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
      />
      <ul className="space-y-2">
        {filteredProducts.map((product) => (
          <li key={product.id} className="border p-4">
            <h2 className="font-bold">{product.name}</h2>
            <p>Preço: R${product.price}</p>
            <p>Em estoque: {product.stock}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;