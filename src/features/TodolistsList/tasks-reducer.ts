import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  TaskPriorities,
  TaskStatuses,
  TaskType,
  todolistsAPI,
  UpdateTaskModelType,
} from '../../api/todolists-api';
import { setAppErrorAC, setAppStatusAC } from '../../app/app-reducer';
import { AppRootStateType } from '../../app/store';
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils';

import { addTodolistTC, fetchTodolistsTC, removeTodolistTC } from './todolists-reducer';

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (todolistId: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAppStatusAC({ status: 'loading' }));
      const res = await todolistsAPI.getTasks(todolistId);
      const tasks = res.data.items;

      dispatch(setAppStatusAC({ status: 'succeeded' }));

      return { tasks, todolistId };
    } catch (e: any) {
      if (e.message) dispatch(setAppErrorAC(e.message));

      return rejectWithValue(e.message);
    }
  },
);

export const removeTaskTC = createAsyncThunk(
  'tasks/removeTaskTC',
  async (
    payload: { taskId: string; todolistId: string },
    { dispatch, rejectWithValue },
  ) => {
    try {
      const { taskId, todolistId } = payload;

      await todolistsAPI.deleteTask(todolistId, taskId);

      return { taskId, todolistId };
    } catch (e: any) {
      if (e.message) dispatch(setAppErrorAC(e.message));

      return rejectWithValue(e.message);
    }
  },
);

export const addTaskTC = createAsyncThunk(
  'tasks/addTaskTC',
  async (
    payload: { title: string; todolistId: string },
    { dispatch, rejectWithValue },
  ) => {
    try {
      const { title, todolistId } = payload;

      dispatch(setAppStatusAC({ status: 'loading' }));
      const res = await todolistsAPI.createTask(todolistId, title);

      if (res.data.resultCode === 0) {
        const task = res.data.data.item;

        dispatch(setAppStatusAC({ status: 'succeeded' }));

        return { task };
      }
      handleServerAppError(res.data, dispatch);

      return rejectWithValue(res.data.messages);
    } catch (e: any) {
      handleServerNetworkError(e.message, dispatch);

      return rejectWithValue(e.message);
    }
  },
);

export const updateTaskTC = createAsyncThunk(
  'tasks/updateTaskTC',
  async (
    payload: {
      taskId: string;
      domainModel: UpdateDomainTaskModelType;
      todolistId: string;
    },
    { dispatch, getState, rejectWithValue },
  ) => {
    try {
      const state = getState() as AppRootStateType;
      const { domainModel, taskId, todolistId } = payload;
      const task = state.tasks[todolistId].find(t => t.id === taskId);

      if (!task) return rejectWithValue('task not found');
      const { deadline, description, priority, startDate, title, status } = task;
      const apiModel: UpdateTaskModelType = {
        deadline,
        description,
        priority,
        startDate,
        title,
        status,
        ...domainModel,
      };
      const res = await todolistsAPI.updateTask(todolistId, taskId, apiModel);

      if (res.data.resultCode === 0) {
        return {
          taskId,
          todolistId,
          model: domainModel,
        };
      }
      handleServerAppError(res.data, dispatch);

      return rejectWithValue(res.data.messages);
    } catch (e: any) {
      handleServerNetworkError(e.message, dispatch);

      return rejectWithValue(e.message);
    }
  },
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {} as TasksStateType,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(addTodolistTC.fulfilled, (state, action) => {
      state[action.payload.todolist.id] = [];
    });
    builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
      delete state[action.payload.id];
    });
    builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
      action.payload.todolists.forEach(tl => {
        state[tl.id] = [];
      });
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state[action.payload.todolistId] = action.payload.tasks;
    });
    builder.addCase(removeTaskTC.fulfilled, (state, action) => {
      const tasks = state[action.payload.todolistId];

      if (tasks) {
        const taskIndex = tasks.findIndex(task => task.id === action.payload.taskId);

        tasks.splice(taskIndex, 1);
      }
    });
    builder.addCase(addTaskTC.fulfilled, (state, action) => {
      const tasks = state[action.payload.task.todoListId] || [];

      state[action.payload.task.todoListId] = [action.payload.task, ...tasks];
    });
    builder.addCase(updateTaskTC.fulfilled, (state, action) => {
      const tasks = state[action.payload!.todolistId];

      if (tasks) {
        const task = tasks.find(t => t.id === action.payload!.taskId);

        if (task) {
          Object.assign(task, action.payload!.model);
        }
      }
    });
  },
});

export const tasksReducer = tasksSlice.reducer;

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
