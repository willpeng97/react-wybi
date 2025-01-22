// pages/LoginPage.tsx
import React, { FormEvent } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useAuth } from '../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // 調用 login 方法進行登入
    login(email, password);

    // 登入成功後導航到主頁
    navigate('/');
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col>
          <Card style={{ width: '24rem', padding: '1rem' }}>
            <Card.Body>
              <Card.Title className="text-center mb-4">Login</Card.Title>
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>
              </Form>
              <div className="text-center mt-3">
                <a href="/register" className="text-decoration-none">
                  Don’t have an account? Sign up
                </a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
