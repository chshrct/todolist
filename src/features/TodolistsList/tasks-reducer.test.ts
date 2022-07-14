/* eslint-disable no-magic-numbers */
import { TaskPriorities, TaskStatuses } from '../../api/todolists-api';

import {
  addTaskTC,
  removeTaskTC,
  tasksReducer,
  TasksStateType,
  updateTaskTC,
} from './tasks-reducer';
import { addTodolistTC, removeTodolistTC } from './todolists-reducer';

let startState: TasksStateType = {};

beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatuses.New,
        todoListId: 'todolistId1',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: '2',
        title: 'JS',
        status: TaskStatuses.Completed,
        todoListId: 'todolistId1',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: '3',
        title: 'React',
        status: TaskStatuses.New,
        todoListId: 'todolistId1',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
    todolistId2: [
      {
        id: '1',
        title: 'bread',
        status: TaskStatuses.New,
        todoListId: 'todolistId2',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: '2',
        title: 'milk',
        status: TaskStatuses.Completed,
        todoListId: 'todolistId2',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: '3',
        title: 'tea',
        status: TaskStatuses.New,
        todoListId: 'todolistId2',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
  };
});

test('correct task should be deleted from correct array', () => {
  const action = removeTaskTC.fulfilled(
    { taskId: '2', todolistId: 'todolistId2' },
    'removeTask',
    { taskId: '2', todolistId: 'todolistId2' },
  );

  const endState = tasksReducer(startState, action);

  expect(endState.todolistId1.length).toBe(3);
  expect(endState.todolistId2.length).toBe(2);
  expect(endState.todolistId2.every(t => t.id !== '2')).toBeTruthy();
});
test('correct task should be added to correct array', () => {
  const action = addTaskTC.fulfilled(
    {
      task: {
        id: '1',
        title: 'CSS',
        status: TaskStatuses.New,
        todoListId: 'todolistId2',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
      },
    },
    'addTask',
    { title: 'CSS', todolistId: 'todolistId2' },
  );

  const endState = tasksReducer(startState, action);

  expect(endState.todolistId1.length).toBe(3);
  expect(endState.todolistId2.length).toBe(4);
  expect(endState.todolistId2[0].id).toBeDefined();
  expect(endState.todolistId2[0].title).toBe('CSS');
  expect(endState.todolistId2[0].status).toBe(TaskStatuses.New);
});
test('status of specified task should be changed', () => {
  const action = updateTaskTC.fulfilled(
    {
      taskId: '2',
      todolistId: 'todolistId2',
      model: {
        title: 'CSS',
        status: TaskStatuses.New,
        description: '',
        startDate: '',
        deadline: '',
        priority: TaskPriorities.Low,
      },
    },
    'updateTask',
    {
      taskId: '2',
      domainModel: {
        title: 'CSS',
        status: TaskStatuses.New,
        description: '',
        startDate: '',
        deadline: '',
        priority: TaskPriorities.Low,
      },
      todolistId: 'todolistId2',
    },
  );

  const endState = tasksReducer(startState, action);

  expect(endState.todolistId1[1].status).toBe(TaskStatuses.Completed);
  expect(endState.todolistId2[1].status).toBe(TaskStatuses.New);
});
test('title of specified task should be changed', () => {
  const action = updateTaskTC.fulfilled(
    {
      taskId: '2',
      model: {
        title: 'yogurt',
        status: TaskStatuses.New,
        description: '',
        startDate: '',
        deadline: '',
        priority: TaskPriorities.Low,
      },
      todolistId: 'todolistId2',
    },
    'updateTask',
    {
      domainModel: {
        title: 'yogurt',
        status: TaskStatuses.New,
        description: '',
        startDate: '',
        deadline: '',
        priority: TaskPriorities.Low,
      },
      taskId: '2',
      todolistId: 'todolistId2',
    },
  );

  const endState = tasksReducer(startState, action);

  expect(endState.todolistId1[1].title).toBe('JS');
  expect(endState.todolistId2[1].title).toBe('yogurt');
  expect(endState.todolistId2[0].title).toBe('bread');
});
test('new array should be added when new todolist is added', () => {
  const action = addTodolistTC.fulfilled(
    {
      todolist: {
        id: 'new id',
        addedDate: '25-12-2030',
        order: 0,
        title: 'new todolist',
      },
    },
    'addTodolist',
    'new todolist',
  );

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2');

  if (!newKey) {
    throw Error('new key should be added');
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});
test('propertry with todolistId should be deleted', () => {
  const action = removeTodolistTC.fulfilled(
    { id: 'todolistId2' },
    'removeTodolist',
    'todolistId2',
  );

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState.todolistId2).not.toBeDefined();
});
