import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { todolistsAPI, TodolistType } from '../../api/todolists-api';
import { RequestStatusType, setAppStatusAC } from '../../app/app-reducer';

export const fetchTodolistsTC = createAsyncThunk(
  'todolists/fetchTodolistsTC',
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAppStatusAC({ status: 'loading' }));
      const res = await todolistsAPI.getTodolists();

      dispatch(setAppStatusAC({ status: 'succeeded' }));

      return { todolists: res.data };
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  },
);

export const removeTodolistTC = createAsyncThunk(
  'todolists/removeTodolistTC',
  async (todolistId: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAppStatusAC({ status: 'loading' }));
      dispatch(changeTodolistEntityStatusAC({ id: todolistId, status: 'loading' }));
      await todolistsAPI.deleteTodolist(todolistId);
      dispatch(setAppStatusAC({ status: 'succeeded' }));

      return { id: todolistId };
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  },
);

export const addTodolistTC = createAsyncThunk(
  'todolists/addTodolistTC',
  async (title: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAppStatusAC({ status: 'loading' }));
      const res = await todolistsAPI.createTodolist(title);

      dispatch(setAppStatusAC({ status: 'succeeded' }));

      return { todolist: res.data.data.item };
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  },
);

export const changeTodolistTitleTC = createAsyncThunk(
  'todolists/changeTodolistTitleTC',
  async (payload: { id: string; title: string }, { rejectWithValue }) => {
    try {
      const { id, title } = payload;

      await todolistsAPI.updateTodolist(id, title);

      return { id, title };
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  },
);

const todolistsSlice = createSlice({
  name: 'todolists',
  initialState: [] as Array<TodolistDomainType>,
  reducers: {
    changeTodolistFilterAC(
      state,
      action: PayloadAction<{ id: string; filter: FilterValuesType }>,
    ) {
      const todolist = state.find(tl => tl.id === action.payload.id);

      if (todolist) {
        todolist.filter = action.payload.filter;
      }
    },
    changeTodolistEntityStatusAC(
      state,
      action: PayloadAction<{ id: string; status: RequestStatusType }>,
    ) {
      const todolist = state.find(tl => tl.id === action.payload.id);

      if (todolist) {
        todolist.entityStatus = action.payload.status;
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
      action.payload.todolists.forEach(tl => {
        state.push({ ...tl, filter: 'all', entityStatus: 'idle' });
      });
    });
    builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
      const todolist = state.find(tl => tl.id === action.payload.id);

      if (todolist) {
        const index = state.indexOf(todolist);

        state.splice(index, 1);
      }
    });
    builder.addCase(addTodolistTC.fulfilled, (state, action) => {
      state.unshift({
        ...action.payload.todolist,
        filter: 'all',
        entityStatus: 'idle',
      });
    });
    builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
      const todolist = state.find(tl => tl.id === action.payload.id);

      if (todolist) {
        todolist.title = action.payload.title;
      }
    });
  },
});

export const todolistsReducer = todolistsSlice.reducer;

// actions
export const { changeTodolistEntityStatusAC, changeTodolistFilterAC } =
  todolistsSlice.actions;

// types

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};
