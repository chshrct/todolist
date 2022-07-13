import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';

import { todolistsAPI, TodolistType } from '../../api/todolists-api';
import { RequestStatusType, setAppStatusAC } from '../../app/app-reducer';

const initialState: Array<TodolistDomainType> = [];

const todolistsSlice = createSlice({
  name: 'todolists',
  initialState,
  reducers: {
    removeTodolistAC(state, action: PayloadAction<{ id: string }>) {
      const todolist = state.find(tl => tl.id === action.payload.id);

      if (todolist) {
        const index = state.indexOf(todolist);

        state.splice(index, 1);
      }
    },
    addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
      state.unshift({
        ...action.payload.todolist,
        filter: 'all',
        entityStatus: 'idle',
      });
    },
    changeTodolistTitleAC(state, action: PayloadAction<{ id: string; title: string }>) {
      const todolist = state.find(tl => tl.id === action.payload.id);

      if (todolist) {
        todolist.title = action.payload.title;
      }
    },
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
    setTodolistsAC(state, action: PayloadAction<{ todolists: Array<TodolistType> }>) {
      action.payload.todolists.forEach(tl => {
        state.push({ ...tl, filter: 'all', entityStatus: 'idle' });
      });
    },
  },
});

export const todolistsReducer = todolistsSlice.reducer;

// actions
export const {
  addTodolistAC,
  changeTodolistEntityStatusAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  setTodolistsAC,
} = todolistsSlice.actions;

// thunks
export const fetchTodolistsTC = () => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: 'loading' }));
    todolistsAPI.getTodolists().then(res => {
      dispatch(setTodolistsAC({ todolists: res.data }));
      dispatch(setAppStatusAC({ status: 'succeeded' }));
    });
  };
};
export const removeTodolistTC = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    // изменим глобальный статус приложения, чтобы вверху полоса побежала
    dispatch(setAppStatusAC({ status: 'loading' }));
    // изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
    dispatch(changeTodolistEntityStatusAC({ id: todolistId, status: 'loading' }));
    todolistsAPI.deleteTodolist(todolistId).then(() => {
      dispatch(removeTodolistAC({ id: todolistId }));
      // скажем глобально приложению, что асинхронная операция завершена
      dispatch(setAppStatusAC({ status: 'succeeded' }));
    });
  };
};
export const addTodolistTC = (title: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: 'loading' }));
    todolistsAPI.createTodolist(title).then(res => {
      dispatch(addTodolistAC({ todolist: res.data.data.item }));
      dispatch(setAppStatusAC({ status: 'succeeded' }));
    });
  };
};
export const changeTodolistTitleTC = (id: string, title: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.updateTodolist(id, title).then(() => {
      dispatch(changeTodolistTitleAC({ id, title }));
    });
  };
};

// types

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};
