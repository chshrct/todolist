import { Dispatch } from "redux";
import { authAPI, LoginParamsType } from "../../api/todolists-api";
import {
  SetAppErrorActionType,
  setAppStatusAC,
  SetAppStatusActionType,
} from "../../app/app-reducer";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../../utils/error-utils";

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
};
type InitialStateType = typeof initialState;

export const authReducer = (
  state: InitialStateType = initialState,
  action: AuthActionsType
): InitialStateType => {
  switch (action.type) {
    case "login/SET-IS-LOGGED-IN":
      return { ...state, isLoggedIn: action.value };
    case "login/SET-IS-INITIALIZED":
      return { ...state, isInitialized: action.value };

    default:
      return state;
  }
};
// actions
export const setIsLoggedInAC = (value: boolean) =>
  ({ type: "login/SET-IS-LOGGED-IN", value } as const);

export const setIsInitializedAC = (value: boolean) =>
  ({
    type: "login/SET-IS-INITIALIZED",
    value,
  } as const);

// thunks
export const loginTC =
  (data: LoginParamsType) => (dispatch: Dispatch<AuthActionsType>) => {
    dispatch(setAppStatusAC("loading"));
    authAPI
      .login(data)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(setIsLoggedInAC(true));
          dispatch(setAppStatusAC("succeeded"));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };

  export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
        } else {
        }
    }).finally(()=>dispatch(setIsInitializedAC(true)))
 }
 

 export const logoutTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  authAPI.logout()
      .then(res => {
          if (res.data.resultCode === 0) {
              dispatch(setIsLoggedInAC(false))
              dispatch(setAppStatusAC('succeeded'))
          } else {
              handleServerAppError(res.data, dispatch)
          }
      })
      .catch((error) => {
          handleServerNetworkError(error, dispatch)
      })
}

 
// types
export type AuthActionsType =
  | ReturnType<typeof setIsInitializedAC>
  | ReturnType<typeof setIsLoggedInAC>
  | SetAppStatusActionType
  | SetAppErrorActionType;
