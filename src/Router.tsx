import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    Component: MainLayout,
    children: [
      {
        path: '/',
        Component: Dashboard,
        index:true
      },
      {
        path: '/orders',
        Component: () => <div>orders</div>, // 對應 "Orders"
      },
      {
        path: '/reports',
        Component: () => <div>reports</div>, // 對應 "Reports"
        children: [
          {
            path: '/reports/sales',
            Component: () => <div>sales</div>, // 對應 "Sales"
          },
          {
            path: '/reports/traffic',
            Component: () => <div>traffic</div>, // 對應 "Traffic"
          },
        ],
      },
      {
        path: '/integrations',
        Component: () => <div>integrations</div>, // 對應 "Integrations"
      },
      {
        path: '/setting',
        Component: () => <div>setting</div>, // 對應 "Setting"
      },
      {
        path: '*',
        Component: NotFound,
      },
    ],
  },
]);