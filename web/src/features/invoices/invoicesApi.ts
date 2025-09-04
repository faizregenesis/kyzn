import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Invoice {
  id?: number;
  date: string;
  customer_name: string;
  salesperson_name: string;
  notes?: string | null;
  products: InvoiceItem[];
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
