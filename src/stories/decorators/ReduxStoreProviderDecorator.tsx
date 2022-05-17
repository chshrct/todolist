import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { v1 } from "uuid";
import { TaskPriorities, TaskStatuses } from "../../api/todolists-api";
import { appReducer } from "../../app/app-reducer";
import { AppRootStateType } from "../../app/store";
import { tasksReducer } from "../../features/TodolistsList/tasks-reducer";
import { todolistsReducer } from "../../features/TodolistsList/todolists-reducer";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
});

const initialGlobalState: AppRootStateType = {
  todolists: [
    {
      id: "todolistId1",
      title: "What to learn",
      filter: "all",
      entityStatus: "idle",
      addedDate: "",
      order: 0,
    },
    {
      id: "todolistId2",
      title: "What to buy",
      filter: "all",
      entityStatus: "loading",
      addedDate: "",
      order: 0,
    },
  ],
  tasks: {
    todolistId1: [
      {
        id: v1(),
        title: "HTML&CSS",
        addedDate: "",
        deadline: "",
        description: "",
        entityStatus: "idle",
        order: 0,
        priority: TaskPriorities.Low,
        startDate: "",
        status: TaskStatuses.InProgress,
        todoListId: "todolistId1",
      },
      {
        id: v1(),
        title: "JS",
        addedDate: "",
        deadline: "",
        description: "",
        entityStatus: "idle",
        order: 0,
        priority: TaskPriorities.Low,
        startDate: "",
        status: TaskStatuses.InProgress,
        todoListId: "todolistId1",
      },
    ],
    todolistId2: [
      {
        id: v1(),
        title: "Milk",
        addedDate: "",
        deadline: "",
        description: "",
        entityStatus: "idle",
        order: 0,
        priority: TaskPriorities.Low,
        startDate: "",
        status: TaskStatuses.InProgress,
        todoListId: "todolistId2",
      },
      {
        id: v1(),
        title: "React Book",
        addedDate: "",
        deadline: "",
        description: "",
        entityStatus: "idle",
        order: 0,
        priority: TaskPriorities.Low,
        startDate: "",
        status: TaskStatuses.InProgress,
        todoListId: "todolistId2",
      },
    ],
  },
  app: {
    error: null,
    status: "idle",
  },
};

export const storyBookStore = createStore(
  rootReducer,
  initialGlobalState as unknown as AppRootStateType,
  applyMiddleware(thunk)
);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
  <Provider store={storyBookStore}>{storyFn()}</Provider>
);
