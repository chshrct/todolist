import {
  addTodolistAC,
  TodolistDomainType,
  todolistsReducer,
} from "./todolists-reducer";
import { tasksReducer, TasksStateType } from "./tasks-reducer";

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodolistDomainType> = [];

  const action = addTodolistAC({
    id: "new id",
    addedDate: "25-12-2030",
    order: 0,
    title: "new todolist",
  });

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todolistsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.todolist.id);
  expect(idFromTodolists).toBe(action.todolist.id);
});