import React, { useCallback, useEffect } from 'react';

import { Delete } from '@mui/icons-material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import { TaskStatuses, TaskType } from '../../../api/todolists-api';
import { useAppDispatch } from '../../../app/store';
import { AddItemForm } from '../../../components/AddItemForm/AddItemForm';
import { EditableSpan } from '../../../components/EditableSpan/EditableSpan';
import { fetchTasks } from '../tasks-reducer';
import { FilterValuesType, TodolistDomainType } from '../todolists-reducer';

import { Task } from './Task/Task';

type PropsType = {
  todolist: TodolistDomainType;
  tasks: Array<TaskType>;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void;
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void;
  removeTask: (taskId: string, todolistId: string) => void;
  removeTodolist: (id: string) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
  demo?: boolean;
};

export const Todolist = React.memo(
  ({
    demo = false,
    addTask,
    removeTodolist,
    changeTodolistTitle,
    changeFilter,
    todolist,
    ...props
  }: PropsType) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
      if (demo) {
        return;
      }
      const thunk = fetchTasks(todolist.id);

      dispatch(thunk);
    }, [demo, todolist.id, dispatch]);

    const addTaskUC = useCallback(
      (title: string) => {
        addTask(title, todolist.id);
      },
      [addTask, todolist.id],
    );

    const removeTodolistUC = (): void => {
      removeTodolist(todolist.id);
    };
    const changeTodolistTitleUC = useCallback(
      (title: string) => {
        changeTodolistTitle(todolist.id, title);
      },
      [changeTodolistTitle, todolist.id],
    );

    const onAllClickHandler = useCallback(
      () => changeFilter('all', todolist.id),
      [todolist.id, changeFilter],
    );
    const onActiveClickHandler = useCallback(
      () => changeFilter('active', todolist.id),
      [todolist.id, changeFilter],
    );
    const onCompletedClickHandler = useCallback(
      () => changeFilter('completed', todolist.id),
      [todolist.id, changeFilter],
    );

    let tasksForTodolist = props.tasks;

    if (todolist.filter === 'active') {
      tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (todolist.filter === 'completed') {
      tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed);
    }

    return (
      <div>
        <h3 style={{ display: 'flex', alignItems: 'center' }}>
          <EditableSpan value={todolist.title} onChange={changeTodolistTitleUC} />
          <IconButton
            onClick={removeTodolistUC}
            disabled={todolist.entityStatus === 'loading'}
          >
            <Delete />
          </IconButton>
        </h3>
        <AddItemForm
          addItem={addTaskUC}
          disabled={todolist.entityStatus === 'loading'}
          placeholder="Task title"
        />
        <div>
          {tasksForTodolist.map(t => (
            <Task
              key={t.id}
              task={t}
              todolistId={todolist.id}
              removeTask={props.removeTask}
              changeTaskTitle={props.changeTaskTitle}
              changeTaskStatus={props.changeTaskStatus}
            />
          ))}
        </div>
        <div style={{ paddingTop: '10px' }}>
          <Button
            variant={todolist.filter === 'all' ? 'outlined' : 'text'}
            onClick={onAllClickHandler}
            color="inherit"
          >
            All
          </Button>
          <Button
            variant={todolist.filter === 'active' ? 'outlined' : 'text'}
            onClick={onActiveClickHandler}
            color="primary"
          >
            Active
          </Button>
          <Button
            variant={todolist.filter === 'completed' ? 'outlined' : 'text'}
            onClick={onCompletedClickHandler}
            color="secondary"
          >
            Completed
          </Button>
        </div>
      </div>
    );
  },
);
