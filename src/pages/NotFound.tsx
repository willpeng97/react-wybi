import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <Container
      fluid
      className="d-flex flex-column align-items-center justify-content-center bg-light text-center"
      style={{height: '75vh'}}
    >
      <h1 className="display-1 text-dark">404</h1>
      <p className="fs-4 text-secondary">Page Not Found</p>
      <Button variant="primary" size="lg" onClick={goHome}>
        Go to Homepage
      </Button>
    </Container>
  );
};

export default NotFound;
