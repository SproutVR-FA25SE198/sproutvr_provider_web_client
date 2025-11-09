import { login } from '@/common/services/auth.service';
import { removeAccessToken, removeRefreshToken, setAccessToken, setRefreshToken } from '@/common/utils';
import JwtDecode from '@/common/utils/jwtDecode';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const loginThunk = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const data = await login(email, password);

      // Save tokens securely
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);

      return JwtDecode(data.accessToken);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Đăng nhập thất bại');
    }
  },
);

export const logoutThunk = createAsyncThunk('auth/logout', async () => {
  try {
    removeAccessToken();
    removeRefreshToken();
  } catch {
    // even if failed, clear tokens
    removeAccessToken();
    removeRefreshToken();
  }
});

// export const checkAuthThunk = createAsyncThunk('auth/check', async (_, thunkAPI) => {
//   try {
//     const user = await authService.getProfile();
//     return user;
//   } catch (error) {
//     return thunkAPI.rejectWithValue('Không xác thực được người dùng.');
//   }
// });
