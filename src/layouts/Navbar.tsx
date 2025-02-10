import { FC, useEffect, useState } from "react";
import { RiMenuLine, RiMenuUnfold4Line } from "react-icons/ri";
import { useAuth } from "../auth/AuthProvider";
import {
  Navbar as BsNavbar,
  Button,
  Container,
  Dropdown,
  Nav,
} from "react-bootstrap";
import {
  FaUser,
  FaCommentDots,
  FaCog,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaCircleQuestion } from "react-icons/fa6";

// 用戶頭像
const AccountMenu = () => {
  const { logout } = useAuth(); // 透過 useAuth 提供的登出方法
  const handleLogout = () => logout();

  const username = localStorage.getItem('username')

  return (
    <Dropdown align="end">
      {/* 頭像觸發器 */}
      <Dropdown.Toggle
        as="button"
        size="lg"
        className="p-0 border-0 bg-transparent accountMenu"
      >
        <FaUserCircle size={24} className="me-2" />
      </Dropdown.Toggle>

      {/* 下拉選單內容 */}
      <Dropdown.Menu className="w-48">
        <Dropdown.Item className="d-flex align-items-center gap-2">
          <FaUser className="text-secondary" />
          <span>{username}</span>
        </Dropdown.Item>

        <Dropdown.Divider />

        <Dropdown.Item className="d-flex align-items-center gap-2">
          <FaCircleQuestion className="text-secondary" />
          <span>Support</span>
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

        <Dropdown.Item
          className="d-flex align-items-center gap-2"
          onClick={handleLogout} // 綁定登出事件
        >
          <FaSignOutAlt className="text-secondary" />
          <span>Logout</span>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

// 上方導航列
interface NavbarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}
const Navbar: FC<NavbarProps> = ({ sidebarOpen, toggleSidebar }) => {
  const [currentTime, setCurrentTime] = useState("");
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString(undefined, { timeZoneName: "short" })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <BsNavbar
      className="bg-white border-bottom sticky-top"
      style={{ height: "var(--navbar-height)" }}
    >
      <Container fluid>
        {/* 左側部分 */}
        <Button
          variant="light"
          onClick={toggleSidebar}
          style={{ border: "none", background: "none" }}
        >
          {sidebarOpen ? (
            <RiMenuUnfold4Line size={24} />
          ) : (
            <RiMenuLine size={24} />
          )}
        </Button>
        <BsNavbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center ms-2"
        >
          <img src="brand.png" alt="Brand Logo" height={24} className="me-2" />
          Weyu
        </BsNavbar.Brand>

        {/* 右側部分 */}
        <BsNavbar.Toggle aria-controls="navbar-content" />
        <BsNavbar.Collapse
          id="navbar-content"
          className="justify-content-end gap-2"
        >
          <Nav>{currentTime}</Nav>
          <Nav>
            <AccountMenu />
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};

export default Navbar