import { Basket } from '@/common/types/basket.type';

import { logoutThunk } from '../authStore/authThunks';

import { fetchBasketThunk, updateBasketThunk } from './basketThunks';
import { BasketState } from './basketTypes';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: BasketState = {
  basket: {} as Basket,
  isLoading: false,
  error: null,
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    resetBasket: () => initialState,
  },
  extraReducers: (builder) => {
    // Handle basket fetching
    builder
      .addCase(fetchBasketThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBasketThunk.fulfilled, (state, action: PayloadAction<Basket>) => {
        state.isLoading = false;
        state.basket = action.payload;
      })
      .addCase(fetchBasketThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to load basket';
      })
      .addCase(updateBasketThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateBasketThunk.fulfilled, (state, action: PayloadAction<Basket>) => {
        state.isLoading = false;
        state.basket = action.payload;
      })
      .addCase(updateBasketThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to update basket';
      });

    // 🔗 Listen to auth changes:
    builder
      // When user logs out → clear basket
      .addCase(logoutThunk.fulfilled, (state) => {
        state.basket = {} as Basket;
        state.error = null;
        state.isLoading = false;
      });
  },
});

export const { resetBasket } = basketSlice.actions;
export default basketSlice.reducer;
