// auth/AuthProvider.tsx
import { FC, createContext, useContext, useState, PropsWithChildren } from 'react';
import axiosInstance from '../utils/axiosInstance';

type UserInfo = Record<string, string | number | null> | null;

interface AuthContextProps {
  isAuthenticated: boolean;
  userInfo: UserInfo;
  login: (account: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // 初始化時從 localStorage 恢復狀態
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const [userInfo, setUserInfo] = useState<UserInfo>(() => {
    const savedUserInfo = localStorage.getItem('userInfo');
    return savedUserInfo ? JSON.parse(savedUserInfo) : null;
  });

  const login = async (account: string, password: string): Promise<boolean> => {
    try {
      const requestBody = { UID: account, PWD: password };
      const response = await axiosInstance.post("WeyuLogin", requestBody);
      console.log(response)
      if (response.data.result) { // 後端回傳 { result: true/false }
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem("username", account)
        localStorage.setItem('userInfo', JSON.stringify(response.data.UserInfo));

        setUserInfo(response.data.UserInfo);

        return true; // 登入成功
      } else {
        return false; // 登入失敗
      }
    } catch (error) {
      console.error("登入失敗:", error);
      return false; // API 錯誤時回傳 false
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserInfo(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    localStorage.removeItem('userInfo');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userInfo, login, logout }}>
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
