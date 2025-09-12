import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function ProductRow({ index, product, onChange, onRemove }) {
  return (
    <tr>
      <td className="border px-2 py-1">{index + 1}</td>
      <td className="border px-2 py-1">
        <input
          type="text"
          value={product.name}
          onChange={(e) => onChange(index, "name", e.target.value)}
          className="w-full border px-2 py-1"
          placeholder="Product Name"
        />
      </td>
      <td className="border px-2 py-1">
        <input
          type="number"
          value={product.quantity}
          onChange={(e) => onChange(index, "quantity", Number(e.target.value))}
          className="w-20 border px-2 py-1"
          placeholder="Qty"
        />
      </td>
      <td className="border px-2 py-1">
        <input
          type="number"
          value={product.price}
          onChange={(e) => onChange(index, "price", Number(e.target.value))}
          className="w-24 border px-2 py-1"
          placeholder="Price"
        />
      </td>
      <td className="border px-2 py-1 text-right">
        Rp {(product.quantity * product.price).toLocaleString()}
      </td>
      <td className="border px-2 py-1 text-center">
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="text-red-600 hover:underline"
        >
          ❌
        </button>
      </td>
    </tr>
  );
}

export default function NewInvoice() {
  const [customer, setCustomer] = useState("");
  const [salesperson, setSalesperson] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleProductChange = (index, field, value) => {
    const newProducts = [...products];
    newProducts[index][field] = value;
    setProducts(newProducts);
  };

  const handleAddProduct = () => {
    setProducts([...products, { name: "", quantity: 1, price: 0 }]);
  };

  const handleRemoveProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validProducts = products.filter(
      (p) => p.name.trim() !== "" && p.quantity > 0 && p.price > 0
    );
    if (!customer || !salesperson || !date || validProducts.length === 0) {
      alert("Harap isi semua field dan minimal 1 produk valid.");
      return;
    }
    await axios.post("http://localhost:4000/api/invoices", {
      date,
      customer_name: customer,
      salesperson_name: salesperson,
      notes,
      products: validProducts,
    });
    navigate("/");
  };

  return (
    <div className="p-4 max-w-3xl mx-auto bg-white shadow rounded">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-xl">➕ New Invoice</h2>
        <Link to="/" className="text-blue-600 hover:underline">
          ⬅ Back
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2"
          />
          <input
            type="text"
            placeholder="Customer Name"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            className="border p-2"
          />
          <input
            type="text"
            placeholder="Salesperson Name"
            value={salesperson}
            onChange={(e) => setSalesperson(e.target.value)}
            className="border p-2"
          />
        </div>

        <textarea
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="border p-2 w-full"
        />

        <h3 className="font-semibold">Products</h3>
        <table className="w-full border-collapse border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">#</th>
              <th className="border px-2 py-1">Product</th>
              <th className="border px-2 py-1">Qty</th>
              <th className="border px-2 py-1">Price</th>
              <th className="border px-2 py-1">Subtotal</th>
              <th className="border px-2 py-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <ProductRow
                key={i}
                index={i}
                product={p}
                onChange={handleProductChange}
                onRemove={handleRemoveProduct}
              />
            ))}
          </tbody>
        </table>

        <button
          type="button"
          onClick={handleAddProduct}
          className="bg-gray-500 text-white px-3 py-1 rounded"
        >
          ➕ Add Product
        </button>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            💾 Save Invoice
          </button>
        </div>
      </form>
    </div>
  );
}
