// pages/Dashboard.tsx
import React from 'react';
import { Row, Col, ProgressBar } from 'react-bootstrap';
import ReactECharts from 'echarts-for-react';
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

const TotalOrderChart: React.FC = () => {
  const option = {
    grid: {
      top: '5%',
      right: '1%',
      left: '1%',
      bottom: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: salesData.map(item => item.name),
      show: false
    },
    yAxis: {
      type: 'value',
      show: false
    },
    series: [
      {
        data: salesData.map(item => item.value),
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: {
          color: '#2c7be5',
          width: 2
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(44, 123, 229, 0.2)'
              },
              {
                offset: 1,
                color: 'rgba(44, 123, 229, 0)'
              }
            ]
          }
        }
      }
    ],
    tooltip: {
      trigger: 'axis',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formatter: (params: any) => {
        const dataIndex = params[0].dataIndex;
        return `${salesData[dataIndex].name}: ${salesData[dataIndex].value}K`;
      }
    }
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: '100px', width: '100%' }}
      opts={{ renderer: 'svg' }}
    />
  );
};

const MarketShareChart: React.FC = () => {
  const option = {
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        type: 'pie',
        radius: ['60%', '80%'],
        center: ['50%', '50%'],
        data: [
          { value: 40, name: 'Samsung', itemStyle: { color: '#2c7be5' } },
          { value: 35, name: 'Huawei', itemStyle: { color: '#27bcfd' } },
          { value: 25, name: 'Apple', itemStyle: { color: '#6c757d' } }
        ],
        label: {
          show: false
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: '120px', width: '100%' }}
      opts={{ renderer: 'svg' }}
    />
  );
};

const Dashboard: React.FC = () => {
  return (
    <div>
      <Row className="g-3 mb-3">
        {/* Weekly Sales Card */}
        <Col md={4}>
          <DashboardCard title="Weekly Sales" isInteractive>
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
          <DashboardCard title="Total Order" isInteractive>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="mb-0">58.4K</h3>
              <div className="text-primary">
                <BsArrowUp /> 13.6%
              </div>
            </div>
            <TotalOrderChart />
          </DashboardCard>
        </Col>

        {/* Market Share Card */}
        <Col md={4}>
          <DashboardCard title="Market Share" isInteractive>
            <div className="text-center">
              <h3 className="mb-0">26M</h3>
              <MarketShareChart />
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
          <DashboardCard title="Running Projects" isInteractive>
            <ProjectProgress />
          </DashboardCard>
        </Col>

        {/* Storage Card */}
        <Col md={4}>
          <DashboardCard title="Storage Status" isInteractive>
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
                <ProgressBar now={28.8} variant="secondary" />
              </div>
            </div>
          </DashboardCard>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;