import React from "react";
import { SmartQuery } from "../components/ReactTabulator"; // 引入 TabulatorTable 组件
import { ReportQueryDemo } from "../mockData/UseMockData";
import DashboardCard from "../components/DashboardCard";

const ReportQuery: React.FC = () => {
  const tableData = ReportQueryDemo(800);
  return (
    <div>
      <DashboardCard>
        <SmartQuery rows={tableData} height="550px" autoColumns />
      </DashboardCard>
    </div>
  );
};

export default ReportQuery;
