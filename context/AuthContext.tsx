'use client';

import React, { createContext, useContext } from 'react';

export const AuthContext = createContext({ authenticated: false });

interface AuthProviderProps {
  children: React.ReactNode;
  authenticated: boolean;
}

export const AuthProvider = ({ children, authenticated}: AuthProviderProps) => {
  return (
    <AuthContext.Provider value={{ authenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext);
}
