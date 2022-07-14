import { tasksReducer, TasksStateType } from './tasks-reducer';
import { addTodolistTC, TodolistDomainType, todolistsReducer } from './todolists-reducer';

test('ids should be equals', () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodolistDomainType> = [];

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

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todolistsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.payload.todolist.id);
  expect(idFromTodolists).toBe(action.payload.todolist.id);
});
