import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Invoice {
  id: number;
  customer: string;
  amount: number;
}

export const invoicesApi = createApi({
  reducerPath: 'invoicesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api/' }),
  tagTypes: ['Invoice'],
  endpoints: (builder) => ({
    getInvoices: builder.query<Invoice[], void>({
      query: () => 'invoices',
      providesTags: ['Invoice'],
    }),
    addInvoice: builder.mutation<Invoice, Partial<Invoice>>({
      query: (body) => ({
        url: 'invoices',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Invoice'],
    }),
  }),
});

export const { useGetInvoicesQuery, useAddInvoiceMutation } = invoicesApi;
