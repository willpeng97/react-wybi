# React WYBI

威友科技儀表板App

## 最後維護日期:2025/02/04

## 專案架構

src/
├── auth/                   # 權限管理
│   ├── AuthProvider.ts     # 儲存用戶的登入狀態
│   ├── LoginPage.tsx       # 登入頁面
│   └── ProtectedRoute.tsx  # 保護路由，判斷非登入狀態則返回LoginPage
│
├── components/             # 可復用的 React 組件
│
├── layouts/                # 布局相關文件
│   ├── Navbar.tsx          # 導航欄組件
│   ├── Sidebar.tsx         # 側邊選單
│   └── MainLayout.tsx      # 主要布局文件
│
├── mockData/               # 測試用假數據
│   └── ...                 # 添加更多測試數據...
│
├── pages/                  # 頁面組件
│   ├── Dashboard.tsx       # 儀表板頁面
│   ├── NotFound.tsx        # 404 頁面
│   └── ...                 # 添加更多頁面...
│
├── styles/                 # CSS樣式
│   ├── global.css          # 全局樣式
│   └── ...                 # 添加更多樣式...
│
├── utils/                  # 常用涵式
│   ├── api.ts              # 統一管理api
│   ├── axiosInstance.ts    # axios實例
│   └── ...                 # 添加更多...
│
├── App.tsx                 # 主應用組件
├── main.tsx                # 入口文件
└── Router.tsx              # 管理路由