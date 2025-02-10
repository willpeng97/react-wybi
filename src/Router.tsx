import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "./layouts/MainLayout";
import NotFound from "./auth/NotFound";
import LoginPage from "./auth/LoginPage";
import ProtectedRoute from "./auth/ProtectedRoute"; // 導入 ProtectedRoute
import ProjectOverview from "./pages/ProjectOverview";
// import { SmartQuery } from "./pages/SmartQuery";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const SmartQuery = lazy(() => import("./pages/SmartQuery"));

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
              path: "/project-overview",
              Component: ProjectOverview,
            },
            {
              path: "/query/:SID",
              Component: (props) => (
                <Suspense fallback={<div>Loading...</div>}>
                  <SmartQuery {...props} />
                </Suspense>
              )
            },
            {
              path: "/maintain/:SID",
              Component: () => <div>maintain</div>,
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
