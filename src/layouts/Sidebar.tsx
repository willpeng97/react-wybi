// layouts/Sidebar.tsx
import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { 
  BsSpeedometer2, 
  BsGraphUp, 
  BsPeople, 
  BsCart3,
  BsBook,
  BsKanban,
  BsChat,
  BsEnvelope,
  BsCalendar3,
  BsGlobe
} from 'react-icons/bs';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { icon: <BsSpeedometer2 />, text: 'Dashboard', path: '/', badge: 'Default' },
    { icon: <BsGraphUp />, text: 'Analytics', path: '/analytics' },
    { icon: <BsPeople />, text: 'CRM', path: '/crm' },
    { icon: <BsCart3 />, text: 'E commerce', path: '/ecommerce' },
    { icon: <BsBook />, text: 'LMS', path: '/lms', badge: 'New' },
    { icon: <BsKanban />, text: 'Management', path: '/management' },
    { icon: <BsChat />, text: 'Support desk', path: '/support', badge: 'New' },
  ];

  const secondaryItems = [
    { icon: <BsCalendar3 />, text: 'Calendar', path: '/calendar' },
    { icon: <BsChat />, text: 'Chat', path: '/chat' },
    { icon: <BsEnvelope />, text: 'Email', path: '/email' },
    { icon: <BsGlobe />, text: 'Social', path: '/social' },
  ];

  return (
    <div className="sidebar bg-white border-end" style={{ width: '250px', minHeight: '100vh' }}>
      <div className="p-3 border-bottom">
        <img src="/brand.png" alt="Falcon Logo" height="30" />
        Weyu
      </div>
      
      <Nav className="flex-column p-3">
        <div className="mb-4">
          {menuItems.map((item, index) => (
            <Nav.Link 
              as={Link}
              to={item.path}
              key={index}
              className={`d-flex align-items-center mb-2 ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="me-2">{item.icon}</span>
              {item.text}
              {item.badge && (
                <span className={`ms-auto badge ${item.badge === 'New' ? 'bg-success' : 'bg-primary'}`}>
                  {item.badge}
                </span>
              )}
            </Nav.Link>
          ))}
        </div>

        <div className="mb-4">
          <small className="text-muted text-uppercase">App</small>
          {secondaryItems.map((item, index) => (
            <Nav.Link 
              as={Link}
              to={item.path}
              key={index}
              className={`d-flex align-items-center mb-2 ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="me-2">{item.icon}</span>
              {item.text}
            </Nav.Link>
          ))}
        </div>
      </Nav>
    </div>
  );
};

export default Sidebar;