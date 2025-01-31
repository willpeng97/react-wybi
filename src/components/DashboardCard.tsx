// components/DashboardCard.tsx
import React, { CSSProperties, ReactNode } from 'react';
import { Card } from 'react-bootstrap';

interface DashboardCardProps {
  title?: string;
  children: ReactNode;
  style?: CSSProperties;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, children, style }) => {
  return (
    <Card className="dashboard-card shadow-sm h-100" style={style}>
      {title && (
        <Card.Header className="bg-white border-bottom">
          <h6 className="mb-0">{title}</h6>
        </Card.Header>
      )}
      <Card.Body>{children}</Card.Body>
    </Card>
  );
};

export default DashboardCard;