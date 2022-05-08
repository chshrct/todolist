import { Dispatch } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { v1 } from "uuid";
import { todolistsAPI, TodolistType } from "../api/todolists-api";
import { AppRootStateType, AppThunk } from "./store";

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};
export type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  todolist: TodolistType;
};
export type ChangeTodolistTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  id: string;
  title: string;
};
export type ChangeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  id: string;
  filter: FilterValuesType;
};

export type SetTodolistsActionType = {
  type: "SET-TODOLISTS";
  todolists: TodolistType[];
};

export type TodolistsRootActionType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | SetTodolistsActionType;

const initialState: Array<TodolistDomainType> = [
  /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
];

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
};

export const todolistsReducer = (
  state: Array<TodolistDomainType> = initialState,
  action: TodolistsRootActionType
): Array<TodolistDomainType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.id);
    }
    case "ADD-TODOLIST": {
      return [
        {
          ...action.todolist,
          filter: "all",
        },
        ...state,
      ];
    }
    case "CHANGE-TODOLIST-TITLE": {
      const todolist = state.find((tl) => tl.id === action.id);
      if (todolist) {
        // если нашёлся - изменим ему заголовок
        todolist.title = action.title;
      }
      return [...state];
    }
    case "CHANGE-TODOLIST-FILTER": {
      const todolist = state.find((tl) => tl.id === action.id);
      if (todolist) {
        // если нашёлся - изменим ему заголовок
        todolist.filter = action.filter;
      }
      return [...state];
    }
    case "SET-TODOLISTS": {
      return action.todolists.map((tl) => ({ ...tl, filter: "all" }));
    }
    default:
      return state;
  }
};

export const removeTodolistAC = (
  todolistId: string
): RemoveTodolistActionType => {
  return { type: "REMOVE-TODOLIST", id: todolistId };
};
export const addTodolistAC = (
  todolist: TodolistType
): AddTodolistActionType => {
  return { type: "ADD-TODOLIST", todolist };
};
export const changeTodolistTitleAC = (
  id: string,
  title: string
): ChangeTodolistTitleActionType => {
  return { type: "CHANGE-TODOLIST-TITLE", id: id, title: title };
};
export const changeTodolistFilterAC = (
  id: string,
  filter: FilterValuesType
): ChangeTodolistFilterActionType => {
  return { type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter };
};

export const setTodolistsAC = (
  todolists: TodolistType[]
): SetTodolistsActionType => ({
  type: "SET-TODOLISTS",
  todolists,
});

// thunk

export const fetchTodolistsTC = (): AppThunk => async (dispatch) => {
  const response = await todolistsAPI.getTodolists();
  dispatch(setTodolistsAC(response.data));
};

export const addTodolistTC =
  (title: string): AppThunk =>
  async (dispatch) => {
    const response = await todolistsAPI.createTodolist(title);
    response.data.resultCode === 0 &&
      dispatch(addTodolistAC(response.data.data.item));
  };

export const removeTodolistTC =
  (todolistId: string): AppThunk =>
  async (dispatch) => {
    const response = await todolistsAPI.deleteTodolist(todolistId);
    response.data.resultCode === 0 && dispatch(removeTodolistAC(todolistId));
  };

export const changeTodolistTitleTC =
  (todolistId: string, title: string): AppThunk =>
  async (dispatch) => {
    const response = await todolistsAPI.updateTodolist(todolistId, title);
    response.data.resultCode === 0 &&
      dispatch(changeTodolistTitleAC(todolistId, title));
  };
