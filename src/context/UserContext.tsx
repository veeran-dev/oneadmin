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
  newUser: boolean;
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
  const [newUser, setNewUser] = useState<boolean>(false)
  const { loading, error, data } = useQuery(GET_USER_BY_EMAIL);
  const router = useRouter()
  
  useEffect(()=>{
    if(data && data.getUserByEmail){
      setUserData(data['getUserByEmail'])
      setUser(data['getUserByEmail'])
    }
  },[data])

  useEffect(()=>{

    if (router.pathname === '/auth/login' || error?.message === undefined) {
      return
    }
    
    console.log(error)
    if(error){
      const invalidUser = 'User is not available';
      if (error?.message === invalidUser) {
        console.log("Invalid User")
        setNewUser(true)
        // router.push('/settings/new?force=true');
      }
      else if(router.query?.referalCode){
        return
      } 
      else{
        if(router.query?.referalCode){
          return
        }
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
    newUser
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
