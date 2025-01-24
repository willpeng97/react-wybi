import React from "react";
import TabulatorTable from "../components/ReactTabulator"; // 引入 TabulatorTable 組件
import { Formatter } from "tabulator-tables";

const tableData = [
  {
    machineName: "Machine A",
    utilizationRate: 95,
    outputQuantity: 1000,
    productInProduction: "Widget X",
    operators: "John, Emily, Alex",
  },
  {
    machineName: "Machine B",
    utilizationRate: 75,
    outputQuantity: 800,
    productInProduction: "Gadget Y",
    operators: "Sarah, Michael, Jessica",
  },
  // 其他數據
];

const columns = [
  { title: "Machine Name", field: "machineName", width: 150},
  {
    title: "Utilization Rate",
    field: "utilizationRate",
    formatter: "progress" as Formatter,
    formatterParams: {
      color: ["#BDBDBD", "#43A047"],
      legend: false
    },
    width: 150
  },
  { title: "Output Quantity", field: "outputQuantity", width: 150 },
  { title: "Product in Production", field: "productInProduction", width: 200 },
  { title: "Operators", field: "operators", width: 150 }
];

const EqpOverview: React.FC = () => {
  return (
    <div>
      <TabulatorTable columns={columns} rows={tableData} height="500px" />
    </div>
  );
};

export default EqpOverview;
