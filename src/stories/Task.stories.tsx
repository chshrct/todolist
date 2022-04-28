import React from "react";
import { Meta, Story } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Task, { TaskProps } from "../Task";

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

const Template: Story<TaskProps> = (args) => <Task {...args} />;

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
  ...baseArgs,
  ...{id:1,isDone:true,title:'JS'},
  todolistId:'todolistId1'
};
export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
  ...baseArgs,
  ...{id:1,isDone:false,title:'React'},
  todolistId:'todolistId2'
};
