import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from './cartSlice';

type Pizza = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  sizes: number[];
  types: number[];
};

interface PizzaSliceState {
  items: Pizza[];
  status: 'loading' | 'success' | 'error';
}

const initialState: PizzaSliceState = {
  items: [],
  status: 'loading', // loading | success | error
};

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { currentPage, order, sortBy, category, search } = params;

    const { data } = await axios.get<Pizza[]>(
      `https://62ece332818ab252b604bcff.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );

    return data;
  },
);

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = 'loading';
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = 'error';
      state.items = [];
    });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
