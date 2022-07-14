/* eslint-disable no-magic-numbers */
import { v1 } from 'uuid';

import {
  addTodolistTC,
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  FilterValuesType,
  removeTodolistTC,
  TodolistDomainType,
  todolistsReducer,
} from './todolists-reducer';

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType> = [];

beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();
  startState = [
    {
      id: todolistId1,
      title: 'What to learn',
      filter: 'all',
      entityStatus: 'idle',
      addedDate: '',
      order: 0,
    },
    {
      id: todolistId2,
      title: 'What to buy',
      filter: 'all',
      entityStatus: 'idle',
      addedDate: '',
      order: 0,
    },
  ];
});

test('correct todolist should be removed', () => {
  const endState = todolistsReducer(
    startState,
    removeTodolistTC.fulfilled({ id: todolistId1 }, 'removeTodolistTC', 'todolistId1'),
  );

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
  const newTodolist = {
    id: 'new id',
    addedDate: '25-12-2030',
    order: 0,
    title: 'new todolist',
  };

  const endState = todolistsReducer(
    startState,
    addTodolistTC.fulfilled({ todolist: newTodolist }, 'addTodolist', 'new todolist'),
  );

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTodolist.title);
  expect(endState[0].filter).toBe('all');
});

test('correct todolist should change its name', () => {
  const newTodolistTitle = 'New Todolist';

  const action = changeTodolistTitleTC.fulfilled(
    {
      id: todolistId2,
      title: newTodolistTitle,
    },
    'hangeTodolistTitle',
    {
      id: todolistId2,
      title: newTodolistTitle,
    },
  );

  const endState = todolistsReducer(startState, action);

  expect(endState[0].title).toBe('What to learn');
  expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
  const newFilter: FilterValuesType = 'completed';

  const action = changeTodolistFilterAC({ id: todolistId2, filter: newFilter });

  const endState = todolistsReducer(startState, action);

  expect(endState[0].filter).toBe('all');
  expect(endState[1].filter).toBe(newFilter);
});
