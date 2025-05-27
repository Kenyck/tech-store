import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from './AuthContext';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const API_URL = 'http://localhost:5000';

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCartItems([]);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Falha ao buscar carrinho');
      }

      const data = await response.json();
      setCartItems(
        data.map(item => ({
          id: item.id,
          product_id: item.product_id,
          product_name: item.product_name,
          price: item.price,
          quantity: item.quantity,
        }))
      );
    } catch (err) {
      console.error('Erro ao buscar carrinho:', err);
      setCartItems([]);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async product => {
    if (!isAuthenticated) {
      toast.error('Você precisa estar logado para adicionar ao carrinho.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/cart`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: product.id,
          quantity: 1,
        }),
      });

      if (!response.ok) throw new Error('Erro ao adicionar no carrinho');

      await fetchCart(); // Atualiza os dados do carrinho com segurança
      toast.success('Produto adicionado ao carrinho!');
    } catch (err) {
      console.error(err);
      toast.error('Erro ao adicionar ao carrinho');
    }
  };

  const removeFromCart = async productId => {
    if (!isAuthenticated) return;
    try {
      const token = localStorage.getItem('token');
      const item = cartItems.find(i => i.product_id === productId);
      if (!item) return;

      const response = await fetch(`${API_URL}/api/cart/${item.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Erro ao remover item');

      await fetchCart(); // Garante que o estado será atualizado corretamente
    } catch (err) {
      console.error(err);
      toast.error('Erro ao remover item');
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (!isAuthenticated) return;

    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const item = cartItems.find(i => i.product_id === productId);
      if (!item) return;

      const response = await fetch(`${API_URL}/api/cart/${item.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
      });

      if (!response.ok) throw new Error('Erro ao atualizar quantidade');

      await fetchCart(); // Garante atualização precisa
    } catch (err) {
      console.error(err);
      toast.error('Erro ao atualizar quantidade');
    }
  };

  const clearCart = async () => {
    if (!isAuthenticated) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/cart/clear`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Erro ao limpar carrinho');

      setCartItems([]);
    } catch (err) {
      console.error(err);
      toast.error('Erro ao limpar carrinho');
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, fetchCart }}
    >
      {children}
    </CartContext.Provider>
  );
};