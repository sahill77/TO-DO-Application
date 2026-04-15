import axios from 'axios';
import { getToken, removeToken } from '../utils/helpers';

const API = axios.create({
  baseURL: '/api',
});

API.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      removeToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const registerUser = (userData) => API.post('/auth/register', userData);
export const loginUser = (credentials) => API.post('/auth/login', credentials);
export const getMe = () => API.get('/auth/me');

export const fetchTasks = () => API.get('/tasks');
export const createTask = (taskData) => API.post('/tasks', taskData);
export const updateTask = (id, updates) => API.put(`/tasks/${id}`, updates);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);

export default API;
