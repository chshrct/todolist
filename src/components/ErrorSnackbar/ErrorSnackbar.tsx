import React, { FC } from 'react';

import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useSelector } from 'react-redux';

import { setAppErrorAC } from '../../app/app-reducer';
import { AppRootStateType, useAppDispatch } from '../../app/store';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorSnackbar: FC = () => {
  const error = useSelector<AppRootStateType, string | null>(state => state.app.error);

  const dispatch = useAppDispatch();

  const handleClose = (event?: Event | React.SyntheticEvent, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setAppErrorAC({ error: null }));
  };

  return (
    <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  );
};
