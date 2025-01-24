import React, { useEffect, useRef } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables"; // 引入 Tabulator 庫
import "tabulator-tables/dist/css/tabulator.min.css"; // 引入 Tabulator 樣式


const tableData = [
  {
    machineName: "Machine A",
    utilizationRate: (Math.random() * 100).toFixed(0),
    outputQuantity: Math.random() * 1000,
    productInProduction: "Widget X",
    operators: "John, Emily, Alex"
  },
  {
    machineName: "Machine B",
    utilizationRate: (Math.random() * 100).toFixed(0),
    outputQuantity: Math.random() * 1000,
    productInProduction: "Gadget Y",
    operators: "Sarah, Michael, Jessica"
  },
  {
    machineName: "Machine C",
    utilizationRate: (Math.random() * 100).toFixed(0),
    outputQuantity: Math.random() * 1000,
    productInProduction: "Gizmo Z",
    operators: "David, Olivia, Thomas"
  },
  {
    machineName: "Machine A",
    utilizationRate: (Math.random() * 100).toFixed(0),
    outputQuantity: Math.random() * 1000,
    productInProduction: "Widget X",
    operators: "John, Emily, Alex"
  },
  {
    machineName: "Machine B",
    utilizationRate: (Math.random() * 100).toFixed(0),
    outputQuantity: Math.random() * 1000,
    productInProduction: "Gadget Y",
    operators: "Sarah, Michael, Jessica"
  },
  {
    machineName: "Machine C",
    utilizationRate: (Math.random() * 100).toFixed(0),
    outputQuantity: Math.random() * 1000,
    productInProduction: "Gizmo Z",
    operators: "David, Olivia, Thomas"
  },
  {
    machineName: "Machine A",
    utilizationRate: (Math.random() * 100).toFixed(0),
    outputQuantity: Math.random() * 1000,
    productInProduction: "Widget X",
    operators: "John, Emily, Alex"
  },
  {
    machineName: "Machine B",
    utilizationRate: (Math.random() * 100).toFixed(0),
    outputQuantity: Math.random() * 1000,
    productInProduction: "Gadget Y",
    operators: "Sarah, Michael, Jessica"
  },
  {
    machineName: "Machine C",
    utilizationRate: (Math.random() * 100).toFixed(0),
    outputQuantity: Math.random() * 1000,
    productInProduction: "Gizmo Z",
    operators: "David, Olivia, Thomas"
  },
  {
    machineName: "Machine A",
    utilizationRate: (Math.random() * 100).toFixed(0),
    outputQuantity: Math.random() * 1000,
    productInProduction: "Widget X",
    operators: "John, Emily, Alex"
  },
  {
    machineName: "Machine B",
    utilizationRate: (Math.random() * 100).toFixed(0),
    outputQuantity: Math.random() * 1000,
    productInProduction: "Gadget Y",
    operators: "Sarah, Michael, Jessica"
  },
  {
    machineName: "Machine C",
    utilizationRate: (Math.random() * 100).toFixed(0),
    outputQuantity: Math.random() * 1000,
    productInProduction: "Gizmo Z",
    operators: "David, Olivia, Thomas"
  },
  {
    machineName: "Machine A",
    utilizationRate: (Math.random() * 100).toFixed(0),
    outputQuantity: Math.random() * 1000,
    productInProduction: "Widget X",
    operators: "John, Emily, Alex"
  },
  {
    machineName: "Machine B",
    utilizationRate: (Math.random() * 100).toFixed(0),
    outputQuantity: Math.random() * 1000,
    productInProduction: "Gadget Y",
    operators: "Sarah, Michael, Jessica"
  },
  {
    machineName: "Machine C",
    utilizationRate: (Math.random() * 100).toFixed(0),
    outputQuantity: Math.random() * 1000,
    productInProduction: "Gizmo Z",
    operators: "David, Olivia, Thomas"
  },
  {
    machineName: "Machine A",
    utilizationRate: (Math.random() * 100).toFixed(0),
    outputQuantity: Math.random() * 1000,
    productInProduction: "Widget X",
    operators: "John, Emily, Alex"
  },
  {
    machineName: "Machine B",
    utilizationRate: (Math.random() * 100).toFixed(0),
    outputQuantity: Math.random() * 1000,
    productInProduction: "Gadget Y",
    operators: "Sarah, Michael, Jessica"
  },
  {
    machineName: "Machine C",
    utilizationRate: (Math.random() * 100).toFixed(0),
    outputQuantity: Math.random() * 1000,
    productInProduction: "Gizmo Z",
    operators: "David, Olivia, Thomas"
  },
  {
    machineName: "Machine A",
    utilizationRate: (Math.random() * 100).toFixed(0),
    outputQuantity: Math.random() * 1000,
    productInProduction: "Widget X",
    operators: "John, Emily, Alex"
  },
  {
    machineName: "Machine B",
    utilizationRate: (Math.random() * 100).toFixed(0),
    outputQuantity: Math.random() * 1000,
    productInProduction: "Gadget Y",
    operators: "Sarah, Michael, Jessica"
  },
  {
    machineName: "Machine C",
    utilizationRate: (Math.random() * 100).toFixed(0),
    outputQuantity: Math.random() * 1000,
    productInProduction: "Gizmo Z",
    operators: "David, Olivia, Thomas"
  },
  {
    machineName: "Machine A",
    utilizationRate: (Math.random() * 100).toFixed(0),
    outputQuantity: Math.random() * 1000,
    productInProduction: "Widget X",
    operators: "John, Emily, Alex"
  },
  {
    machineName: "Machine B",
    utilizationRate: (Math.random() * 100).toFixed(0),
    outputQuantity: Math.random() * 1000,
    productInProduction: "Gadget Y",
    operators: "Sarah, Michael, Jessica"
  },
  {
    machineName: "Machine C",
    utilizationRate: (Math.random() * 100).toFixed(0),
    outputQuantity: Math.random() * 1000,
    productInProduction: "Gizmo Z",
    operators: "David, Olivia, Thomas"
  },
];


// interface TableData {
//   machineName: string;
//   utilizationRate: number;
//   outputQuantity: number;
//   productInProduction: string;
//   operators: string;
// }

// interface TabulatorTableProps {
//   data: TableData[]; // 從父組件傳入的數據
// }

const TabulatorTable = () => {
  const el = useRef<HTMLDivElement | null>(null); // 用於引用 DOM 元素
  const tabulatorRef = useRef<Tabulator | null>(null); // 用於保存 Tabulator 實例

  useEffect(() => {
    // 在組件加載完成後初始化 Tabulator
    if (el.current) {
      // tabulatorRef.current = new Tabulator(el.current, {
      //   data: data, // 將數據與表格綁定
      //   reactiveData: true, // 啟用數據反應式更新
      //   layout:"fitDataStretch",
      //   autoColumns: true, // 自动生成列
      // });
      tabulatorRef.current = new Tabulator(el.current, {
        height: "550px",
        layout: "fitDataStretch",
        pagination:true,
        reactiveData: true,
        columns: [
          { title: "Machine Name", field: "machineName", width: 150},
          {
            title: "Utilization Rate",
            field: "utilizationRate",
            formatter: "progress",
            formatterParams: {
              color: ["#BDBDBD", "#43A047"],
              legend: false
            },
            width: 150
          },
          { title: "Output Quantity", field: "outputQuantity", width: 150 },
          { title: "Product in Production", field: "productInProduction", width: 200 },
          { title: "Operators", field: "operators", width: 150 }
        ],
        data: tableData,
      });
    }

    // 清理 Tabulator 實例，並檢查是否有有效的元素
    return () => {
      if (tabulatorRef.current && el.current) {
        tabulatorRef.current.destroy();
      }
    };
  }, []); // 當 data 發生變化時重新渲染 Tabulator

  return <div ref={el} />; // 返回帶有 ref 的 div 元素
};

export default TabulatorTable;
