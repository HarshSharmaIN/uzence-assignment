import { useState } from "react";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  loading,
  selectable,
  onRowSelect,
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: "asc" | "desc";
  } | null>(null);

  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(
    new Set()
  );

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
    if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
    return 0;
  });

  const toggleSort = (key: keyof T) => {
    setSortConfig((prev) => {
      if (!prev || prev.key !== key) return { key, direction: "asc" };
      if (prev.direction === "asc") return { key, direction: "desc" };
      return null;
    });
  };

  const toggleRow = (id: string | number) => {
    const newSelection = new Set(selectedRows);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedRows(newSelection);
    onRowSelect?.(data.filter((d) => newSelection.has(d.id)));
  };

  if (loading) return <p className="p-4 text-gray-500">Loading...</p>;
  if (data.length === 0)
    return <p className="p-4 text-gray-500">No data available</p>;

  return (
    <table className="w-full border border-gray-200 rounded-md overflow-hidden">
      <thead className="bg-gray-100">
        <tr>
          {selectable && <th className="px-4 py-2 text-start">Select</th>}
          {columns.map((col) => (
            <th
              key={col.key}
              onClick={() => col.sortable && toggleSort(col.dataIndex)}
              className={`px-4 py-2 text-left cursor-pointer select-none ${
                col.sortable ? "hover:text-indigo-600" : ""
              }`}
            >
              {col.title}
              {sortConfig?.key === col.dataIndex &&
                (sortConfig.direction === "asc" ? " ▲" : " ▼")}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row) => (
          <tr key={row.id} className="border-t hover:bg-gray-50 transition">
            {selectable && (
              <td className="px-4 py-2">
                <input
                  type="checkbox"
                  checked={selectedRows.has(row.id)}
                  onChange={() => toggleRow(row.id)}
                />
              </td>
            )}
            {columns.map((col) => (
              <td key={col.key} className="px-4 py-2">
                {String(row[col.dataIndex])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
