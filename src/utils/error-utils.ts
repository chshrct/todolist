import { Dispatch } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { ResponseType } from '../api/todolists-api';
import { setAppErrorAC, setAppStatusAC } from '../app/app-reducer';

export const handleServerAppError = <D>(
  data: ResponseType<D>,
  dispatch: Dispatch,
): void => {
  if (data.messages.length) {
    dispatch(setAppErrorAC({ error: data.messages[0] }));
  } else {
    dispatch(setAppErrorAC({ error: 'Some error occurred' }));
  }
  dispatch(setAppStatusAC({ status: 'failed' }));
};

export const handleServerNetworkError = (error: AxiosError, dispatch: Dispatch): void => {
  dispatch(
    setAppErrorAC({
      error: error.message ? error.message : 'Some error occurred',
    }),
  );
  dispatch(setAppStatusAC({ status: 'failed' }));
};
