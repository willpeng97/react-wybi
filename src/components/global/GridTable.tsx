import { FC, useEffect, useRef, useState } from "react";
import { TabulatorFull as Tabulator, ColumnDefinition } from "tabulator-tables";

export interface TableData {
  [key: string]: string | number | unknown;
}

interface GridTableProps {
  rows: TableData[];
  columns?: ColumnDefinition[];
  height?: string;
  autoColumns?: boolean;
}

export const GridTable: FC<GridTableProps> = ({ columns, rows, height = "550px", autoColumns = false }) => {
  const el = useRef<HTMLDivElement | null>(null);
  const tabulatorRef = useRef<Tabulator | null>(null);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    if (el.current) {
      tabulatorRef.current = new Tabulator(el.current, {
        height,
        layout: "fitData",
        pagination: true,
        columns: columns || [],
        autoColumns,
        data: rows,
        paginationSize: 20,
        paginationSizeSelector: [10, 20, 50, 100, 9999],
        locale: "zh_TW",
        langs: {
          zh_TW: {
            pagination: {
              page_size: "Page Size",
              page_title: "Show Page",
              first: "<<",
              first_title: "First Page",
              last: ">>",
              last_title: "Last Page",
              prev: "<",
              prev_title: "Prev Page",
              next: ">",
              next_title: "Next Page",
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
        // editable: true, // 啟用編輯功能
      });
    }

    return () => {
      if (tabulatorRef.current) {
        tabulatorRef.current.destroy();
      }
    };
  }, [columns, rows, height]);

  const handleFilter = () => {
    if (tabulatorRef.current) {
      tabulatorRef.current.setFilter((data) => {
        return Object.values(data).some((value) =>
          String(value).toLowerCase().includes(filterText.toLowerCase())
        );
      });
    }
  };


  const handleEditRow = () => {
    if (tabulatorRef.current) {
      const selectedRows = tabulatorRef.current.getSelectedData();
      if (selectedRows.length > 0) {
        alert("編輯行: " + JSON.stringify(selectedRows[0]));
      } else {
        alert("請選擇一行進行編輯");
      }
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "10px", display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="搜尋..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <button onClick={handleFilter}>篩選</button>
        <button onClick={handleEditRow}>編輯</button>
      </div>
      <div ref={el} />
    </div>
  );
};
