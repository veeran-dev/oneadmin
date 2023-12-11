import React, { createContext, useContext, useReducer, ReactNode, useState } from 'react';

// Define the types
type User = {
    id:string;
    name: string;
    email: string;
    instituteId: string;
};


type UserContextType = {
  user: User | null;
  updateUser: (user: User) => void;
};

const defaultUser ={
    id: "",
    name: "",
    email:"",
    instituteId:"",
}

const UserContext = createContext<UserContextType | undefined>(undefined);


export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(defaultUser)

  const updateUser = (user: User) => {
    setUser(user)
  };

  const contextValue: UserContextType = {
    user,
    updateUser,
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
