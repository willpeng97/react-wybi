// layouts/MainLayout.tsx
import React from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';

const MainLayout: React.FC = () => {
  return (
    <div className="d-flex min-vh-100">
      <Sidebar />
      <div className="flex-grow-1">
        <Navbar />
        <main className="p-4 bg-light">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
