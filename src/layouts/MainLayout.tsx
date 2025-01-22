import React, { useState } from 'react';
import { Breadcrumb, Navbar as BsNavbar, Button, Collapse,Container,Dropdown,Nav } from 'react-bootstrap';
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
  FaCrown,
  FaUser,
  FaCommentDots,
  FaCog,
  FaSignOutAlt,
  FaUserCircle,
} from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import {  RiMenuLine, RiMenuUnfold4Line } from 'react-icons/ri';

// 用戶頭像
const AccountMenu: React.FC = () =>{
  return(
    <Dropdown align="end">
      {/* 頭像觸發器 */}
      <Dropdown.Toggle as="button" size='lg' className="p-0 border-0 bg-transparent accountMenu">
        <FaUserCircle size={24} className="me-2" />
      </Dropdown.Toggle>

      {/* 下拉選單內容 */}
      <Dropdown.Menu className="w-48">
        <Dropdown.Item className="d-flex align-items-center gap-2">
          <FaCrown className="text-secondary" />
          <span>Go Pro</span>
        </Dropdown.Item>

        <Dropdown.Divider />

        <Dropdown.Item className="d-flex align-items-center gap-2">
          <FaUser className="text-secondary" />
          <span>Profile & account</span>
        </Dropdown.Item>

        <Dropdown.Item className="d-flex align-items-center gap-2">
          <FaCommentDots className="text-secondary" />
          <span>Feedback</span>
        </Dropdown.Item>

        <Dropdown.Divider />

        <Dropdown.Item className="d-flex align-items-center gap-2">
          <FaCog className="text-secondary" />
          <span>Settings</span>
        </Dropdown.Item>

        <Dropdown.Item className="d-flex align-items-center gap-2">
          <FaSignOutAlt className="text-secondary" />
          <span>Logout</span>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

// 上方導航列
interface NavbarProps {
  sidebarOpen: boolean
  toggleSidebar: () => void
}
const Navbar: React.FC<NavbarProps> = ({sidebarOpen, toggleSidebar}) => {
  const [currentTime, setCurrentTime] = React.useState('');
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString(undefined, { timeZoneName: 'short' }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
          { sidebarOpen ? <RiMenuUnfold4Line size={24} /> : <RiMenuLine size={24} /> }
        </Button>
        <BsNavbar.Brand as={Link} to="/" className="d-flex align-items-center ms-2">
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
        <BsNavbar.Collapse id="navbar-content" className="justify-content-end gap-2">
          <Nav>
            {currentTime}
          </Nav>
          <Nav>
            <AccountMenu />
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

  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleExpand = (key: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  const IconWrapper = ({ icon }: { icon: JSX.Element }) => {
    return(
      <span
        className="d-flex justify-content-center align-items-center me-2"
        style={{width: '24px', height: '24px'}}
      >
        {React.cloneElement(icon, { size: 20 })}
      </span>
    )
  }

  const menuItems = [
    { icon: <FaTachometerAlt/>, text: 'Dashboard', path: '/' },
    { icon: <FaShoppingCart/>, text: 'Orders', path: '/orders' },
    {
      icon: <FaChartBar/>,
      text: 'Reports',
      path: '/reports',
      subItems: [
        { icon: <FaTachometerAlt/>, text: 'Sales', path: '/reports/sales'},
        { icon: <FaChartBar/> , text: 'Traffic', path: '/reports/traffic'}
      ]
    },
    {
      icon: <FaChartBar/>,
      text: 'Reports2',
      path: '/reports2',
      subItems: [
        { icon: <FaTachometerAlt/>, text: 'Sales2', path: '/reports2/sales2'},
        { icon: <FaChartLine/>, text: 'Traffic2', path: '/reports2/traffic2'}
      ]
    },
    { icon: <FaPlug/>, text: 'Integrations', path: '/integrations' },
    { icon: <FaCogs/>, text: 'Setting', path: '/setting' }
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.split('/')[1] === path.split('/')[1];
    // return location.pathname.startsWith(path);
  };

  return (
    <div className={"sidebar bg-white border-end d-flex flex-column"}>
      <Nav className="flex-column p-1">
        {menuItems.map((item, index) => {
          const itemKey = `${item.path}_${index}`
          
          return(
            <div key={index}>
              {item.subItems ? (
                // Menu item with submenu
                <div>
                  <Nav.Link
                    className={`d-flex align-items-center justify-content-between mb-1 px-3${
                      isActive(item.path) ? 'active' : ''
                    }`}
                    onClick={() => toggleExpand(itemKey)}
                  >
                    <div className="d-flex align-items-center">
                      <IconWrapper icon={item.icon}/>
                      {sidebarOpen && item.text}
                    </div>
                    <div style={{position: 'absolute', right: '8%'}}>
                      {!sidebarOpen ? <IoIosArrowForward /> :(
                        expandedItems[itemKey] ? <FaChevronUp /> : <FaChevronDown />
                      )}
                    </div>
                  </Nav.Link>

                  {sidebarOpen && (
                    <Collapse in={expandedItems[itemKey]}>
                      <div className="ms-4">
                        {item.subItems.map((subItem, subIndex) => (
                          <Nav.Link
                            key={subIndex}
                            as={Link}
                            to={subItem.path}
                            className={`d-flex align-items-center mb-1 ${
                              location.pathname === subItem.path ? 'active' : ''
                            }`}
                          >
                            {/* <span
                              className="d-flex justify-content-center align-items-center me-2"
                              style={{width: '24px', height: '24px'}}
                            > */}
                              <IconWrapper icon={subItem.icon}/>
                            {/* </span> */}
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
                  className={`d-flex align-items-center mb-1 px-3 ${
                    isActive(item.path) ? 'active' : ''
                  }`}
                >
                  <IconWrapper icon={item.icon}/>
                  {sidebarOpen && item.text}
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

// 麵包屑導覽
const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x); // 拆分路径

  return (
    <Breadcrumb>
      <Breadcrumb.Item 
        active={location.pathname === "/"}
        key="/" 
        linkAs={Link} 
        linkProps={{ to: '/' }} 
      >
        Home
      </Breadcrumb.Item>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`; // 构建每个路径的 URL
        const isLast = index === pathnames.length - 1; // 判断是否是最后一项

        return isLast ? (
          <Breadcrumb.Item 
            active 
            key={to} 
          >
            {value.charAt(0).toUpperCase() + value.slice(1)} {/* 首字母大写 */}
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item 
            key={to} 
            linkAs={Link} 
            linkProps={{ to }} 
          >
            {value.charAt(0).toUpperCase() + value.slice(1)} {/* 首字母大写 */}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

// 主要內容區域
const PageContainer: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return (
    <div
      className="p-3 pt-1"
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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
    document.documentElement.style.setProperty('--sidebar-width', sidebarOpen ? '72px' : '240px')
  };

  return (
    <>
      <Navbar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}/>
      <Sidebar sidebarOpen={sidebarOpen}/>
      <PageContainer>
        <Breadcrumbs />
        <Outlet />
        <Footer />
      </PageContainer>
    </>
  );
};

export default MainLayout;
