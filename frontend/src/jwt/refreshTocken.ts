import axios from 'axios';

const refreshToken = async () => {
  try {
    const response = await axios.post("http://localhost:3000/auth/user/refreshtoken");
    const { accessToken } = response.data;
    localStorage.setItem('accessToken', accessToken);
    return accessToken;
  } catch (error) {
    console.error('Refresh token error:', error);
  }
};

export default refreshToken;
