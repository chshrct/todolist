import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../App";

type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};
type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  title: string;
};
type ChangeTodolistTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  id: string;
  title: string;
};
type ChangeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  id: string;
  filter: FilterValuesType;
};

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType;

export const todolistsReducer = (
  state: Array<TodolistType>,
  action: ActionsType
) => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return [...state.filter((tl) => tl.id !== action.id)];
    case "ADD-TODOLIST":
      return [...state, { id: v1(), title: action.title, filter: "all" }];
    case "CHANGE-TODOLIST-TITLE":
      const todolist = state.find((tl) => tl.id === action.id);
      if (todolist) todolist.title = action.title;
      return [...state];
    case "CHANGE-TODOLIST-FILTER":
      const tl = state.find((tl) => tl.id === action.id);
      if (tl) tl.filter = action.filter;
      return [...state];

    default:
      throw new Error("I don't understand this type");
  }
};

export const removeTodolistAC = (
  todolistId: string
): RemoveTodolistActionType => {
  return { type: "REMOVE-TODOLIST", id: todolistId };
};
export const addTodolistAC = (title: string): AddTodolistActionType => {
  return { type: "ADD-TODOLIST", title };
};
export const changeTodolistTitleAC = (
  todolistId: string,
  title: string
): ChangeTodolistTitleActionType => {
  return { type: "CHANGE-TODOLIST-TITLE", id: todolistId, title };
};
export const changeTodolistFilterAC = (
  todolistId: string,
  filter: FilterValuesType
): ChangeTodolistFilterActionType => {
  return { type: "CHANGE-TODOLIST-FILTER", id: todolistId, filter };
};
