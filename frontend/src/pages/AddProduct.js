import React, { useState, useEffect } from 'react';
import api from '../axios'; // Importa a instância configurada do Axios

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  // Define a função handleAddProduct
  const handleAddProduct = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão de enviar o formulário

    // Cria o objeto product com os dados do formulário
    const product = {
      name,
      price,
      stock,
    };

    try {
      // Faz a requisição para o back-end usando o Axios
      const response = await api.post('/products', product);
      console.log('Produto adicionado com sucesso:', response.data);
      // Você pode adicionar um código para limpar os campos ou exibir uma mensagem de sucesso
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
      // Você pode adicionar um código para mostrar um alerta de erro
    }
  };

  return (
    <div>
      <h2>Adicionar Produto</h2>
      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          placeholder="Nome do Produto"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Preço"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantidade em Estoque"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
};

export default AddProduct;