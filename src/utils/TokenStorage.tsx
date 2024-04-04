import jwt, { JwtPayload } from 'jsonwebtoken';
import Cookies from 'js-cookie';
const TOKEN_KEY = 'access_token';

export const getToken = (): string | null => {
  return Cookies.get(TOKEN_KEY) ?? '';
};

export const setToken = (token: any): void => {
  Cookies.set(TOKEN_KEY, token, { expires: 7 })
};

export const removeToken = (): void => {
  Cookies.remove(TOKEN_KEY)
};


export const decodeToken = (): JwtPayload | null => {
  const code = getToken();

  if (code) {
    const decoded = jwt.decode(code) as JwtPayload;
    return decoded;
  }

  return null;
};