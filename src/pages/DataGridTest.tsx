import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';

const testrows = [];
for (let i = 0; i < 893213; i++) {
  testrows.push({ id: i, col1: `Hello_${i}`, col2: 'World' });
}
const rows: GridRowsProp = testrows;

const columns: GridColDef[] = [
  { field: 'col1', headerName: 'Column 1', width: 350 },
  { field: 'col2', headerName: 'Column 2', width: 350 },
];

export default function DataGridTest() {
  const [loading, setLoading] = useState(true);

  // 使用 useEffect 模擬加載效果
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // 一秒後結束加載
    }, 1000);

    return () => clearTimeout(timer); // 清理定時器，避免內存洩漏
  }, []);

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={loading ? [] : rows} // 加載時不顯示數據
        columns={columns}
        pagination
        loading={loading}
        pageSizeOptions={[10, 20, 50, 100]} // 可選的每頁行數
        initialState={{
          pagination: {
            paginationModel: { pageSize: 20, page: 0 }, // 預設顯示每頁 20 行
          },
        }}
      />
    </div>
  );
}
