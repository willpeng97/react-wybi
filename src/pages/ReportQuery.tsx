import React from "react";
import TabulatorTable from "../components/ReactTabulator"; // 引入 TabulatorTable 组件
import { ReportQueryDemo } from "../mockData/UseMockData";

const ReportQuery: React.FC = () => {
  const tableData = ReportQueryDemo(800);
  return (
    <div>
      <TabulatorTable rows={tableData} height="550px" autoColumns />
    </div>
  );
};

export default ReportQuery;
