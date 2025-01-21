// layouts/Navbar.tsx
import React from 'react';
import { Navbar as BsNavbar, Nav, Form } from 'react-bootstrap';
import { BsBell, BsGear, BsGrid3X3Gap, BsPerson } from 'react-icons/bs';

const Navbar: React.FC = () => {
  return (
    <BsNavbar
      className="bg-white border-bottom px-4 py-2 sticky-top" 
      style={{
        height:'48px',
        marginLeft:'var(--sidebar-width)',
        transition: 'margin-left 0.3s ease'
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

export default Navbar;
