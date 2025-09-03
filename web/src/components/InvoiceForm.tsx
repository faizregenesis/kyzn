import React, { useState } from 'react';
import { useAddInvoiceMutation } from '../features/invoices/invoicesApi';

export default function InvoiceForm() {
  const [customer, setCustomer] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [addInvoice] = useAddInvoiceMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer || amount <= 0) return;
    await addInvoice({ customer, amount });
    setCustomer('');
    setAmount(0);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded">
      <h2 className="font-semibold mb-2">New Invoice</h2>
      <input
        type="text"
        placeholder="Customer"
        value={customer}
        onChange={(e) => setCustomer(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="border p-2 w-full mb-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add
      </button>
    </form>
  );
}
