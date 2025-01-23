// auth/AuthProvider.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (account: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // 初始化時從 localStorage 恢復狀態
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const login = (account: string, password: string) => {
    console.log('Logging in with:', account, password);
    // 模擬 API 登入成功
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth 必須在 AuthProvider 中使用');
  }
  return context;
};
