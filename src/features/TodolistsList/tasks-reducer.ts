import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';

import {
  TaskPriorities,
  TaskStatuses,
  TaskType,
  todolistsAPI,
  UpdateTaskModelType,
} from '../../api/todolists-api';
import { setAppStatusAC } from '../../app/app-reducer';
import { AppRootStateType } from '../../app/store';
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils';

import { addTodolistAC, removeTodolistAC, setTodolistsAC } from './todolists-reducer';

const initialState: TasksStateType = {};
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    removeTaskAC(state, action: PayloadAction<{ taskId: string; todolistId: string }>) {
      const tasks = state[action.payload.todolistId];

      if (tasks) {
        state[action.payload.todolistId] = tasks.filter(
          t => t.id !== action.payload.taskId,
        );
      }
    },
    addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
      const tasks = state[action.payload.task.todoListId] || [];

      state[action.payload.task.todoListId] = [action.payload.task, ...tasks];
    },
    updateTaskAC(
      state,
      action: PayloadAction<{
        taskId: string;
        model: UpdateDomainTaskModelType;
        todolistId: string;
      }>,
    ) {
      const tasks = state[action.payload.todolistId];

      if (tasks) {
        const task = tasks.find(t => t.id === action.payload.taskId);

        if (task) {
          Object.assign(task, action.payload.model);
        }
      }
    },
    setTasksAC(
      state,
      action: PayloadAction<{ tasks: Array<TaskType>; todolistId: string }>,
    ) {
      state[action.payload.todolistId] = action.payload.tasks;
    },
  },
  extraReducers: builder => {
    builder.addCase(addTodolistAC, (state, action) => {
      state[action.payload.todolist.id] = [];
    });
    builder.addCase(removeTodolistAC, (state, action) => {
      delete state[action.payload.id];
    });
    builder.addCase(setTodolistsAC, (state, action) => {
      action.payload.todolists.forEach(tl => {
        state[tl.id] = [];
      });
    });
  },
});

export const tasksReducer = tasksSlice.reducer;
export const { addTaskAC, removeTaskAC, setTasksAC, updateTaskAC } = tasksSlice.actions;

// thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: 'loading' }));
  todolistsAPI.getTasks(todolistId).then(res => {
    const tasks = res.data.items;

    dispatch(setTasksAC({ tasks, todolistId }));
    dispatch(setAppStatusAC({ status: 'succeeded' }));
  });
};
export const removeTaskTC =
  (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todolistId, taskId).then(() => {
      const action = removeTaskAC({ taskId, todolistId });

      dispatch(action);
    });
  };
export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: 'loading' }));
  todolistsAPI
    .createTask(todolistId, title)
    .then(res => {
      if (res.data.resultCode === 0) {
        const task = res.data.data.item;
        const action = addTaskAC({ task });

        dispatch(action);
        dispatch(setAppStatusAC({ status: 'succeeded' }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch);
    });
};
export const updateTaskTC =
  (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
  (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const state = getState();
    const task = state.tasks[todolistId].find(t => t.id === taskId);

    if (!task) return;

    const apiModel: UpdateTaskModelType = {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      title: task.title,
      status: task.status,
      ...domainModel,
    };

    todolistsAPI
      .updateTask(todolistId, taskId, apiModel)
      .then(res => {
        if (res.data.resultCode === 0) {
          const action = updateTaskAC({
            taskId,
            todolistId,
            model: domainModel,
          });

          dispatch(action);
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch);
      });
  };

// types
export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};
export type TasksStateType = {
  [key: string]: Array<TaskType>;
};
