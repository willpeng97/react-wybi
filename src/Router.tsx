import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "./layouts/MainLayout";
import NotFound from "./pages/NotFound";
import LoginPage from "./auth/LoginPage"; // 假设已创建 LoginPage 组件

// 使用 lazy 加载
const Dashboard = lazy(() => import("./pages/Dashboard"));

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: LoginPage, // LoginPage 是单独的页面，不嵌套在 MainLayout 下
  },
  {
    Component: MainLayout, // MainLayout 管理所有主路由
    children: [
      {
        path: "/",
        Component: (props) => (
          <Suspense fallback={<div>Loading...</div>}>
            <Dashboard {...props} />
          </Suspense>
        ),
        index: true,
      },
      {
        path: "/orders",
        Component: () => <div>orders</div>,
      },
      {
        path: "/reports",
        Component: () => <div>reports</div>,
        children: [
          {
            path: "/reports/sales",
            Component: () => <div>sales</div>,
          },
          {
            path: "/reports/traffic",
            Component: () => <div>traffic</div>,
          },
        ],
      },
      {
        path: "/integrations",
        Component: () => <div>integrations</div>,
      },
      {
        path: "/setting",
        Component: () => <div>setting</div>,
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
]);
