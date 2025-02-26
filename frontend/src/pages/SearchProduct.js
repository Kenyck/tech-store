import React, { useEffect, useState } from 'react';
import api from '../axios';

const SearchProduct = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Produtos Cadastrados</h1>
      <ul className="space-y-2">
        {products.map((product) => (
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

export default SearchProduct;