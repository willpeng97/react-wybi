import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Table, Spinner } from 'react-bootstrap';

const Query = () => {
  // 狀態變量
  const [orderId, setOrderId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [orders, setOrders] = useState<any[]>([]);

  // 模擬查詢 API 函數
  const fetchOrders = () => {
    setLoading(true);
    setTimeout(() => {
      setOrders([
        { orderId: '001', customerName: 'John Doe', status: 'Shipped', date: '2025-01-20' },
        { orderId: '002', customerName: 'Jane Smith', status: 'Pending', date: '2025-01-22' },
      ]);
      setLoading(false);
    }, 1000);
  };

  // 查詢提交處理
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrders();
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col md={12}>
          <h3>訂單查詢</h3>
          <Form onSubmit={handleSearch}>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="orderId">
                  <Form.Label>訂單編號</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="輸入訂單編號"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="customerName">
                  <Form.Label>顧客名稱</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="輸入顧客名稱"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="status">
                  <Form.Label>訂單狀態</Form.Label>
                  <Form.Control
                    as="select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="">全部</option>
                    <option value="Shipped">已發貨</option>
                    <option value="Pending">待處理</option>
                    <option value="Cancelled">已取消</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : '查詢'}
            </Button>
          </Form>
        </Col>
      </Row>

      {/* 顯示查詢結果 */}
      {orders.length > 0 && (
        <Row className="mt-4">
          <Col md={12}>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>訂單編號</th>
                  <th>顧客名稱</th>
                  <th>狀態</th>
                  <th>訂單日期</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.orderId}>
                    <td>{order.orderId}</td>
                    <td>{order.customerName}</td>
                    <td>{order.status}</td>
                    <td>{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}

      {/* 無結果顯示 */}
      {orders.length === 0 && !loading && (
        <Row className="mt-4">
          <Col md={12}>
            <p>沒有符合的訂單。</p>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Query;
