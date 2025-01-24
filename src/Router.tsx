import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "./layouts/MainLayout";
import NotFound from "./pages/NotFound";
import LoginPage from "./auth/LoginPage";
import ProtectedRoute from "./auth/ProtectedRoute"; // 導入 ProtectedRoute
import Query from "./pages/Query";
import ReactTabulator from "./pages/ReactTabulator";

const Dashboard = lazy(() => import("./pages/Dashboard"));

const tableData = [
  { id: 1, name: "Alice", age: 25, country: "USA" },
  { id: 2, name: "Bob", age: 30, country: "UK" },
  { id: 3, name: "Charlie", age: 35, country: "Canada" },
  { id: 4, name: "Dave", age: 40, country: "Germany" },
  { id: 5, name: "Eve", age: 28, country: "France" },
  { id: 6, name: "Frank", age: 22, country: "Italy" },
  { id: 7, name: "Grace", age: 33, country: "Australia" },
  { id: 8, name: "Heidi", age: 27, country: "Netherlands" },
  { id: 9, name: "Ivan", age: 50, country: "USA" },
  { id: 10, name: "Jack", age: 38, country: "Brazil" },
];

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
              Component: () => <ReactTabulator data={tableData} />,
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
