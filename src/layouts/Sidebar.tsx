// layouts/Sidebar.tsx
import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { 
  BsSpeedometer2,
  BsCart3,
  BsBarChart,
  BsGraphUp,
  BsGear,
  BsPlug,
  BsChevronDown,
  BsChevronUp
} from 'react-icons/bs';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [isReportsOpen, setIsReportsOpen] = useState(
    location.pathname.startsWith('/reports')
  );

  const menuItems = [
    { 
      icon: <BsSpeedometer2 />, 
      text: 'Dashboard', 
      path: '/' 
    },
    { 
      icon: <BsCart3 />, 
      text: 'Orders', 
      path: '/orders' 
    },
    { 
      icon: <BsBarChart />,
      text: 'Reports',
      path: '/reports',
      subItems: [
        { text: 'Sales', path: '/reports/sales' },
        { text: 'Traffic', path: '/reports/traffic' }
      ]
    },
    { 
      icon: <BsPlug />, 
      text: 'Integrations', 
      path: '/integrations' 
    },
    { 
      icon: <BsGear />, 
      text: 'Setting', 
      path: '/setting' 
    }
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="sidebar bg-white border-end" style={{ width: '250px', minHeight: '100vh' }}>
      <div className="p-3 border-bottom">
        <img src="/brand.png" alt="Logo" height="30" />
        Weyu
      </div>
      
      <Nav className="flex-column p-3">
        {menuItems.map((item, index) => (
          <div key={index}>
            {item.subItems ? (
              // Menu item with submenu
              <div>
                <Nav.Link
                  className={`d-flex align-items-center justify-content-between mb-2 ${
                    isActive(item.path) ? 'active' : ''
                  }`}
                  onClick={() => setIsReportsOpen(!isReportsOpen)}
                >
                  <div className="d-flex align-items-center">
                    <span className="me-2">{item.icon}</span>
                    {item.text}
                  </div>
                  {isReportsOpen ? <BsChevronUp /> : <BsChevronDown />}
                </Nav.Link>
                
                {isReportsOpen && (
                  <div className="ms-4 mb-2">
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
                          <BsGraphUp />
                        </span>
                        {subItem.text}
                      </Nav.Link>
                    ))}
                  </div>
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
                {item.text}
              </Nav.Link>
            )}
          </div>
        ))}
      </Nav>
    </div>
  );
};

export default Sidebar;