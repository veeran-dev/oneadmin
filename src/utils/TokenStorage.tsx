
import jwt from 'jsonwebtoken';
const TOKEN_KEY = 'access_token';

export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
};

export const setToken = (token: any): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};


export const decodeToken = () => {
  const decoded = jwt.decode(getToken());
  return decoded;
}