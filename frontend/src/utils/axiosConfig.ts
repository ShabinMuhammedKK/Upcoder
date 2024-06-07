

import axios from 'axios';
import refreshToken from '../jwt/refreshTocken'; 

axios.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshToken();
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken;
      return axios(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default axios;
