import React, { useState } from "react";
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
  rowsPerPage?: number;
}

export const Table = <T,>({
  data,
  columns,
  actions,
  loading = false,
  rowsPerPage = 5,
}: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalColumns = columns.length + (actions ? 1 : 0);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIdx = (currentPage - 1) * rowsPerPage;
  const currentData = data.slice(startIdx, startIdx + rowsPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div>
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
            ) : currentData.length > 0 ? (
              currentData.map((row, idx) => (
                <tr key={idx} className="border-t border-border">
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className="px-4 py-2 whitespace-nowrap">
                      {col.render ? col.render(row) : String((row as any)[col.accessor])}
                    </td>
                  ))}
                  {actions && <td className="px-4 py-2">{actions(row)}</td>}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={totalColumns} className="text-center py-4 text-gray-500">
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4 text-sm text-text">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-card border border-border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-card border border-border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
