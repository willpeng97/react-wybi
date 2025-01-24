import React from "react";
import TabulatorTable from "../components/ReactTabulator"; // 引入 TabulatorTable 組件
import tableData from "../mockData/EQP_STATUS_CHANGE_HIST.json"


const StatusChangeHist: React.FC = () => {
  return (
    <div>
      <TabulatorTable rows={tableData} height="550px" autoColumns/>
    </div>
  );
};

export default StatusChangeHist;
