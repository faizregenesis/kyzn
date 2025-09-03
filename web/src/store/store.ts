import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../../src/features/products/productsSlice';
import { invoicesApi } from '../../src/features/invoices/invoicesApi';
import { metricsApi } from '../../src/features/metrics/metricsApi';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    [invoicesApi.reducerPath]: invoicesApi.reducer,
    [metricsApi.reducerPath]: metricsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      invoicesApi.middleware,
      metricsApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
