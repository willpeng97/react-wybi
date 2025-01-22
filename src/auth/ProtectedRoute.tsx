import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth(); // 獲取用戶的登入狀態

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
