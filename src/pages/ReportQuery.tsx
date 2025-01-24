import React from "react";
import TabulatorTable from "../components/ReactTabulator"; // 引入 TabulatorTable 組件
import tableData from "../mockData/WIP_OPI_WDOEACICO_HIST.json"


const ReportQuery: React.FC = () => {
  return (
    <div>
      <TabulatorTable rows={tableData} height="550px" autoColumns/>
    </div>
  );
};

export default ReportQuery;
