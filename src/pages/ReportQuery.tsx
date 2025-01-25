import React from "react";
import { SmartQuery } from "../components/ReactTabulator"; // 引入 TabulatorTable 组件
import { ReportQueryDemo } from "../mockData/UseMockData";

const ReportQuery: React.FC = () => {
  const tableData = ReportQueryDemo(800);
  return (
    <div>
      <SmartQuery rows={tableData} height="550px" autoColumns />
    </div>
  );
};

export default ReportQuery;
