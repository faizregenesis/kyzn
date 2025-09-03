import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: number;
  name: string;
  price: number;
}

const initialState: Product[] = [
  { id: 1, name: 'Consulting', price: 500 },
  { id: 2, name: 'Design', price: 300 }
];

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.push(action.payload);
    }
  }
});

export const { addProduct } = productsSlice.actions;
export default productsSlice.reducer;