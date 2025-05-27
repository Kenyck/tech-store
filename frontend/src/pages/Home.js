import React, { useEffect, useState } from 'react';
import api from '../axios';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const { addToCart } = useCart();

  // Verifica se há token no localStorage
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        toast.error('Erro ao buscar produtos');
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      await addToCart(product);
    } catch (error) {
      console.error('Erro ao adicionar produto ao carrinho:', error);
      toast.error('Erro ao adicionar ao carrinho');
    }
  };

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
          <li key={product.id} className="border p-4 rounded shadow">
            <h2 className="font-bold text-lg">{product.name}</h2>
            <p>Preço: R$ {product.price.toFixed(2)}</p>
            <p>Em estoque: {product.stock}</p>
            {isLoggedIn && (
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-3 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Adicionar ao Carrinho
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;