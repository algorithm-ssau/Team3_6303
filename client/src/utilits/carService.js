import api from './api';  // ваш axios-инстанс

export const fetchCars = params =>
  api.get('/cars', { params });
