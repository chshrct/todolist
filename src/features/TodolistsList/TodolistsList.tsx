import React, { useCallback, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { TaskStatuses } from '../../api/todolists-api';
import { AppRootStateType, useAppDispatch } from '../../app/store';
import { AddItemForm } from '../../components/AddItemForm/AddItemForm';

import { addTaskTC, removeTaskTC, TasksStateType, updateTaskTC } from './tasks-reducer';
import { Todolist } from './Todolist/Todolist';
import {
  addTodolistTC,
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  fetchTodolistsTC,
  FilterValuesType,
  removeTodolistTC,
  TodolistDomainType,
} from './todolists-reducer';

type PropsType = {
  demo?: boolean;
};

export const TodolistsList: React.FC<PropsType> = ({ demo = false }) => {
  const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(
    state => state.todolists,
  );

  const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector<AppRootStateType, boolean>(
    state => state.auth.isLoggedIn,
  );

  useEffect(() => {
    if (demo || !isLoggedIn) {
      return;
    }
    const thunk = fetchTodolistsTC();

    dispatch(thunk);
  }, [demo, isLoggedIn, dispatch]);

  const removeTask = useCallback(
    (taskId: string, todolistId: string) => {
      dispatch(removeTaskTC({ taskId, todolistId }));
    },
    [dispatch],
  );

  const addTask = useCallback(
    (title: string, todolistId: string) => {
      dispatch(
        addTaskTC({
          title,
          todolistId,
        }),
      );
    },
    [dispatch],
  );

  const changeStatus = useCallback(
    (taskId: string, status: TaskStatuses, todolistId: string) => {
      const thunk = updateTaskTC({ taskId, domainModel: { status }, todolistId });

      dispatch(thunk);
    },
    [dispatch],
  );

  const changeTaskTitle = useCallback(
    (taskId: string, newTitle: string, todolistId: string) => {
      const thunk = updateTaskTC({
        domainModel: { title: newTitle },
        taskId,
        todolistId,
      });

      dispatch(thunk);
    },
    [dispatch],
  );

  const changeFilter = useCallback(
    (value: FilterValuesType, todolistId: string) => {
      const action = changeTodolistFilterAC({ filter: value, id: todolistId });

      dispatch(action);
    },
    [dispatch],
  );

  const removeTodolist = useCallback(
    (id: string) => {
      const thunk = removeTodolistTC(id);

      dispatch(thunk);
    },
    [dispatch],
  );

  const changeTodolistTitle = useCallback(
    (id: string, title: string) => {
      const thunk = changeTodolistTitleTC({ id, title });

      dispatch(thunk);
    },
    [dispatch],
  );

  const addTodolist = useCallback(
    (title: string) => {
      const thunk = addTodolistTC(title);

      dispatch(thunk);
    },
    [dispatch],
  );

  if (!isLoggedIn) return <Navigate to="/login" />;

  return (
    <>
      <Grid container style={{ padding: '20px' }}>
        <AddItemForm addItem={addTodolist} placeholder="Todolist title" />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map(tl => {
          const allTodolistTasks = tasks[tl.id];

          return (
            <Grid item key={tl.id}>
              <Paper style={{ padding: '10px' }}>
                <Todolist
                  todolist={tl}
                  tasks={allTodolistTasks}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeStatus}
                  removeTodolist={removeTodolist}
                  changeTaskTitle={changeTaskTitle}
                  changeTodolistTitle={changeTodolistTitle}
                  demo={demo}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
