import { GET_USER_BY_EMAIL } from '@/pages/api/mutation/user';
import { setUserData } from '@/utils/userStorage';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { createContext, useContext, useReducer, ReactNode, useState, useEffect, useMemo } from 'react';

// Define the types
type User = {
    _id:string;
    name: string;
    email: string;
    instituteId: string;
};


type UserContextType = {
  user: User | null;
  updateUser: (user: User) => void;
};

const defaultUser ={
    _id: "",
    name: "",
    email:"",
    instituteId:"",
}

const UserContext = createContext<UserContextType | undefined>(undefined);


export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(defaultUser)
  const { loading, error, data } = useQuery(GET_USER_BY_EMAIL);
  const router = useRouter()
  
  useEffect(()=>{
    if(data && data.getUserByEmail){
      setUserData(data['getUserByEmail'])
      setUser(data['getUserByEmail'])
    }
  },[data])

  useEffect(()=>{
    const invalidUser = 'User is not available';
    if (error?.message === invalidUser) {
      router.push('/settings/new?force=true');
    } else if (error) {
      if(!router.query?.referalCode){
        router.push('/auth/login');
      }
    }
      
  },[error])



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
