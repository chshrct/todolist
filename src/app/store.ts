import { tasksReducer } from "../features/TodolistsList/tasks-reducer";
import { todolistsReducer } from "../features/TodolistsList/todolists-reducer";
import { appReducer } from "./app-reducer";
import { authReducer } from "../features/Login/auth-reducer";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { useDispatch } from "react-redux";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
});
export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
