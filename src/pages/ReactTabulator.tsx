import React, { useEffect, useRef } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables"; // 引入 Tabulator 庫
import "tabulator-tables/dist/css/tabulator.min.css"; // 引入 Tabulator 樣式

interface TableData {
  id: number;
  name: string;
  age: number;
  country: string;
}

interface TabulatorTableProps {
  data: TableData[]; // 從父組件傳入的數據
}

const TabulatorTable: React.FC<TabulatorTableProps> = ({ data }) => {
  const el = useRef<HTMLDivElement | null>(null); // 用於引用 DOM 元素
  const tabulatorRef = useRef<Tabulator | null>(null); // 用於保存 Tabulator 實例

  useEffect(() => {
    // 在組件加載完成後初始化 Tabulator
    if (el.current) {
      tabulatorRef.current = new Tabulator(el.current, {
        data: data, // 將數據與表格綁定
        reactiveData: true, // 啟用數據反應式更新
        layout:"fitDataStretch",
        autoColumns: true, // 自动生成列
      });
    }

    // 清理 Tabulator 實例，並檢查是否有有效的元素
    return () => {
      if (tabulatorRef.current && el.current) {
        tabulatorRef.current.destroy();
      }
    };
  }, [data]); // 當 data 發生變化時重新渲染 Tabulator

  return <div ref={el} />; // 返回帶有 ref 的 div 元素
};

export default TabulatorTable;
