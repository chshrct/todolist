import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { AppRootStateType, useAppDispatch } from "../../app/store";
import { useSelector } from "react-redux";
import { setAppErrorAC } from "../../app/app-reducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackbar() {
  const dispatch = useAppDispatch();
  const error = useSelector<AppRootStateType, string | null>(
    (state) => state.app.error
  );

  const handleClose = (
  ) => {
    dispatch(setAppErrorAC(null));
  };

  return (
    <Snackbar
      open={error !== null}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        {error}
      </Alert>
    </Snackbar>
  );
}
