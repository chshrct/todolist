import { Checkbox, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React, { ChangeEvent, FC, useCallback } from "react";
import { EditableSpan } from "./EditableSpan";

type PropsType = {
  todolistId: string;
  taskId: string;
  isDone: boolean;
  title: string;
  removeTask: (taskId: string, todolistId: string) => void;
  changeTaskStatus: (
    taskId: string,
    isDone: boolean,
    todolistId: string
  ) => void;
  changeTaskTitle: (
    taskId: string,
    newValue: string,
    todolistId: string
  ) => void;
};

const Task: FC<PropsType> = (props) => {
  const {
    todolistId,
    taskId,
    isDone,
    title,
    removeTask,
    changeTaskStatus,
    changeTaskTitle,
  } = props;

  const onClickHandler = useCallback(
    () => removeTask(taskId, todolistId),
    [removeTask, taskId, todolistId]
  );
  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let newIsDoneValue = e.currentTarget.checked;
      changeTaskStatus(taskId, newIsDoneValue, todolistId);
    },
    [changeTaskStatus, taskId, todolistId]
  );
  const onTitleChangeHandler = useCallback(
    (newValue: string) => {
      changeTaskTitle(taskId, newValue, todolistId);
    },
    [changeTaskTitle, taskId, todolistId]
  );

  return (
    <div className={isDone ? "is-done" : ""}>
      <Checkbox checked={isDone} color="primary" onChange={onChangeHandler} />

      <EditableSpan value={title} onChange={onTitleChangeHandler} />
      <IconButton onClick={onClickHandler}>
        <Delete />
      </IconButton>
    </div>
  );
};

export default Task;
