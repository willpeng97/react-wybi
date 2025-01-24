import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "./layouts/MainLayout";
import NotFound from "./pages/NotFound";
import LoginPage from "./auth/LoginPage";
import ProtectedRoute from "./auth/ProtectedRoute"; // 導入 ProtectedRoute
import Query from "./pages/Query";
import ReactTabulator from "./pages/ReactTabulator";

const Dashboard = lazy(() => import("./pages/Dashboard"));

export const router = createBrowserRouter(
  [
    {
      path: "/login",
      Component: LoginPage, // 不需要保護的路由
    },
    {
      Component: ProtectedRoute, // 所有需要保護的路由都放在 ProtectedRoute 下
      children: [
        {
          path: "/",
          Component: MainLayout,
          children: [
            {
              Component: (props) => (
                <Suspense fallback={<div>Loading...</div>}>
                  <Dashboard {...props} />
                </Suspense>
              ),
              index: true,
            },
            {
              path: "/orders",
              Component: Query,
            },
            {
              path: "/reports", // 獨立的 /reports 路由
              Component: () => <div>reports</div>,
            },
            {
              path: "/reports/sales", // 獨立的 /reports/sales 路由
              Component: () => <div>sales</div>,
            },
            {
              path: "/reports/traffic", // 獨立的 /reports/traffic 路由
              Component: () => <div>traffic</div>,
            },
            {
              path: "/integrations",
              Component: () => <ReactTabulator />,
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
      ],
    },
  ],
  {
    basename: "/react-wybi/", // 添加應用的子路徑
  }
);
