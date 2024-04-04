import { GET_USER_BY_EMAIL } from '@/pages/api/mutation/user';
import { setUserData } from '@/utils/userStorage';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { createContext, useContext, useReducer, ReactNode, useState, useEffect, useMemo } from 'react';
import { getToken, removeToken } from 'utils/TokenStorage';

// Define the types
type User = {
    _id:string;
    name: string;
    email: string;
    instituteId: string;
};


type UserContextType = {
  user: User | null;
  logoutUser: () => void;
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
  console.log("auth token is....",getToken()?.slice(0,10))
  const { loading, error, data, refetch } = useQuery(GET_USER_BY_EMAIL,{
    fetchPolicy: 'network-only',
    context: {
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
    },
  });
  console.log("data:",data, "loading:",loading, "error:",error);
  const router = useRouter()
  

  useEffect(()=>{
    if(!loading){
      refetch()
    }
    
  },[router])

  useEffect(()=>{
    
    if(data && data.getUserByEmail){
      setUserData(data['getUserByEmail'])
      setUser(data['getUserByEmail'])
      setNewUser(false)
    }
    else{
      setUserData(defaultUser),
      setUser(defaultUser)
    }
  },[loading, error, data, router.pathname, router.query])

  useEffect(()=>{

    if (router.pathname === '/auth/login' || error?.message === undefined) {
      return
    }
    
    if(error){
      const invalidUser = 'User is not available';
      if (error?.message === invalidUser) {
        setNewUser(true)
      }
      else if(router.query?.referalCode){
        return
      } 
      else{
        if(router.query?.referalCode){
          return
        }
        // router.push('/auth/login');
      }
    }
      
  },[error])



  const logoutUser = () => {
    setUser(defaultUser)
    removeToken()
    router.push("/auth/login")
  };

  const contextValue: UserContextType = {
    user,
    logoutUser,
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
