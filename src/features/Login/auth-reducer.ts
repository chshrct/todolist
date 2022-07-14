import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { authAPI, LoginParamsType } from '../../api/todolists-api';
import { setAppStatusAC } from '../../app/app-reducer';
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils';

export const login = createAsyncThunk(
  'auth/login',
  async (loginParams: LoginParamsType, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatusAC({ status: 'loading' }));
    const res = await authAPI.login(loginParams);

    try {
      if (res.data.resultCode === 0) {
        dispatch(setAppStatusAC({ status: 'succeeded' }));
      } else {
        handleServerAppError(res.data, dispatch);

        return rejectWithValue(res.data.messages);
      }
    } catch (e: any) {
      if (e.message) {
        handleServerNetworkError(e, dispatch);

        return rejectWithValue(e.message);
      }
    }
  },
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (payload, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatusAC({ status: 'loading' }));
    const res = await authAPI.logout();

    try {
      if (res.data.resultCode === 0) {
        dispatch(setAppStatusAC({ status: 'succeeded' }));
      } else {
        handleServerAppError(res.data, dispatch);

        return rejectWithValue(res.data.messages);
      }
    } catch (e: any) {
      if (e.message) {
        handleServerNetworkError(e, dispatch);

        return rejectWithValue(e.message);
      }
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isLoggedIn = action.payload.value;
    },
  },
  extraReducers(builder) {
    builder.addCase(login.fulfilled, state => {
      state.isLoggedIn = true;
    });
    builder.addCase(logout.fulfilled, state => {
      state.isLoggedIn = false;
    });
  },
});

export const authReducer = authSlice.reducer;
export const { setIsLoggedInAC } = authSlice.actions;
