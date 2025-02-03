import React from "react";
import { GridTable } from "../components/global/GridTable"; // 引入 TabulatorTable 组件
import { ReportQueryDemo } from "../mockData/UseMockData";
import DashboardCard from "../components/global/DashboardCard";

const ReportQuery: React.FC = () => {
  const tableData = ReportQueryDemo(800);
  return (
    <div>
      <DashboardCard>
        <GridTable rows={tableData} height="550px" autoColumns />
      </DashboardCard>
    </div>
  );
};

export default ReportQuery;
