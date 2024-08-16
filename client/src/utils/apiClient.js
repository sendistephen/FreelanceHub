import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5500/api',
  withCredentials: true,
});

export default apiClient;
