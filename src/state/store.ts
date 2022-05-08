import { tasksReducer, TasksRootActionType } from "./tasks-reducer";
import { todolistsReducer, TodolistsRootActionType } from "./todolists-reducer";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { useDispatch } from "react-redux";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
});
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunk));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppRootActionType = TasksRootActionType | TodolistsRootActionType
export type AppDispatch = typeof store.dispatch
export type TypedDispatch = ThunkDispatch<AppRootStateType, any, AppRootActionType>;

export const useAppDispatch = () => useDispatch<TypedDispatch>();


export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AppRootActionType
>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
