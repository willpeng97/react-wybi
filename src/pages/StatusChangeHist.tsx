import React from "react";
import TabulatorTable from "../components/ReactTabulator"; // 引入 TabulatorTable 組件
// import tableData from "../mockData/EQP_STATUS_CHANGE_HIST.json"
import { StatusChangeHistDemo } from "../mockData/UseMockData"


const StatusChangeHist: React.FC = () => {
  const tableData = StatusChangeHistDemo(500);
  return (
    <div>
      <TabulatorTable rows={tableData} height="550px" autoColumns/>
    </div>
  );
};

export default StatusChangeHist;
