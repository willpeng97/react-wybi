import { GridTable } from "../components/global/GridTable"; // 引入 TabulatorTable 組件
// import { Formatter } from "tabulator-tables";
import DashboardCard from "../components/global/DashboardCard";
import tableData from "../mockData/ProjectData.json"
import { Formatter } from "tabulator-tables";

const columns = [
  { title: "專案編號", field: "PROJECT_CODE", width: 150},
  { title: "專案名稱", field: "PROJECT_NAME", width: 150},
  { title: "專案狀態", field: "PROJECT_MAINTAIN_STATUS_NAME", width: 150},
  { title: "專案分類", field: "TYPE_NAME", width: 150},
  { title: "客戶編號", field: "CUSTOMER_NO", width: 150},
  {
    title: "進度",
    field: "progress",
    formatter: "progress" as Formatter,
    formatterParams: {
      color: ["#BDBDBD", "#43A047"],
      legend: false
    },
    width: 150
  },
  { title: "dennis", field: "dennis", width: 150 },
  { title: "JackYeh", field: "JackYeh", width: 150 },
  { title: "jay", field: "jay", width: 150 },
  { title: "leo", field: "leo", width: 150 },
  { title: "will", field: "will", width: 150 },
];

const EqpOverview = () => {
  return (
    <>
      <DashboardCard>
        <GridTable columns={columns} rows={tableData} height="550px" />
      </DashboardCard>
    </>
  );
};

export default EqpOverview;
