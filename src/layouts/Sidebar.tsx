// layouts/Sidebar.tsx
import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
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

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

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
      style={{
        width: isCollapsed ? '80px' : '240px',
        minHeight: '100vh',
        transition: 'width 0.3s ease'
      }}
    >
      {/* Header */}
      <div
        className="p-3 border-bottom d-flex justify-content-between align-items-center"
        style={{ height: '60px' }}
      >
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
                    {isCollapsed && <IoIosArrowForward />}
                    {!isCollapsed && (
                      expandedItems[itemKey] ? <FaChevronUp /> : <FaChevronDown />
                    )}
                  </Nav.Link>

                  {expandedItems[itemKey] && !isCollapsed && (
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
                            {subItem.icon}
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

export default Sidebar;
