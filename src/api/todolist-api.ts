import axios from "axios";

type TodolistType = {
  addedDate: string;
  id: string;
  order: number;
  title: string;
};

export type Response<Data = {}> = {
  data: Data;
  fieldsErrors: string[];
  messages: string[];
  resultCode: number;
};

export type TaskModelType = {
  title: string;
  description: string;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
};

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "45504c5e-aecb-4772-971c-a14a04809005",
  },
});

export const todolistAPI = {
  getTodolists() {
    return instance.get<TodolistType[]>("todo-lists");
  },
  createTodolist(title: string) {
    return instance.post<
      Response<{
        item: TodolistType;
      }>
    >("todo-lists", { title: title });
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<Response>(`todo-lists/${todolistId}`);
  },

  updateTodolist(todolistId: string, title: string) {
    return instance.put<Response>(`todo-lists/${todolistId}`, { title: title });
  },
  getTasks(todolistId: string) {
    return instance.get(`todo-lists/${todolistId}/tasks`);
  },
  createTask(todolistId: string, title: string) {
    return instance.post(`todo-lists/${todolistId}/tasks`, { title: title });
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete(`/todo-lists/${todolistId}/tasks/${taskId}`);
  },

  updateTask(todolistId: string, taskId: string, taskModel:TaskModelType) {
    return instance.put(`/todo-lists/${todolistId}/tasks/${taskId}`, taskModel);
  },
};
