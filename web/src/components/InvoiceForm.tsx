import React, { useState } from "react";
import { useAddInvoiceMutation } from "../features/invoices/invoicesApi";
import { useSearchProductsQuery } from "../features/products/productsApi";

type Product = {
  name: string;
  quantity: number;
  price: number;
};

function ProductRow({
  index,
  product,
  onChange,
}: {
  index: number;
  product: Product;
  onChange: (index: number, field: keyof Product, value: string | number) => void;
}) {
  const { data: suggestions } = useSearchProductsQuery(product.name, {
    skip: !product.name || product.name.length < 2,
  });

  return (
    <div className="flex flex-col gap-1 mb-3">
      <input
        type="text"
        placeholder="Product Name"
        value={product.name}
        onChange={(e) => onChange(index, "name", e.target.value)}
        className="border p-2"
      />
      {suggestions && suggestions.length > 0 && (
        <ul className="border bg-white shadow text-sm">
          {suggestions.map((s: any) => (
            <li
              key={s.id}
              onClick={() => {
                onChange(index, "name", s.name);
                onChange(index, "price", s.unit_price);
              }}
              className="px-2 py-1 cursor-pointer hover:bg-gray-100"
            >
              {s.name} (Rp {s.unit_price})
            </li>
          ))}
        </ul>
      )}
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Qty"
          value={product.quantity}
          onChange={(e) => onChange(index, "quantity", Number(e.target.value))}
          className="border p-2 w-20"
        />
        <input
          type="number"
          placeholder="Price"
          value={product.price}
          onChange={(e) => onChange(index, "price", Number(e.target.value))}
          className="border p-2 w-24"
        />
      </div>
    </div>
  );
}

export default function InvoiceForm() {
  const [customer, setCustomer] = useState("");
  const [salesperson, setSalesperson] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [addInvoice] = useAddInvoiceMutation();

  const handleProductChange = (
    index: number,
    field: keyof Product,
    value: string | number
  ) => {
    const newProducts = [...products];
    (newProducts[index][field] as any) = value;
    setProducts(newProducts);
  };

  const handleAddProduct = () => {
    setProducts([...products, { name: "", quantity: 1, price: 0 }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validProducts = products.filter(
      (p) => p.name.trim() !== "" && p.quantity > 0 && p.price > 0
    );
    if (!customer || !salesperson || !date || validProducts.length === 0) {
      alert("Harap isi semua field dan minimal 1 produk valid.");
      return;
    }
    await addInvoice({
      date,
      customer_name: customer,
      salesperson_name: salesperson,
      notes,
      products: validProducts,
    });
    setCustomer("");
    setSalesperson("");
    setNotes("");
    setDate("");
    setProducts([]);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded">
      <h2 className="font-semibold mb-2">New Invoice</h2>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        placeholder="Customer Name"
        value={customer}
        onChange={(e) => setCustomer(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        placeholder="Salesperson Name"
        value={salesperson}
        onChange={(e) => setSalesperson(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <textarea
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="border p-2 w-full mb-2"
      />

      <h3 className="font-semibold mb-2">Products</h3>
      {products.map((p, i) => (
        <ProductRow
          key={i}
          index={i}
          product={p}
          onChange={handleProductChange}
        />
      ))}

      <button
        type="button"
        onClick={handleAddProduct}
        className="bg-gray-500 text-white px-3 py-1 rounded mb-2"
      >
        Add Product
      </button>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Invoice
      </button>
    </form>
  );
}
