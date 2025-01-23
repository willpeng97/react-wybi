// pages/LoginPage.tsx
import React, { FormEvent } from "react";
import {
  Form,
  Button,
  Container,
  Card,
  InputGroup,
} from "react-bootstrap";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import { FaLock, FaUser } from "react-icons/fa";

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const account = formData.get("text") as string;
    const password = formData.get("password") as string;

    // 調用 login 方法進行登入
    login(account, password);

    // 登入成功後導航到主頁
    navigate("/");
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundImage: 'url(background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <Card style={{ width: "24rem", padding: "1rem" }}>
        <Card.Body>
          <div className="flex flex-col mb-3 w-full justify-center text-center">
            <img src="brand.png" alt="LOGO" style={{height:"48px"}} />
            <h5>WeyuBI</h5>
            <small>Welcome back, please log in.</small>
          </div>
          <Form onSubmit={handleLogin}>
            {/* User ID input */}
            <Form.Group className="mb-4" controlId="formUserId">
              <InputGroup className="bg-white rounded shadow-sm">
                <InputGroup.Text className="bg-transparent">
                  <FaUser className="text-secondary" />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="User ID"
                  className="bg-transparent text-secondary placeholder-secondary shadow-none"
                />
              </InputGroup>
            </Form.Group>

            {/* Password input */}
            <Form.Group className="mb-4" controlId="formPassword">
              <InputGroup className="bg-white rounded shadow-sm">
                <InputGroup.Text className="bg-transparent">
                  <FaLock className="text-secondary" />
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="The password"
                  className="bg-transparent text-secondary placeholder-secondary shadow-none"
                />
              </InputGroup>
            </Form.Group>

            <div className="d-flex justify-content-between align-items-center mb-4">
              {/* Checkbox */}
              <Form.Check
                type="checkbox"
                label="Remember me"
                id="formRemember"
              />
              <a href="#!">Forgot password?</a>
            </div>

            {/* Submit button */}
            <Button type="submit" className="btn w-100" variant="primary">
              Sign in
            </Button>

            <div className="text-center w-100 text-muted my-2">OR</div>

            <Button
              className="btn btn-secondary w-100 mb-3 d-flex align-items-center justify-content-center"
              href="#!"
            >
              Continue as Guest
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginPage;
