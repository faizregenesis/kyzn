import { configureStore } from "@reduxjs/toolkit";
import { invoicesApi } from "../features/invoices/invoicesApi";
import { metricsApi } from "../features/metrics/metricsApi";
import { productsApi } from "../features/products/productsApi";

export const store = configureStore({
  reducer: {
    [invoicesApi.reducerPath]: invoicesApi.reducer,
    [metricsApi.reducerPath]: metricsApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      invoicesApi.middleware,
      metricsApi.middleware,
      productsApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
