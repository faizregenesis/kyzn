import React, { useMemo, useState } from "react";

export default function DataGrid({ rows = [], columns = [], pageSize = 5 }) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState(null); // column key
  const [sortDir, setSortDir] = useState("asc"); // asc | desc
  const [page, setPage] = useState(1);

  // Filter
  const filtered = useMemo(() => {
    if (!search) return rows;
    const q = search.toLowerCase();
    return rows.filter((r) =>
      columns.some((c) => {
        const v = String(r[c.key] ?? "").toLowerCase();
        return v.includes(q);
      })
    );
  }, [rows, search, columns]);

  // Sort
  const sorted = useMemo(() => {
    if (!sortBy) return filtered;
    const dir = sortDir === "asc" ? 1 : -1;
    return [...filtered].sort((a, b) => {
      const va = a[sortBy];
      const vb = b[sortBy];
      if (va == null) return -1 * dir;
      if (vb == null) return 1 * dir;
      if (typeof va === "number" && typeof vb === "number") return (va - vb) * dir;
      return String(va).localeCompare(String(vb)) * dir;
    });
  }, [filtered, sortBy, sortDir]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paged = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  function toggleSort(colKey) {
    if (sortBy !== colKey) {
      setSortBy(colKey);
      setSortDir("asc");
    } else {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    }
    setPage(1);
  }

  return (
    <div className="datagrid">
      <div className="dg-toolbar">
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <div className="dg-info">Showing {sorted.length} result(s)</div>
      </div>

      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => col.sortable && toggleSort(col.key)}
                style={{ textAlign: col.align || "left", cursor: col.sortable ? "pointer" : "default" }}
                title={col.sortable ? "Click to sort" : undefined}
              >
                {col.label}{" "}
                {col.sortable && sortBy === col.key && <span className="sort-ind">{sortDir === "asc" ? "▲" : "▼"}</span>}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {paged.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: "center", padding: "1rem" }}>
                No rows.
              </td>
            </tr>
          ) : (
            paged.map((row) => (
              <tr key={row.id ?? JSON.stringify(row)}>
                {columns.map((col) => (
                  <td key={col.key} style={{ textAlign: col.align || "left" }}>
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="dg-footer">
        <div>
          Page{" "}
          <strong>
            {currentPage} / {totalPages}
          </strong>
        </div>
        <div className="dg-pager">
          <button onClick={() => setPage(1)} disabled={currentPage === 1}>
            {"<<"}
          </button>
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
            {"<"}
          </button>
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
            {">"}
          </button>
          <button onClick={() => setPage(totalPages)} disabled={currentPage === totalPages}>
            {">>"}
          </button>
        </div>
      </div>
    </div>
  );
}
