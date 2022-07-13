import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as string | null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error;
    },
    setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.status = action.payload.status;
    },
  },
});
export const appReducer = appSlice.reducer;

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export const { setAppErrorAC, setAppStatusAC } = appSlice.actions;
