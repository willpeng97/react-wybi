// auth/AuthProvider.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (account: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // 初始化時從 localStorage 恢復狀態
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const login = (account: string, password: string) => {
    if (account === "DEMO" && password === "DEMO") {
      console.log("Logging in with:", account, password);
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
      return true;  // 登入成功
    } else {
      return false;  // 登入失敗
    }
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
