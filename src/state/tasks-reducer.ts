import { TasksStateType } from "../App";
import { v1 } from "uuid";
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
} from "./todolists-reducer";
import {
  TaskPriorities,
  TaskStatuses,
  TaskType,
  todolistsAPI,
  TodolistType,
} from "../api/todolists-api";
import { AppThunk } from "./store";

export type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  todolistId: string;
  taskId: string;
};

export type AddTaskActionType = {
  type: "ADD-TASK";
  todolistId: string;
  task: TaskType;
};

export type ChangeTaskStatusActionType = {
  type: "CHANGE-TASK-STATUS";
  todolistId: string;
  taskId: string;
  status: TaskStatuses;
};

export type ChangeTaskTitleActionType = {
  type: "CHANGE-TASK-TITLE";
  todolistId: string;
  taskId: string;
  title: string;
};

export type SetTodolistsActionType = {
  type: "SET-TODOLISTS";
  todolists: TodolistType[];
};

export type SetTasksActionType = {
  type: "SET-TASKS";
  tasks: TaskType[];
  todolistId: string;
};

export type TasksRootActionType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsActionType
  | SetTasksActionType;

const initialState: TasksStateType = {
  /*"todolistId1": [
        { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ],
    "todolistId2": [
        { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ]*/
};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: TasksRootActionType
): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todolistId];
      const newTasks = tasks.filter((t) => t.id !== action.taskId);
      stateCopy[action.todolistId] = newTasks;
      return stateCopy;
    }
    case "ADD-TASK": {
      return {
        ...state,
        [action.todolistId]: [action.task, ...state[action.todolistId]],
      };
    }
    case "CHANGE-TASK-STATUS": {
      let todolistTasks = state[action.todolistId];
      let newTasksArray = todolistTasks.map((t) =>
        t.id === action.taskId ? { ...t, status: action.status } : t
      );

      state[action.todolistId] = newTasksArray;
      return { ...state };
    }
    case "CHANGE-TASK-TITLE": {
      let todolistTasks = state[action.todolistId];
      // найдём нужную таску:
      let newTasksArray = todolistTasks.map((t) =>
        t.id === action.taskId ? { ...t, title: action.title } : t
      );

      state[action.todolistId] = newTasksArray;
      return { ...state };
    }
    case "ADD-TODOLIST": {
      return {
        [action.todolist.id]: [],
        ...state,
      };
    }
    case "REMOVE-TODOLIST": {
      const copyState = { ...state };
      delete copyState[action.id];
      return copyState;
    }
    case "SET-TODOLISTS": {
      const copyState = { ...state };
      action.todolists.forEach((tl) => (copyState[tl.id] = []));
      return copyState;
    }
    case "SET-TASKS": {
      return { ...state, [action.todolistId]: action.tasks };
    }
    default:
      return state;
  }
};

export const removeTaskAC = (
  taskId: string,
  todolistId: string
): RemoveTaskActionType => {
  return { type: "REMOVE-TASK", taskId: taskId, todolistId: todolistId };
};
export const addTaskAC = (
  todolistId: string,
  task: TaskType
): AddTaskActionType => {
  return { type: "ADD-TASK", task, todolistId };
};
export const changeTaskStatusAC = (
  taskId: string,
  status: TaskStatuses,
  todolistId: string
): ChangeTaskStatusActionType => {
  return { type: "CHANGE-TASK-STATUS", status, todolistId, taskId };
};
export const changeTaskTitleAC = (
  taskId: string,
  title: string,
  todolistId: string
): ChangeTaskTitleActionType => {
  return { type: "CHANGE-TASK-TITLE", title, todolistId, taskId };
};

export const setTodolistsAC = (
  todolists: TodolistType[]
): SetTodolistsActionType => ({
  type: "SET-TODOLISTS",
  todolists,
});

export const setTasksAC = (
  todolistId: string,
  tasks: TaskType[]
): SetTasksActionType => ({
  type: "SET-TASKS",
  tasks,
  todolistId,
});

// thunk

export const fetchTasksTC =
  (todolistId: string): AppThunk =>
  async (dispatch) => {
    const response = await todolistsAPI.getTasks(todolistId);
    dispatch(setTasksAC(todolistId, response.data.items));
  };

export const addTaskTC =
  (todolistId: string, title: string): AppThunk =>
  async (dispatch) => {
    const response = await todolistsAPI.createTask(todolistId, title);
    dispatch(addTaskAC(todolistId, response.data.data.item));
  };

export const removeTaskTC =
  (todolistId: string, taskId: string): AppThunk =>
  async (dispatch) => {
    const response = await todolistsAPI.deleteTask(todolistId, taskId);
    response.data.resultCode === 0 &&
      dispatch(removeTaskAC(taskId, todolistId));
  };

export const updateTaskStatusTC =
  (todolistId: string, taskId: string, status: TaskStatuses): AppThunk =>
  async (dispatch, getState) => {
    const task = getState().tasks[todolistId].find(
      (task) => task.id === taskId
    );
    if (task) {
      const response = await todolistsAPI.updateTask(todolistId, taskId, {
        ...task,
        status,
      });
      response.data.resultCode === 0 &&
        dispatch(changeTaskStatusAC(taskId, status, todolistId));
    }
  };

export const changeTaskTitleTC =
  (todolistId: string, taskId: string, title: string): AppThunk =>
  async (dispatch, getState) => {
    const task = getState().tasks[todolistId].find(
      (task) => task.id === taskId
    );
    if (task) {
      const response = await todolistsAPI.updateTask(todolistId, taskId, {
        ...task,
        title,
      });
      response.data.resultCode === 0 &&
        dispatch(changeTaskTitleAC(taskId, title, todolistId));
    }
  };
