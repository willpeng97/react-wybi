import { FC, CSSProperties, ReactNode } from 'react';
import { Card } from 'react-bootstrap';

interface DashboardCardProps {
  title?: string;
  children: ReactNode;
  style?: CSSProperties;
  isInteractive?: boolean; // 控制 hover 是否有動畫效果
  className?: string; // 新增自訂 className 屬性
}

const DashboardCard: FC<DashboardCardProps> = ({
  title,
  children,
  style,
  isInteractive = false,
  className = '', // 設定預設值為空字串
}) => {
  return (
    <Card
      className={`dashboard-card shadow-sm h-100 ${isInteractive ? 'interactive' : ''} ${className}`}
      style={style}
    >
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
