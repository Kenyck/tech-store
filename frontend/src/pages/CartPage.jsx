import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setLoading(false);
  }, [isAuthenticated, navigate]);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (loading) return <p className="text-center mt-10">Carregando carrinho...</p>;
  if (cartItems.length === 0) return <p className="text-center mt-10">Seu carrinho está vazio.</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Meu Carrinho</h2>
      <button
        onClick={clearCart}
        className="mb-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
        Limpar Carrinho
      </button>

      <ul className="space-y-4">
        {cartItems.map(item => (
          <li key={item.id} className="border p-4 rounded shadow-sm">
            <p className="font-semibold">{item.product_name}</p>
            <p>Preço: R$ {item.price.toFixed(2)}</p>
            <div className="flex items-center mt-2 gap-2">
              <label htmlFor={`qty-${item.id}`} className="mr-2">Quantidade:</label>
              <input
                id={`qty-${item.id}`}
                type="number"
                min="1"
                value={item.quantity}
                onChange={e => updateQuantity(item.product_id, parseInt(e.target.value))}
                className="w-20 p-1 border rounded"
              />
            </div>
            <button
              onClick={() => removeFromCart(item.product_id)}
              className="mt-2 bg-gray-300 hover:bg-gray-400 text-black px-3 py-1 rounded"
            >
              Remover
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-right font-semibold text-lg">
        Total: R$ {total.toFixed(2)}
      </div>
    </div>
  );
}

export default CartPage;