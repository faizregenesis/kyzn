import React, { useEffect, useState } from "react";
import axios from "axios";
import DataGrid from "./DataGrid";
import { Link } from "react-router-dom";

export default function App() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { key: "id", label: "ID", sortable: true },
    { key: "customer_name", label: "Customer Name", sortable: true },
    { key: "salesperson_name", label: "Salesperson Name" },
    { key: "notes", label: "Note" },
    { key: "total_amount", label: "total_amount" },
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://localhost:4000/api/invoices");
        setRows(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="app">
      <h1>DataGrid from API</h1>
       <Link to="/new" className="btn">

        ➕ Add New

      </Link>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DataGrid rows={rows} columns={columns} pageSize={5} />
      )}
    </div>
  );
}
