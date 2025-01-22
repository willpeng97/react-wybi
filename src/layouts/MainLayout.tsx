import React, { useState } from 'react';
import { Navbar as BsNavbar, Collapse,Nav, Form } from 'react-bootstrap';
import { BsBell, BsGear, BsGrid3X3Gap, BsPerson } from 'react-icons/bs';
import { Link, useLocation, Outlet } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaShoppingCart,
  FaChartBar,
  FaChartLine,
  FaCogs,
  FaPlug,
  FaChevronDown,
  FaChevronUp,
  FaArrowLeft,
  FaArrowRight
} from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';


// 上方導航列
const Navbar: React.FC = () => {
  return (
    <BsNavbar
      className="bg-white border-bottom px-4 py-2 sticky-top" 
      style={{
        height:'var(--navbar-height)',
        // marginLeft:'var(--sidebar-width)',
        // transition: 'margin-left 0.3s ease'
      }}
    >
      <Form className="d-flex flex-grow-1 mx-4">
        123
      </Form>
      <Nav className="align-items-center">
        <Nav.Link href="#" className="px-2">
          <BsGear />
        </Nav.Link>
        <Nav.Link href="#" className="px-2">
          <BsBell />
        </Nav.Link>
        <Nav.Link href="#" className="px-2">
          <BsGrid3X3Gap />
        </Nav.Link>
        <Nav.Link href="#" className="px-2">
          <BsPerson />
        </Nav.Link>
      </Nav>
    </BsNavbar>
  );
};

// 左側摺疊選單
const Sidebar: React.FC = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
    document.documentElement.style.setProperty('--sidebar-width', isCollapsed ? '240px' : '80px')
  };

  const toggleExpand = (key: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const menuItems = [
    { icon: <FaTachometerAlt />, text: 'Dashboard', path: '/' },
    { icon: <FaShoppingCart />, text: 'Orders', path: '/orders' },
    {
      icon: <FaChartBar />,
      text: 'Reports',
      path: '/reports',
      subItems: [
        { text: 'Sales', path: '/reports/sales' ,icon: <FaTachometerAlt />},
        { text: 'Traffic', path: '/reports/traffic',icon: <FaChartBar /> }
      ]
    },
    {
      icon: <FaChartBar />,
      text: 'Reports2',
      path: '/reports2',
      subItems: [
        { text: 'Sales2', path: '/reports2/sales2',icon: <FaTachometerAlt /> },
        { text: 'Traffic2', path: '/reports2/traffic2',icon: <FaChartLine /> }
      ]
    },
    { icon: <FaPlug />, text: 'Integrations', path: '/integrations' },
    { icon: <FaCogs />, text: 'Setting', path: '/setting' }
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div
      className={`sidebar bg-white border-end d-flex flex-column ${
        isCollapsed ? 'collapsed' : ''
      }`}
    >
      {/* Header */}
      <div className="p-3 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img
            src="/brand.png"
            alt="Logo"
            height={24}
            style={{ display: isCollapsed ? 'none' : 'block' }}
          />
          {!isCollapsed && <span className="ms-2">Weyu</span>}
        </div>
        <button
          onClick={toggleCollapse}
          style={{ border: 'none', background: 'none' }}
        >
          {isCollapsed ? <FaArrowRight /> : <FaArrowLeft />}
        </button>
      </div>

      {/* Navigation */}
      <Nav className="flex-column p-3">
        {menuItems.map((item, index) => {
          const itemKey = `${item.path}_${index}`
          
          return(
            <div key={index}>
              {item.subItems ? (
                // Menu item with submenu
                <div>
                  <Nav.Link
                    className={`d-flex align-items-center justify-content-between mb-2 ${
                      isActive(item.path) ? 'active' : ''
                    }`}
                    onClick={() => toggleExpand(itemKey)}
                  >
                    <div className="d-flex align-items-center">
                      <span className="me-2">{item.icon}</span>
                      {!isCollapsed && item.text}
                    </div>
                    {isCollapsed ? <IoIosArrowForward /> :(
                      expandedItems[itemKey] ? <FaChevronUp /> : <FaChevronDown />
                    )}
                  </Nav.Link>

                  {!isCollapsed && (
                    <Collapse in={expandedItems[itemKey]}>
                      <div className="ms-4">
                        {item.subItems.map((subItem, subIndex) => (
                          <Nav.Link
                            key={subIndex}
                            as={Link}
                            to={subItem.path}
                            className={`d-flex align-items-center mb-2 ${
                              location.pathname === subItem.path ? 'active' : ''
                            }`}
                          >
                            <span className="me-2">
                              {subItem.icon}
                            </span>
                            {subItem.text}
                          </Nav.Link>
                        ))}
                      </div>
                    </Collapse>
                  )}
                </div>
              ) : (
                // Regular menu item
                <Nav.Link
                  as={Link}
                  to={item.path}
                  className={`d-flex align-items-center mb-2 ${
                    isActive(item.path) ? 'active' : ''
                  }`}
                >
                  <span className="me-2">{item.icon}</span>
                  {!isCollapsed && item.text}
                </Nav.Link>
              )}
            </div>
          )
        }

        )}
      </Nav>
    </div>
  );
};

// 主要內容區域
interface PageContainerProps {
  children: React.ReactNode;
}
const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return (
    <div
      className="p-4"
      style={{
        marginLeft: 'var(--sidebar-width)',
        transition: 'margin-left 0.3s ease',
      }}
    >
      {children}
    </div>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="text-secondary opacity-75 w-100 text-center">
      {`Copyright © ${new Date().getFullYear()} `}
      <a href="https://www.weyutech.com/" target="_blank" className="text-secondary">
        WeYu Technology Co.
      </a>
      {", Ltd. All Rights Reserved."}
    </footer>
  );
}

const MainLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <PageContainer>
        <Outlet />
        <Footer />
      </PageContainer>
    </>
  );
};

export default MainLayout;
