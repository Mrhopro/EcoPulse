import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4000',
});

export const registerUser = data => API.post('/auth/register', data);

export function loginUser(data) {
  return API.post('/auth/login', data);
}