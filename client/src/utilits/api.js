import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000',
});

// Добавляем токен к каждому запросу
api.interceptors.request.use((config) => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  
  if (userData?.token) {
    config.headers.Authorization = `Bearer ${userData.token}`;
    console.log('Токен добавлен в запрос:', config.url); // Для отладки
  } else {
    console.warn('Токен отсутствует!'); // Для отладки
  }

  return config;
});

// Обрабатываем ошибки
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('userData');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

export default api;