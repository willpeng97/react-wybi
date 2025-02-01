import React from "react";
import { GridTable } from "../components/GridTable"; // 引入 TabulatorTable 組件
// import tableData from "../mockData/EQP_STATUS_CHANGE_HIST.json"
import { StatusChangeHistDemo } from "../mockData/UseMockData"
import DashboardCard from "../components/DashboardCard";


const StatusChangeHist: React.FC = () => {
  const tableData = StatusChangeHistDemo(500);
  return (
    <div>
      <DashboardCard>
        <GridTable rows={tableData} height="550px" autoColumns/>
      </DashboardCard>

    </div>
  );
};

export default StatusChangeHist;
