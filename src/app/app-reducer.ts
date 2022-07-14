import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { authAPI } from '../api/todolists-api';
import { setIsLoggedInAC } from '../features/Login/auth-reducer';

export const initializeApp = createAsyncThunk(
  'app/initializeApp',
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAppStatusAC({ status: 'loading' }));

      const res = await authAPI.me();

      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC({ value: true }));
      }
    } catch (e: any) {
      if (e.message) return rejectWithValue('Network Problems');
    }
  },
);

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
  },
  reducers: {
    setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error;
    },
    setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.status = action.payload.status;
    },
  },
  extraReducers(builder) {
    builder.addCase(initializeApp.fulfilled, state => {
      state.isInitialized = true;
      state.status = 'succeeded';
    });
    builder.addCase(initializeApp.rejected, (state, action) => {
      state.isInitialized = true;
      state.status = 'failed';

      if (action.payload) state.error = action.payload as string;
    });
  },
});
export const appReducer = appSlice.reducer;

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export const { setAppErrorAC, setAppStatusAC } = appSlice.actions;
