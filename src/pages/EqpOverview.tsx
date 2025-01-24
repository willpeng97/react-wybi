import React from "react";
import TabulatorTable from "../components/ReactTabulator"; // 引入 TabulatorTable 組件
import { Formatter } from "tabulator-tables";

const generateDemoData = () => {
  const data = [];
  for (let i = 0; i < 20; i++) {
    data.push({
      machineName: "Machine_" + i,
      utilizationRate: (Math.random() * 100).toFixed(0),
      outputQuantity: (Math.random() * 10000).toFixed(0),
      productInProduction: "產品 " + (Math.random() * 100).toFixed(0),
      operators: "John, Emily, Alex",
    });
  }
  return data;
};

const tableData = generateDemoData();

// const tableData = [
//   {
//     machineName: "Machine A",
//     utilizationRate: 95,
//     outputQuantity: 1000,
//     productInProduction: "Widget X",
//     operators: "John, Emily, Alex",
//   },
//   {
//     machineName: "Machine B",
//     utilizationRate: 75,
//     outputQuantity: 800,
//     productInProduction: "Gadget Y",
//     operators: "Sarah, Michael, Jessica",
//   },
//   // 其他數據
// ];

const columns = [
  { title: "EQP_NO", field: "machineName", width: 150},
  {
    title: "稼動率(%)",
    field: "utilizationRate",
    formatter: "progress" as Formatter,
    formatterParams: {
      color: ["#BDBDBD", "#43A047"],
      legend: false
    },
    width: 150
  },
  { title: "產出數", field: "outputQuantity", width: 150 },
  { title: "生產中產品", field: "productInProduction", width: 200 },
  { title: "操作員", field: "operators", width: 150 }
];

const EqpOverview: React.FC = () => {
  return (
    <div>
      <TabulatorTable columns={columns} rows={tableData} height="550px" />
    </div>
  );
};

export default EqpOverview;
