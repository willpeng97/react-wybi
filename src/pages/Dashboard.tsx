// pages/Dashboard.tsx
import React from 'react';
import { Row, Col, ProgressBar } from 'react-bootstrap';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { BsArrowUp } from 'react-icons/bs';
import DashboardCard from '../components/DashboardCard';
import WeeklySalesChart from '../components/WeeklySalesChart';
import ProjectProgress from '../components/ProjectProgress';

const salesData = [
  { name: 'Jan 5', value: 60 },
  { name: 'Jan 7', value: 80 },
  { name: 'Jan 9', value: 65 },
  { name: 'Jan 11', value: 80 },
  { name: 'Jan 13', value: 120 },
  { name: 'Jan 15', value: 30 },
  { name: 'Jan 17', value: 70 },
];

const Dashboard: React.FC = () => {
  return (
    <div>
      <Row className="g-3 mb-3">
        {/* Weekly Sales Card */}
        <Col md={4}>
          <DashboardCard title="Weekly Sales">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="mb-0">$47K</h3>
              <div className="text-success">
                <BsArrowUp /> 3.5%
              </div>
            </div>
            <WeeklySalesChart />
          </DashboardCard>
        </Col>

        {/* Total Order Card */}
        <Col md={4}>
          <DashboardCard title="Total Order">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="mb-0">58.4K</h3>
              <div className="text-primary">
                <BsArrowUp /> 13.6%
              </div>
            </div>
            <ResponsiveContainer width="100%" height={100}>
              <LineChart data={salesData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#2c7be5"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </DashboardCard>
        </Col>

        {/* Market Share Card */}
        <Col md={4}>
          <DashboardCard title="Market Share">
            <div className="text-center">
              <h3 className="mb-0">26M</h3>
              <div className="d-flex justify-content-center mt-3">
                <div className="px-3 border-end">
                  <div className="dot bg-primary"></div>
                  <small>Samsung</small>
                </div>
                <div className="px-3 border-end">
                  <div className="dot bg-info"></div>
                  <small>Huawei</small>
                </div>
                <div className="px-3">
                  <div className="dot bg-secondary"></div>
                  <small>Apple</small>
                </div>
              </div>
            </div>
          </DashboardCard>
        </Col>
      </Row>

      <Row className="g-3 mb-3">
        {/* Projects Card */}
        <Col md={8}>
          <DashboardCard title="Running Projects">
            <ProjectProgress />
          </DashboardCard>
        </Col>

        {/* Storage Card */}
        <Col md={4}>
          <DashboardCard title="Storage Status">
            <h6 className="mb-3">Using Storage 1775.06 MB of 2 GB</h6>
            <div className="storage-bars">
              <div className="mb-2">
                <small>Regular (895MB)</small>
                <ProgressBar now={44.75} variant="primary" />
              </div>
              <div className="mb-2">
                <small>System (379MB)</small>
                <ProgressBar now={18.95} variant="info" />
              </div>
              <div className="mb-2">
                <small>Shared (192MB)</small>
                <ProgressBar now={9.6} variant="success" />
              </div>
              <div>
                <small>Free (576MB)</small>
                <ProgressBar now={28.8} variant="light" />
              </div>
            </div>
          </DashboardCard>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;