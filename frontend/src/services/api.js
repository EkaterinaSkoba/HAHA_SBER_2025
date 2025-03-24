import axios from 'axios';

// Создаем базовый экземпляр axios с общими настройками
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Перехватчик для добавления токена аутентификации к запросам
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Перехватчик для обработки ответов и ошибок
api.interceptors.response.use(
  response => response,
  error => {
    // Обработка ошибок 401 (Unauthorized) - перенаправление на логин
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api; 