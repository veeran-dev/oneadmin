
import jwt, { JwtPayload } from 'jsonwebtoken';
const TOKEN_KEY = 'access_token';

export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    const strg = localStorage.getItem(TOKEN_KEY);
    return strg || null;
  }
  return null;
};

export const setToken = (token: any): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};


export const decodeToken = (): JwtPayload | null => {
  const code = getToken();

  if (code) {
    const decoded = jwt.decode(code) as JwtPayload;
    return decoded;
  }

  return null;
};