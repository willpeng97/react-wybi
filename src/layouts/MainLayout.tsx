import { FC, PropsWithChildren, useState } from "react";
import { Link, useLocation, Outlet  } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";


// 麵包屑導覽
const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x); // 拆分路径

  return (
    <Breadcrumb>
      <Breadcrumb.Item
        active={location.pathname === "/"}
        key="/"
        linkAs={Link}
        linkProps={{ to: "/" }}
      >
        Home
      </Breadcrumb.Item>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`; // 构建每个路径的 URL
        const isLast = index === pathnames.length - 1; // 判断是否是最后一项

        return isLast ? (
          <Breadcrumb.Item active key={to}>
            {value.charAt(0).toUpperCase() + value.slice(1)} {/* 首字母大写 */}
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item key={to} linkAs={Link} linkProps={{ to }}>
            {value.charAt(0).toUpperCase() + value.slice(1)} {/* 首字母大写 */}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="text-secondary opacity-75 w-100 text-center">
      {`Copyright © ${new Date().getFullYear()} `}
      <a
        href="https://www.weyutech.com/"
        target="_blank"
        className="text-secondary"
      >
        WeYu Technology Co.
      </a>
      {", Ltd. All Rights Reserved."}
    </footer>
  );
};

// 頁面內容區域
const PageContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className="p-3 pt-1"
      style={{
        marginLeft: "var(--sidebar-width)",
        transition: "all 0.3s ease",
      }}
    >
      <Breadcrumbs />
      {children}
      <Footer />
    </div>
  );
};


const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    document.documentElement.style.setProperty(
      "--sidebar-width",
      sidebarOpen ? "72px" : "240px"
    );
  };

  return (
    <>
      <Navbar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <PageContainer>
        <Outlet />
      </PageContainer>
      <Sidebar sidebarOpen={sidebarOpen} />
    </>
  );
};

export default MainLayout;
