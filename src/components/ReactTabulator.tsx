import { useEffect, useRef } from "react";
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

const TabulatorTable = () => {
  const el = useRef<HTMLDivElement | null>(null); // 用於引用 DOM 元素
  const tabulatorRef = useRef<Tabulator | null>(null); // 用於保存 Tabulator 實例

  useEffect(() => {
    // 在組件加載完成後初始化 Tabulator
    if (el.current) {
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
        locale:"zh_TW",
        langs:{
          "zh_TW":{
            "pagination":{
              "page_size":"Page Size", //label for the page size select element
              "page_title":"Show Page",//tooltip text for the numeric page button, appears in front of the page number (eg. "Show Page" will result in a tool tip of "Show Page 1" on the page 1 button)
              "first":"<<", //text for the first page button
              "first_title":"First Page", //tooltip text for the first page button
              "last":">>",
              "last_title":"Last Page",
              "prev":"<",
              "prev_title":"Prev Page",
              "next":">",
              "next_title":"Next Page",
              "all":"All",
              "counter":{
                  "showing": "Showing",
                  "of": "of",
                  "rows": "rows",
                  "pages": "pages",
              }
            },
          }
        },
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
