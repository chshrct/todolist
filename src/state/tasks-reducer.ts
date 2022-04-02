import { stringify } from "querystring";
import { v1 } from "uuid";
import { TasksStateType } from "../App";
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer";

type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  taskId: string;
  todolistID: string;
};
type AddTaskActionType = {
  type: "ADD-TASK";
  title: string;
  todolistID: string;
};
type ChangeTaskStatusActionType = {
  type: "CHANGE-TASK-STATUS";
  taskId: string;
  isDone: boolean;
  todolistID: string;
};
type ChangeTaskTitleActionType = {
  type: "CHANGE-TASK-TITLE";
  taskId: string;
  title: string;
  todolistID: string;
};

type RootActionType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType;

export const tasksReducer = (
  state: TasksStateType,
  action: RootActionType
): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK":
      return {
        ...state,
        [action.todolistID]: state[action.todolistID].filter(
          (task) => task.id !== action.taskId
        ),
      };
    case "ADD-TASK":
      return {
        ...state,
        [action.todolistID]: [
          { id: v1(), title: action.title, isDone: false },
          ...state[action.todolistID],
        ],
      };
    case "CHANGE-TASK-STATUS": {
      const tasksCopy = [...state[action.todolistID]];
      const taskCopy = tasksCopy.find((task) => task.id === action.taskId);
      if (taskCopy) taskCopy.isDone = action.isDone;
      return {
        ...state,
        [action.todolistID]: tasksCopy,
      };
    }
    case "CHANGE-TASK-TITLE": {
      const tasksCopy = [...state[action.todolistID]];
      const taskCopy = tasksCopy.find((task) => task.id === action.taskId);
      if (taskCopy) taskCopy.title = action.title;
      return {
        ...state,
        [action.todolistID]: tasksCopy,
      };
    }
    case 'ADD-TODOLIST': 
        return {
            ...state,
            [action.todolistId]:[]
        }
    
    case 'REMOVE-TODOLIST':{
        const stateCopy = {...state}
        delete stateCopy[action.id]
        return stateCopy
    }
    default:
      return state;
  }
};

export const removeTaskAC = (
  taskId: string,
  todolistID: string
): RemoveTaskActionType => {
  return { type: "REMOVE-TASK", taskId, todolistID };
};
export const addTaskAC = (
  title: string,
  todolistID: string
): AddTaskActionType => {
  return { type: "ADD-TASK", title, todolistID };
};
export const changeTaskStatusAC = (
  taskId: string,
  isDone: boolean,
  todolistID: string
): ChangeTaskStatusActionType => {
  return {
    type: "CHANGE-TASK-STATUS",
    taskId,
    isDone,
    todolistID,
  };
};
export const changeTaskTitleAC = (
  taskId: string,
  title: string,
  todolistID: string
): ChangeTaskTitleActionType => {
  return {
    type: "CHANGE-TASK-TITLE",
    taskId,
    title,
    todolistID,
  };
};
