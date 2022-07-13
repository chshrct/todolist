import React, { ReactElement } from 'react';

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { v1 } from 'uuid';

import { TaskPriorities, TaskStatuses } from '../../api/todolists-api';
import { appReducer } from '../../app/app-reducer';
import { AppRootStateType } from '../../app/store';
import { authReducer } from '../../features/Login/auth-reducer';
import { tasksReducer } from '../../features/TodolistsList/tasks-reducer';
import { todolistsReducer } from '../../features/TodolistsList/todolists-reducer';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer,
});

const initialGlobalState: AppRootStateType = {
  todolists: [
    {
      id: 'todolistId1',
      title: 'What to learn',
      filter: 'all',
      entityStatus: 'idle',
      addedDate: '',
      order: 0,
    },
    {
      id: 'todolistId2',
      title: 'What to buy',
      filter: 'all',
      entityStatus: 'loading',
      addedDate: '',
      order: 0,
    },
  ],
  tasks: {
    todolistId1: [
      {
        id: v1(),
        title: 'HTML&CSS',
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        startDate: '',
        status: TaskStatuses.InProgress,
        todoListId: 'todolistId1',
      },
      {
        id: v1(),
        title: 'JS',
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        startDate: '',
        status: TaskStatuses.InProgress,
        todoListId: 'todolistId1',
      },
    ],
    todolistId2: [
      {
        id: v1(),
        title: 'Milk',
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        startDate: '',
        status: TaskStatuses.InProgress,
        todoListId: 'todolistId2',
      },
      {
        id: v1(),
        title: 'React Book',
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        startDate: '',
        status: TaskStatuses.InProgress,
        todoListId: 'todolistId2',
      },
    ],
  },
  app: {
    error: null,
    status: 'succeeded',
  },
  auth: {
    isLoggedIn: true,
    isInitialized: true,
  },
};

export const storyBookStore = configureStore({
  reducer: rootReducer,
  preloadedState: initialGlobalState as AppRootStateType,
});

export const ReduxStoreProviderDecorator = (storyFn: any): ReactElement => (
  <Provider store={storyBookStore}>{storyFn()}</Provider>
);
