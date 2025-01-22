import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import MainLayout from './layouts/MainLayout';
import NotFound from './pages/NotFound';
import LoginPage from './auth/LoginPage';
import ProtectedRoute from './auth/ProtectedRoute'; // 導入 ProtectedRoute

const Dashboard = lazy(() => import('./pages/Dashboard'));

export const router = createBrowserRouter([
  {
    path: '/login',
    Component: LoginPage, // 不需要保護的路由
  },
  {
    Component: ProtectedRoute, // 所有需要保護的路由都放在 ProtectedRoute 下
    children: [
      {
        Component: MainLayout,
        children: [
          {
            path: '/',
            Component: (props) => (
              <Suspense fallback={<div>Loading...</div>}>
                <Dashboard {...props} />
              </Suspense>
            ),
            index: true,
          },
          {
            path: '/orders',
            Component: () => <div>orders</div>,
          },
          {
            path: '/reports',
            Component: () => <div>reports</div>,
            children: [
              {
                path: '/reports/sales',
                Component: () => <div>sales</div>,
              },
              {
                path: '/reports/traffic',
                Component: () => <div>traffic</div>,
              },
            ],
          },
          {
            path: '/integrations',
            Component: () => <div>integrations</div>,
          },
          {
            path: '/setting',
            Component: () => <div>setting</div>,
          },
          {
            path: '*',
            Component: NotFound,
          },
        ],
      },
    ],
  },
]);
