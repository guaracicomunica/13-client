import { createContext, useState } from "react";
import Router from 'next/router';
import { setCookie } from 'nookies';

import { api } from '../services/api';

type AuthContextType = {
  isAuthenticated: boolean;
}

type SignInData = {
  email: string;
  password: string;
}

type User = {
  id: number;
  name: string;
  email: string;
  cpf: string;
}

type DataAuth = {
  token: string;
  user: User;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = false;

  async function signIn({ email, password }: SignInData) {
    const response = await api.post<DataAuth>('auth', {
      email,
      password
    });

    setCookie(undefined, 'ecommerce.token', response.data.token, {
      maxAge: 60 * 60 * 24, // 24 hours
    });

    setUser(response.data.user);

    Router.push('/dashboard');
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      { children }
    </AuthContext.Provider>
  )
}