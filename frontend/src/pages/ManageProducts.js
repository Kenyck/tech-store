import React, { useEffect, useState } from 'react';
import api from '../axios';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  

  // Carregar produtos ao montar o componente
  useEffect(() => {
    console.log("Carregando produtos...");
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  // Adicionar ou atualizar produto
  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = { name, price, stock };

    try {
      if (editingProduct) {
        // Atualizar produto existente
        await api.put(`/products/${editingProduct.id}`, productData);
      } else {
        // Adicionar novo produto
        await api.post('/products', productData);
      }
      resetForm();
      fetchProducts(); // Atualiza a lista de produtos
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
    }
  };

  // Excluir produto
  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
  };

  // Preencher formulário com os dados do produto para edição
  const startEditing = (product) => {
    setEditingProduct(product);
    setName(product.name);
    setPrice(product.price);
    setStock(product.stock);
  };

  // Resetar formulário
  const resetForm = () => {
    setName('');
    setPrice('');
    setStock('');
    setEditingProduct(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">{editingProduct ? 'Editar Produto' : 'Adicionar Produto'}</h1>
      
      <form onSubmit={handleSubmit} className="mb-4 flex flex-col space-y-2">
        <input
          type="text"
          placeholder="Nome do Produto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2"
        />
        <input
          type="number"
          placeholder="Preço"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2"
        />
        <input
          type="number"
          placeholder="Quantidade em Estoque"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="border p-2"
        />
        <div className="flex space-x-2">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            {editingProduct ? 'Atualizar' : 'Adicionar'}
          </button>
          {editingProduct && (
            <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded">
              Cancelar
            </button>
          )}
        </div>
      </form>

      <h2 className="text-xl font-bold mb-4">Produtos Cadastrados</h2>
      <ul className="space-y-2">
        {products.map((product) => (
          <li key={product.id} className="border p-4 flex justify-between items-center">
            <div>
              <h2 className="font-bold">{product.name}</h2>
              <p>Preço: R${product.price}</p>
              <p>Estoque: {product.stock}</p>
            </div>
            <div>
              <button
                onClick={() => startEditing(product)}
                className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
              >
                Editar
              </button>
              <button
                onClick={() => deleteProduct(product.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageProducts;