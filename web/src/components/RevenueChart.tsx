import React from 'react';
import { useGetMetricsQuery } from '../features/metrics/metricsApi';

export default function RevenueChart() {
  const { data, isLoading } = useGetMetricsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data</div>;

  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="font-semibold mb-2">Monthly Revenue</h2>
      <ul>
        {data.map((m) => (
          <li key={m.month}>
            {m.month}: ${m.revenue}
          </li>
        ))}
      </ul>
    </div>
  );
}
