import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/" }),
  endpoints: (builder) => ({
    searchProducts: builder.query<any[], string>({
      query: (q) => `products/search?query=${encodeURIComponent(q)}`,
    }),
  }),
});

export const { useSearchProductsQuery } = productsApi;
