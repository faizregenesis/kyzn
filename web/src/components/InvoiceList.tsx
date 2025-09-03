import React from 'react';
import { useGetInvoicesQuery } from '../features/invoices/invoicesApi';

export default function InvoiceList() {
  const { data: invoices, isLoading } = useGetInvoicesQuery();

  if (isLoading) return <div>Loading...</div>;
  if (!invoices) return <div>No invoices</div>;

  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="font-semibold mb-2">Invoices</h2>
      <ul>
        {invoices.map((inv) => (
          <li key={inv.id} className="border-b py-1">
            {inv.customer} - ${inv.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}
