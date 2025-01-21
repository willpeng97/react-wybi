// components/DashboardCard.tsx
import React, { ReactNode } from 'react';
import { Card } from 'react-bootstrap';

interface DashboardCardProps {
  title?: string;
  children: ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, children }) => {
  return (
    <Card className="shadow-sm h-100">
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