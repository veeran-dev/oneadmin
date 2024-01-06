
const User_KEY = 'user_access_User';

interface User {
  _id: string;
  name: string;
  email: string;
  instituteId: string;
}


export const getUserData = (): User|null => {
  if (typeof window !== 'undefined') {
    const x:any = localStorage.getItem(User_KEY)
    return JSON.parse(x);
  }
  return null;
};

export const setUserData = (User: any): void => {
  localStorage.setItem(User_KEY, JSON.stringify(User));
};

export const removeUserData = (): void => {
  localStorage.removeItem(User_KEY);
};
