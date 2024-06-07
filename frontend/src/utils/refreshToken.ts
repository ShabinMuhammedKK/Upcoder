

import axios from 'axios';

const refreshToken = async () => {
  try {
    const response = await axios.post("http://localhost:3000/auth/user/refresh-token", {}, { withCredentials: true });
    const { accessToken } = response.data;
    localStorage.setItem('accessToken', accessToken);
    return accessToken;
  } catch (error) {
    console.error('Refresh token error:', error);
    // Handle error (e.g., log out the user)
    throw error;
  }
};

export default refreshToken;
