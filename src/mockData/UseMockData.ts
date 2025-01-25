import _ from 'lodash'

// 生成DEMO用假數據
export const ReportQueryDemo = (length: number) => {
  const tableData = [];
  for (let i = 0; i < length; i++) {
    const [ checkIn, checkOut ] = generateRandomTimeSeries()

    tableData.push({
      WIP_OPI_WDOEACICO_HIST_SID: _.random(10000000000000, 99999999999999),
      WO: "MO" + _.random(180000000, 300000000),
      OPERATION_CODE: "W-D" + _.sample(["125", "250", "500", "800"]),
      EQP_NO: _.sample(["DC-01", "DC-02", "DC-03", "DC-04"]),
      ACCOUNT_NO: _.random(1, 9999).toString().padStart(4, '0') + ',' + _.random(1, 9999).toString().padStart(4, '0'),
      NUM_OF_ACC: 2,
      CHECK_IN_TIME: checkIn,
      CHECK_OUT_TIME: checkOut,
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

export const StatusChangeHistDemo = (length: number) => {
  const tableData = [];
  for (let i = 0; i < length; i++) {
    const [ from, to ] = generateRandomTimeSeries()

    tableData.push({
      EQP_NO: _.sample(["DC-01", "DC-02", "DC-03", "DC-04","CNC-01","CNC-02"]),
      FROM_EQP_STATUS_SID: _.random(10000000000000, 99999999999999),
      FROM_EQP_STATUS_CODE: _.sample(["Run", "Idle", "Error", "PowerOff"]),
      FROM_EQP_STATUS_TIME: from,
      TO_EQP_STATUS_SID: _.random(10000000000000, 99999999999999),
      TO_EQP_STATUS_CODE: _.sample(["Run", "Idle", "Error", "PowerOff"]),
      TO_EQP_STATUS_TIME: to,
      REPORT_TIME: to
    });
  }
  return tableData;

}


function generateRandomTimeSeries() {
  const minOffset = 10 * 60 * 1000; // 10 分鐘
  const maxOffset = 30 * 24 * 60 * 60 * 1000; // 30 天

  const randomTimestamp_start = new Date().getTime() + _.random(minOffset, maxOffset);
  const randomTimestamp_end = randomTimestamp_start + _.random(minOffset, maxOffset);
  
  return [
    new Date(randomTimestamp_start).toISOString().replace("T", " ").slice(0, 16),
    new Date(randomTimestamp_end).toISOString().replace("T", " ").slice(0, 16)
  ]
}