import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import { authAPI, LoginParamsType } from "../../api/todolists-api";
import { setAppStatusAC } from "../../app/app-reducer";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../../utils/error-utils";

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isLoggedIn = action.payload.value;
    },
    setIsInitializedAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isInitialized = action.payload.value;
    },
  },
});

export const authReducer = authSlice.reducer;
const { setIsLoggedInAC } = authSlice.actions;
const { setIsInitializedAC } = authSlice.actions;
// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: "loading" }));
  authAPI
    .login(data)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC({ value: true }));
        dispatch(setAppStatusAC({ status: "succeeded" }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const initializeAppTC = () => (dispatch: Dispatch) => {
  authAPI
    .me()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC({ value: true }));
      } else {
      }
    })
    .finally(() => dispatch(setIsInitializedAC({ value: true })));
};

export const logoutTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: "loading" }));
  authAPI
    .logout()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC({ value: false }));
        dispatch(setAppStatusAC({ status: "succeeded" }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};
