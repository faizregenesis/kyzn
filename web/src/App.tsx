import React from 'react';
import InvoiceForm from './components/InvoiceForm';
import InvoiceList from './components/InvoiceList';
import RevenueChart from './components/RevenueChart';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">Kyzn Invoicing</h1>
      <InvoiceForm />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <InvoiceList />
        <RevenueChart />
      </div>
    </div>
  );
}
