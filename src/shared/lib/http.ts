import axios from 'axios';
import { timeout } from './timeout';

export const http = axios.create({
  baseURL: 'http://localhost:3000',
});

http.interceptors.response.use(
  async (response) => {
    await timeout(1000);
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);
