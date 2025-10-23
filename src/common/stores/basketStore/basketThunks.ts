import { basketService } from '@/common/services/basket.service';
import { UpdateBasketRequest } from '@/common/types/basket.type';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBasketThunk = createAsyncThunk('basket/fetchBasket', async (orgId: string, { rejectWithValue }) => {
  try {
    const res = await basketService.getBasket(orgId);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data || 'Failed to fetch basket');
  }
});

// Add item to basket
export const updateBasketThunk = createAsyncThunk(
  'basket/updateBasket',
  async (basket: UpdateBasketRequest, { rejectWithValue }) => {
    try {
      const res = await basketService.updateBasket(basket);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || 'Failed to add item');
    }
  },
);
