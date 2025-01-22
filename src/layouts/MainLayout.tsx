import React, { useState } from 'react';
import { Navbar as BsNavbar, Button, Collapse,Container,Dropdown,Nav } from 'react-bootstrap';
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
  FaUserCircle,
} from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import {  RiMenuLine, RiMenuUnfold4Line } from 'react-icons/ri';


// 上方導航列
interface NavbarProps {
  sidebarOpen: boolean
  toggleSidebar: () => void
}
const Navbar: React.FC<NavbarProps> = ({sidebarOpen, toggleSidebar}) => {
  return (
    <BsNavbar
      className="bg-white border-bottom sticky-top"
      style={{ height: 'var(--navbar-height)' }}
    >
      <Container fluid>
        {/* 左側部分 */}
        <Button
          variant="light"
          onClick={toggleSidebar}
          style={{ border: 'none', background: 'none' }}
        >
          {sidebarOpen ? <RiMenuLine size={24} /> : <RiMenuUnfold4Line size={24} />}
        </Button>
        <BsNavbar.Brand href="#home" className="d-flex align-items-center ms-2">
          <img
            src="/brand.png"
            alt="Brand Logo"
            height={24}
            className="me-2"
          />
          Weyu
        </BsNavbar.Brand>

        {/* 右側部分 */}
        <BsNavbar.Toggle aria-controls="navbar-content" />
        <BsNavbar.Collapse id="navbar-content" className="justify-content-end">
          <Nav>
            <Dropdown align="end">
              <Dropdown.Toggle
                as="button"
                className="btn btn-light d-flex align-items-center border-0"
              >
                <FaUserCircle size={24} className="me-2" />
                Account
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#profile">Profile</Dropdown.Item>
                <Dropdown.Item href="#settings">Settings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#logout">Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};

// 左側摺疊選單
interface SidebarProps {
  sidebarOpen: boolean
}
const Sidebar: React.FC<SidebarProps> = ({sidebarOpen}) => {
  const location = useLocation();
  // const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  // const toggleSidebar = () => {
  //   setSidebarOpen(!sidebarOpen)
  //   document.documentElement.style.setProperty('--sidebar-width', sidebarOpen ? '240px' : '80px')
  // };

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
    <div className={"sidebar bg-white border-end d-flex flex-column"}>
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
                      {!sidebarOpen && item.text}
                    </div>
                    {sidebarOpen ? <IoIosArrowForward /> :(
                      expandedItems[itemKey] ? <FaChevronUp /> : <FaChevronDown />
                    )}
                  </Nav.Link>

                  {!sidebarOpen && (
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
                  {!sidebarOpen && item.text}
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
    document.documentElement.style.setProperty('--sidebar-width', sidebarOpen ? '240px' : '80px')
  };

  return (
    <>
      <Navbar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}/>
      <Sidebar sidebarOpen={sidebarOpen}/>
      <PageContainer>
        <Outlet />
        <Footer />
      </PageContainer>
    </>
  );
};

export default MainLayout;
