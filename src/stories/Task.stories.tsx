import React from "react";
import { Meta, Story } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { TaskPriorities, TaskStatuses } from "../api/todolists-api";
import {
  Task,
  TaskPropsType,
} from "../features/TodolistsList/Todolist/Task/Task";

export default {
  title: "Todolist/Task",
  component: Task,
} as Meta<typeof Task>;

const changeTaskStatusCallback = action("Status changed inside Task");
const changeTaskTitleCallback = action("Title changed inside Task");
const removeTaskCallback = action("Remove button inside Task clicked");

const baseArgs = {
  changeTaskStatus: changeTaskStatusCallback,
  changeTaskTitle: changeTaskTitleCallback,
  removeTask: removeTaskCallback,
};

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
  ...baseArgs,
  task: {
    id: "1",
    title: "JS",
    status: TaskStatuses.Completed,
    todoListId: "todolistId1",
    description: "",
    entityStatus: "idle",
    startDate: "",
    deadline: "",
    addedDate: "",
    order: 0,
    priority: TaskPriorities.Low,
  },
  todolistId: "todolistId1",
};
export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
  ...baseArgs,
  task: {
    id: "1",
    title: "JS",
    status: TaskStatuses.New,
    todoListId: "todolistId1",
    description: "",
    entityStatus: "idle",
    startDate: "",
    deadline: "",
    addedDate: "",
    order: 0,
    priority: TaskPriorities.Low,
  },
  todolistId: "todolistId2",
};
