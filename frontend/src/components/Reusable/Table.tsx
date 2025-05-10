import React from "react";
import { Loader } from "../../assets/Loader";

export interface Column<T> {
  label: string;
  accessor: keyof T | string;
  render?: (row: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  actions?: (row: T) => React.ReactNode;
  loading?: boolean;
}

export const Table = <T,>({ data, columns, actions, loading = false }: TableProps<T>) => {
  const totalColumns = columns.length + (actions ? 1 : 0);

  return (
    <div className="overflow-x-auto rounded-lg border border-card-border bg-background">
      <table className="w-full text-left text-sm text-text">
        <thead className="bg-card text-text">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-4 py-2 whitespace-nowrap">
                {col.label}
              </th>
            ))}
            {actions && <th className="px-4 py-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={totalColumns}>
                <div className="flex justify-center items-center h-40">
                  <Loader className="text-text" size={30} />
                </div>
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={idx} className="border-t border-border">
                {columns.map((col, colIdx) => (
                  <td key={colIdx} className="px-4 py-2 whitespace-nowrap">
                    {col.render ? col.render(row) : String((row as any)[col.accessor])}
                  </td>
                ))}
                {actions && (
                  <td className="px-4 py-2">
                    {actions(row)}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
