import { createContext, useEffect, useState } from "react";
import Router from 'next/router';
import { setCookie, parseCookies, destroyCookie } from 'nookies';

import { api } from '../services/api';
import { getAPIClient } from '../services/apiClient';

type User = {
  id: number;
  name: string;
  email: string;
  cpf: string;
}

type SignInData = {
  email: string;
  password: string;
}

type RegisterData = {
  email: string;
  telefone: string;
  password: string;
}

type AuthContextType = {
  user: User;
  isAuthenticated: boolean;
  signIn: (data: SignInData) => void;
  logoff: () => void;
  register: (data: RegisterData) => void;
}

type DataAuth = {
  access_token: string;
  user: User;
}

type DataRegisterData = {
  message: string;
  access_token: string;
  user: User;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'ecommerce.token': token } = parseCookies();

    if (token) {
      setUser({
        id: 11,
        name: "Beltrano",
        email: "beltrano@email.com",
        cpf: "001.001.001-01"
      })
    }
  }, []);

  async function signIn({ email, password }: SignInData) {
    const response = await api.post<DataAuth>('auth/login', {
      email,
      password
    });

    setCookie(undefined, 'ecommerce.token', response.data.access_token, {
      maxAge: 60 * 60, // 1 hour
    });

    api.defaults.headers['Authorization'] = `Bearer ${response.data.access_token}`;

    setUser(response.data.user);

    Router.push('/dashboard');
  }

  function logoff() {
    destroyCookie(null, 'ecommerce.token');

    Router.push('/login');
  }

  async function register({email, telefone, password}: RegisterData){
    const api = getAPIClient()
    const response = await api.post<DataRegisterData>('/auth/register', {
      email,
      telefone,
      password
    }
    /*, 

    {
       headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Authorization", 
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE" ,
        "Content-Type": "application/json;charset=UTF-8" 
       }
    }
    */
    ).then((response) => {
      console.log(response)
    });

    
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, logoff, register }}>
      { children }
    </AuthContext.Provider>
  )
}