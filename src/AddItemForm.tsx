import {IconButton, TextField } from "@material-ui/core";
import { ControlPoint } from "@material-ui/icons";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};
export const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {
  let [title, setTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.charCode === 13) {
      addItem();
    }
  };
  const addItem = () => {
    let newTitle = title.trim();
    if (newTitle !== "") {
      props.addItem(newTitle);
      setTitle("");
    } else {
      setError("Title is required");
    }
  };

  return (
    <div>
      <TextField
        variant={"outlined"}
        label={"type value"}
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        error={!!error}
        helperText={error}
        // className={error ? "error" : ""}
      />
      <IconButton  onClick={addItem} color="primary">
          <ControlPoint />
      </IconButton>
    </div>
  );
};
