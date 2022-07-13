import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { authReducer } from '../features/Login/auth-reducer';
import { tasksReducer } from '../features/TodolistsList/tasks-reducer';
import { todolistsReducer } from '../features/TodolistsList/todolists-reducer';

import { appReducer } from './app-reducer';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
