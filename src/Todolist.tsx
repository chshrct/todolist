import React, { ChangeEvent } from "react";
import { FilterValuesType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Button, Checkbox, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: string, todolistId: string) => void;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void;
  removeTodolist: (id: string) => void;
  filter: FilterValuesType;
  changeTask: (todolistId: string, taskId: string, title: string) => void;
  changeTodolistTitle: (todolistId: string, title: string) => void;
};

export function Todolist(props: PropsType) {
  const removeTodolist = () => props.removeTodolist(props.id);

  const onAllClickHandler = () => props.changeFilter("all", props.id);
  const onActiveClickHandler = () => props.changeFilter("active", props.id);
  const onCompletedClickHandler = () =>
    props.changeFilter("completed", props.id);

  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };
  const onChangeTodolistTitle = (title: string) => {
    props.changeTodolistTitle(props.id, title);
  };

  return (
    <div>
      <h3>
        {" "}
        <EditableSpan title={props.title} onChange={onChangeTodolistTitle} />
        <IconButton aria-label="delete" onClick={removeTodolist}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />
      <div>
        {props.tasks.map((t) => {
          const onClickHandler = () => props.removeTask(t.id, props.id);
          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            props.changeTaskStatus(t.id, newIsDoneValue, props.id);
          };
          const onChangeTaskHandler = (title: string) => {
            props.changeTask(props.id, t.id, title);
          };
          return (
            <div key={t.id} className={t.isDone ? "is-done" : ""}>
              <Checkbox
                onChange={onChangeStatusHandler}
                checked={t.isDone}
              />
              <EditableSpan title={t.title} onChange={onChangeTaskHandler} />
              <IconButton
                onClick={onClickHandler}
                aria-label="delete"
                size="small"
              >
                <Delete />
              </IconButton>
            </div>
          );
        })}
      </div>
      <div>
        <Button
          variant={props.filter === "all" ? "contained" : "text"}
          onClick={onAllClickHandler}
        >
          All
        </Button>
        <Button
          color="primary"
          variant={props.filter === "active" ? "contained" : "text"}
        //   className={props.filter === "active" ? "active-filter" : ""}
          onClick={onActiveClickHandler}
        >
          Active
        </Button>
        <Button
          color="secondary"
          variant={props.filter === "completed" ? "contained" : "text"}
        //   className={props.filter === "completed" ? "active-filter" : ""}
          onClick={onCompletedClickHandler}
        >
          Completed
        </Button>
      </div>
    </div>
  );
}
