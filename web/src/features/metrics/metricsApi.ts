import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Metric {
  month: string;
  revenue: number;
}

export const metricsApi = createApi({
  reducerPath: 'metricsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api/' }),
  endpoints: (builder) => ({
    getMetrics: builder.query<Metric[], void>({
      query: () => 'metrics',
    }),
  }),
});

export const { useGetMetricsQuery } = metricsApi;
