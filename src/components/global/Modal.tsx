import { FC, ReactNode } from "react";
import { Modal, Button } from "react-bootstrap";

type FooterButton = {
  label: string;
  variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
  onClick: () => void;
};

type MyModalProps = {
  show: boolean;
  onHide: () => void;
  title?: string;
  children: ReactNode;
  footerButtons?: FooterButton[];
};

const MyModal: FC<MyModalProps> = ({
  show,
  onHide,
  title = "Modal Title",
  children,
  footerButtons = [],
}) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        {footerButtons.map((btn, index) => (
          <Button key={index} variant={btn.variant || "primary"} onClick={btn.onClick}>
            {btn.label}
          </Button>
        ))}
      </Modal.Footer>
    </Modal>
  );
};

export default MyModal;
