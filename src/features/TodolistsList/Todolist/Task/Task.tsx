import React, { ChangeEvent, useCallback } from 'react';

import { Delete } from '@mui/icons-material';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';

import { TaskStatuses, TaskType } from '../../../../api/todolists-api';
import { EditableSpan } from '../../../../components/EditableSpan/EditableSpan';

export type TaskPropsType = {
  task: TaskType;
  todolistId: string;
  changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void;
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void;
  removeTask: (taskId: string, todolistId: string) => void;
};
export const Task = React.memo((props: TaskPropsType) => {
  const onClickHandler = useCallback(
    () => props.removeTask(props.task.id, props.todolistId),
    [props],
  );

  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newIsDoneValue = e.currentTarget.checked;

      props.changeTaskStatus(
        props.task.id,
        newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New,
        props.todolistId,
      );
    },
    [props],
  );

  const onTitleChangeHandler = useCallback(
    (newValue: string) => {
      props.changeTaskTitle(props.task.id, newValue, props.todolistId);
    },
    [props],
  );

  return (
    <div
      key={props.task.id}
      className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}
      style={{ display: 'flex', alignItems: 'center' }}
    >
      <Checkbox
        checked={props.task.status === TaskStatuses.Completed}
        color="primary"
        onChange={onChangeHandler}
        size="small"
      />

      <EditableSpan value={props.task.title} onChange={onTitleChangeHandler} />
      <IconButton onClick={onClickHandler} size="small">
        <Delete fontSize="small" />
      </IconButton>
    </div>
  );
});
