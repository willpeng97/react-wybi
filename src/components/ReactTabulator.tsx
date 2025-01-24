import { useEffect, useRef } from "react";
import { TabulatorFull as Tabulator, ColumnDefinition } from "tabulator-tables"; // 引入 Tabulator 庫
import "tabulator-tables/dist/css/tabulator.min.css"; // 引入 Tabulator 樣式

interface TableData {
  [key: string]: string | number; // 使得表格數據的字段更加靈活
}

interface TabulatorTableProps {
  columns: ColumnDefinition[]; // 使用 Tabulator 的 ColumnDefinition 類型
  rows: TableData[]; // 表格的數據
  height?: string; // 設置表格高度，默認為 550px
}

const TabulatorTable: React.FC<TabulatorTableProps> = ({ columns, rows, height = "550px" }) => {
  const el = useRef<HTMLDivElement | null>(null); // 用於引用 DOM 元素
  const tabulatorRef = useRef<Tabulator | null>(null); // 用於保存 Tabulator 實例

  useEffect(() => {
    // 在組件加載完成後初始化 Tabulator
    if (el.current) {
      tabulatorRef.current = new Tabulator(el.current, {
        height, // 使用傳遞的 height 屬性
        layout: "fitDataStretch",
        pagination: true,
        reactiveData: true,
        columns, // 使用傳遞的 columns 屬性
        data: rows, // 使用傳遞的 rows 數據
        locale: "zh_TW",
        langs: {
          "zh_TW": {
            pagination: {
              page_size: "Page Size", //label for the page size select element
              page_title: "Show Page", //tooltip text for the numeric page button, appears in front of the page number
              first: "<<", //text for the first page button
              first_title: "First Page", //tooltip text for the first page button
              last: ">>", //text for the last page button
              last_title: "Last Page", //tooltip text for the last page button
              prev: "<", //text for the previous page button
              prev_title: "Prev Page", //tooltip text for the previous page button
              next: ">", //text for the next page button
              next_title: "Next Page", //tooltip text for the next page button
              all: "All",
              counter: {
                showing: "Showing",
                of: "of",
                rows: "rows",
                pages: "pages",
              },
            },
          },
        },
      });
    }

    // 清理 Tabulator 實例，並檢查是否有有效的元素
    return () => {
      if (tabulatorRef.current && el.current) {
        tabulatorRef.current.destroy();
      }
    };
  }, [columns, rows, height]); // 當 columns、rows 或 height 發生變化時重新渲染 Tabulator

  return <div ref={el} />; // 返回帶有 ref 的 div 元素
};

export default TabulatorTable;
