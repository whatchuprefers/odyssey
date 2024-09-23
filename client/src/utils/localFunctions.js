import { jwtDecode } from 'jwt-decode'; // Use the default import

export const checkToken = () => {
  const token = localStorage.getItem('token');
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded && decoded.exp) {
      return decoded.exp > currentTime;
    } else return false;
  } catch (e) {
    return false;
  }
};

export const getRole = () => {
  const token = localStorage.getItem('token');
  try {
    const decoded = jwtDecode(token);
    return decoded.role;
  } catch (e) {
    return null;
  }
};
