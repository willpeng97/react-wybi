import { FC, cloneElement, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaChevronDown,
  FaChevronUp,
  FaSearch,
  FaTools,
  FaTasks,
} from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Collapse, Dropdown, Nav } from "react-bootstrap";

// 設定選單
const menuItems = [
  { kind: "header", title: "Overview"},
  { icon: <FaTachometerAlt />, text: "Dashboard", path: "/" },
  { icon: <FaTasks />, text: "Project Overview", path: "/project-overview" },
  { kind: "divider"},
  { kind: "header", title: "Project"},
  {
    icon: <FaSearch />,
    text: "Query",
    path: "/query",
    subItems: [
      // { text: "待處理查詢", path: "/query/pending-tasks" },
      // { text: "工作週查詢", path: "/query/work-week" },
      // { text: "專案管理查詢", path: "/query/project-management" },
      // { text: "總清單查詢", path: "/query/full-list" },
      { text: "待處理查詢", path: "/query/308024965610621" },
      { text: "工作週查詢", path: "/query/309517261176298" },
      { text: "專案管理查詢", path: "/query/305890829563555" },
      { text: "總清單查詢", path: "/query/305890850870278" },
    ],
  },
  {
    icon: <FaTools />,
    text: "Maintain",
    path: "/maintain",
    subItems: [
      { text: "專案分類維護", path: "/maintain/project-category" },
      { text: "專案狀態維護", path: "/maintain/project-status" },
      { text: "工作分類維護", path: "/maintain/process-type" },
      { text: "工作狀態維護", path: "/maintain/process-status" },
      { text: "專案管理維護", path: "/maintain/project-maintain" },
      { text: "專案工作維護", path: "/maintain/project-detail" },
    ],
  },
];

const IconWrapper = ({ icon }: { icon: JSX.Element }) => {
  return (
    <span
      className="d-flex justify-content-center align-items-center me-2"
      style={{ width: "24px", height: "24px" }}
    >
      {cloneElement(icon, { size: 20 })}
    </span>
  );
};

// 左側摺疊選單
interface SidebarProps {
  sidebarOpen: boolean;
}
const Sidebar: FC<SidebarProps> = ({ sidebarOpen }) => {
  const location = useLocation();

  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const [dropdownOpenItems, setDropdownOpenItems] = useState<Record<string, boolean>>({});

  const toggleExpand = (key: string) => {
    if (sidebarOpen) {
      setExpandedItems((prev) => ({
        ...prev,
        [key]: !prev[key], // 控制 Collapse 展開
      }));
    } else {
      setDropdownOpenItems((prev) => ({
        ...prev,
        [key]: !prev[key], // 只有當 sidebar 收起時，才影響 Dropdown
      }));
    }
  };

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.split("/")[1] === path.split("/")[1];
    // return location.pathname.startsWith(path);
  };

  return (
    <div className={"sidebar bg-white border-end d-flex flex-column"}>
      <Nav className="flex-column p-1">
        {menuItems.map((item, index) => {
          if( item.kind === "header"){
            return (
              <div
                style={{
                  maxHeight: `${sidebarOpen ? "100px" : "0px"}`,
                  overflow:"hidden",
                  maxWidth: `${sidebarOpen ? "calc(var(--sidebar-width) - 16px)" : "0px"}`,
                  transition: "all 0.3s ease"
                }}
              >
                <span className="text-secondary ps-2 fw-bold" style={{fontSize:"0.8rem"}}>{item.title}</span>
              </div>
            ) 
          }
          if( item.kind === "divider"){
            return <hr style={{ border: '1px solid #bbb', margin: '8px 0' }} />
          }

          const itemKey = `${item.path}_${index}`;
          return (
            <div key={index}>
              {item.subItems ? (
                // Menu item with submenu
                <div>
                  <Nav.Link
                    className={`d-flex align-items-center justify-content-between mb-1 px-3 ${
                      isActive(item.path) ? "active" : ""
                    }`}
                    onClick={() => toggleExpand(itemKey)}
                  >
                    <div className="d-flex align-items-center">
                      <IconWrapper icon={item.icon} />
                      <span
                        className="text-truncate fw-bold"
                        style={{
                          maxWidth: `${sidebarOpen ? "calc(var(--sidebar-width) - 96px)" : "0px"}`,
                          transition: "all 0.3s ease"
                        }}
                        title={item.text}
                      >
                        {item.text}
                      </span>
                    </div>
                    <div style={{ position: "absolute", right: "8%" }}>
                      {!sidebarOpen ? (
                        <IoIosArrowForward />
                      ) : expandedItems[itemKey] ? (
                        <FaChevronUp />
                      ) : (
                        <FaChevronDown />
                      )}
                    </div>
                  </Nav.Link>

                  {/* 當 sidebar 展開時，使用 Collapse */}
                  {sidebarOpen && (
                    <Collapse in={expandedItems[itemKey]}>
                      <div className="ms-4">
                        {item.subItems.map((subItem, subIndex) => (
                          <Nav.Link
                            key={subIndex}
                            as={Link}
                            to={subItem.path}
                            className={`d-flex align-items-center mb-1 ${
                              location.pathname === subItem.path ? "active" : ""
                            }`}
                          >
                            {/* <IconWrapper icon={subItem.icon} /> */}
                            <span
                              className="text-truncate"
                              style={{
                                maxWidth: `${sidebarOpen ? "calc(var(--sidebar-width) - 112px)" : "0px"}`,
                                transition: "all 0.3s ease"
                              }}
                              title={subItem.text}
                            >
                              {subItem.text}
                            </span>
                          </Nav.Link>
                        ))}
                      </div>
                    </Collapse>
                  )}

                  {/* 當 sidebar 收起時，使用 Dropdown */}
                  {!sidebarOpen && (
                    <Dropdown show={dropdownOpenItems[itemKey]} onToggle={() => toggleExpand(itemKey)}>
                      <Dropdown.Menu style={{ left: '100%', top: '-48px' }}>
                        {item.subItems.map((subItem, subIndex) => (
                          <Dropdown.Item
                            key={subIndex}
                            as={Link}
                            to={subItem.path}
                            className={`d-flex align-items-center ${
                              location.pathname === subItem.path ? "active" : ""
                            }`}
                          >
                            {/* <IconWrapper icon={subItem.icon} /> */}
                            {subItem.text}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>

                  )}
                </div>
              ) : (
                // Regular menu item
                <Nav.Link
                  as={Link}
                  to={item.path!}
                  className={`d-flex align-items-center mb-1 px-3 ${
                    isActive(item.path!) ? "active" : ""
                  }`}
                >
                  <IconWrapper icon={item.icon!} />
                  <span
                    className="text-truncate fw-bold"
                    style={{
                      maxWidth: `${sidebarOpen ? "calc(var(--sidebar-width) - 80px)" : "0px"}`,
                      transition: "all 0.3s ease"
                    }}
                    title={item.text}
                  >
                    {item.text}
                  </span>
                </Nav.Link>
              )}
            </div>
          );
        })}
      </Nav>

    </div>
  );
};

export default Sidebar