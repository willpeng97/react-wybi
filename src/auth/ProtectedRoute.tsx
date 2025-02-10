import { Outlet } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth(); // 獲取用戶的登入狀態

  if (!isAuthenticated) {
    // 清空狀態並導回登入頁
    const loginURL = '/' + window.location.pathname.split('/')[1] + '/login'
    window.location.replace(loginURL);
    return null; // 確保組件在重定向後不再渲染
  }

  return <Outlet />;
};

export default ProtectedRoute;