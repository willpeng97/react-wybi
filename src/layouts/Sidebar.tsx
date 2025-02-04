import React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaChartBar,
  // FaChartLine,
  FaCogs,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Collapse, Dropdown, Nav } from "react-bootstrap";
import { MdFactory } from "react-icons/md";

// 設定選單
const menuItems = [
  { kind: "header", title: "Main items"},
  { icon: <FaTachometerAlt />, text: "Dashboard", path: "/" },
  { icon: <MdFactory />, text: "Equipment Overview", path: "/eqp-overview" },
  { kind: "divider"},
  { kind: "header", title: "Query"},
  {
    icon: <FaChartBar />,
    text: "Reports",
    path: "/reports",
    subItems: [
      { icon: <FaTachometerAlt />, text: "work report", path: "/reports/work-report" },
      { icon: <FaChartBar />, text: "status hist", path: "/reports/status-hist" },
    ],
  },
  {
    icon: <FaChartBar />,
    text: "Reports2",
    path: "/reports2",
    subItems: [
      { icon: <FaTachometerAlt />, text: "smart query", path: "/reports2/smart-query" },
      // { icon: <FaChartLine />, text: "Traffic2", path: "/reports2/traffic2" },
    ],
  },
  { kind: "divider"},
  { kind: "header", title: "System"},
  { icon: <FaCogs />, text: "Setting", path: "/setting" },
];

const IconWrapper = ({ icon }: { icon: JSX.Element }) => {
  return (
    <span
      className="d-flex justify-content-center align-items-center me-2"
      style={{ width: "24px", height: "24px" }}
    >
      {React.cloneElement(icon, { size: 20 })}
    </span>
  );
};

// 左側摺疊選單
interface SidebarProps {
  sidebarOpen: boolean;
}
const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen }) => {
  const location = useLocation();

  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const [dropdownOpenItems, setDropdownOpenItems] = useState<Record<string, boolean>>({});

  const toggleExpand = (key: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key], // 控制 Collapse 展開
    }));
  
    // 如果 sidebar 是收起的狀態，則展開 Dropdown 需要獨立控制
    if (!sidebarOpen) {
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
                        className="text-truncate"
                        style={{
                          // maxWidth:"calc(var(--sidebar-width) - 96px)"
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
                            <IconWrapper icon={subItem.icon} />
                            <span
                              className="text-truncate"
                              style={{
                                // maxWidth:"calc(var(--sidebar-width) - 112px)"
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
                    <Dropdown show={dropdownOpenItems[itemKey]} style={{ position: 'relative' }}>
                      <Dropdown.Menu style={{ left: '100%', top: '-48px', }}>
                        {item.subItems.map((subItem, subIndex) => (
                          <Dropdown.Item
                            key={subIndex}
                            as={Link}
                            to={subItem.path}
                            className={`d-flex align-items-center ${
                              location.pathname === subItem.path ? "active" : ""
                            }`}
                          >
                            <IconWrapper icon={subItem.icon} />
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
                    className="text-truncate"
                    style={{
                      // maxWidth:"calc(var(--sidebar-width) - 80px)"
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