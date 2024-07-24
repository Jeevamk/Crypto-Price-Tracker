import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5001',
});


API.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

export default API;
