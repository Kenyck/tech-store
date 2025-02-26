import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Adiciona o prefixo '/api'
  headers: {
    'Content-Type': 'application/json', // Tipo de conteúdo a ser enviado nas requisições
  }
});

export default api;