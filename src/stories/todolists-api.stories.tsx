import axios from "axios";
import React, { useEffect, useState } from "react";
import { todolistAPI } from "../api/todolist-api";

export default {
  title: "API",
};

const todolistId = "eda25673-c3ca-47eb-8ed8-f105d04c38be";
const taskId = "19908f5e-9f9e-4b5e-a523-0cf2433f1e3e";
const taskModel = {
   title: 'NewUpdate',
  description: 'some fancy task',
  status: 0,
  priority: 0,
  startDate: '',
  deadline: '',
}

//Todolist
export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    todolistAPI.getTodolists().then((res) => setState(res.data));
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    todolistAPI
      .createTodolist("new todolist")
      .then((res) => setState(res.data));
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    todolistAPI.deleteTodolist(todolistId).then((res) => setState(res.data));
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    todolistAPI
      .updateTodolist(todolistId, "wwwwwww")
      .then((res) => setState(res.data));
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
//Task
export const GetTasks = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    todolistAPI
      .getTasks("eda25673-c3ca-47eb-8ed8-f105d04c38be")
      .then((res) => setState(res.data));
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
export const CreateTask = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    todolistAPI
      .createTask(todolistId, "new task")
      .then((res) => setState(res.data));
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
export const DeleteTask = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    todolistAPI
      .deleteTask(todolistId, taskId)
      .then((res) => setState(res.data));
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
export const UpdateTask = () => {
  const [state,setState]=useState<any>(null)

  useEffect(() => {
    todolistAPI
      .updateTask(todolistId, taskId,taskModel)
      .then((res) => setState(res.data));
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
