// 仅作为生成 mock 数据的工具函数
export const ReportQueryDemo = (length: number) => {
  const tableData = [];
  for (let i = 0; i < length; i++) {
    tableData.push({
      WIP_OPI_WDOEACICO_HIST_SID: "36257788126315",
      WO: "MO24060071" + i,
      DEPT_NO: "DC",
      OPERATION_CODE: "W-D125",
      EQP_NO: "DC-03",
      ACCOUNT_NO: "642230,600713",
      NUM_OF_ACC: 2,
      CHECK_IN_TIME: "2024-09-26 08:00:00.000",
      CHECK_OUT_TIME: "2024-09-26 13:13:00.000",
      OK_QTY: 10.0,
      NG_QTY: 5.0,
      COMMENT: "",
      ENABLE_FLAG: "Y",
      AVAILABILITY: 0.0,
      PERFORMANCE: 100.0,
      YEILD: 0.0,
      OEE: 0.0,
      CREATE_USER: "ADMINV2",
      CREATE_TIME: "2024-09-26 12:04:41.000",
      EDIT_USER: "ADMINV2",
      EDIT_TIME: "2024-09-26 13:13:39.000",
    });
  }
  return tableData;
};
