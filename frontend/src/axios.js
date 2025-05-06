import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Adiciona o prefixo '/api'
  headers: {
    'Content-Type': 'application/json', // Tipo de conteúdo a ser enviado nas requisições
  }
});

// Adicionando o interceptor para incluir o token no cabeçalho de todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Obtém o token armazenado no localStorage
    if (token) {
      // Se o token estiver presente, adiciona o token no cabeçalho da requisição
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;