import React, { FC, useEffect } from 'react';

import { CircularProgress } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import Toolbar from '@mui/material/Toolbar';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar';
import { logout } from '../features/Login/auth-reducer';
import { Login } from '../features/Login/Login';
import { TodolistsList } from '../features/TodolistsList/TodolistsList';

import { initializeApp, RequestStatusType } from './app-reducer';
import './App.css';
import { AppRootStateType, useAppDispatch } from './store';

type PropsType = {
  demo?: boolean;
};

const App: FC<PropsType> = ({ demo = false }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!demo) {
      dispatch(initializeApp());
    }
  }, [demo, dispatch]);
  const status = useSelector<AppRootStateType, RequestStatusType>(
    state => state.app.status,
  );
  const isInitialized = useSelector<AppRootStateType, boolean>(
    state => state.app.isInitialized,
  );
  const isLoggedIn = useSelector<AppRootStateType, boolean>(
    state => state.auth.isLoggedIn,
  );

  if (!isInitialized) {
    return (
      <div
        style={{
          position: 'fixed',
          top: '30%',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  const logoutHandler = (): void => {
    dispatch(logout());
  };

  return (
    <BrowserRouter>
      <div className="App">
        <ErrorSnackbar />
        <AppBar position="static">
          <Toolbar>
            {/* <IconButton edge="start" color="inherit" aria-label="menu">
              <Menu />
            </IconButton> */}
            {/* <Typography variant="h6">News</Typography> */}
            {isLoggedIn && (
              <Button color="inherit" onClick={logoutHandler}>
                Log out
              </Button>
            )}
          </Toolbar>
          {status === 'loading' && <LinearProgress />}
        </AppBar>
        <Container fixed>
          <Routes>
            <Route path="*" element={<Navigate to={demo ? 'login' : '404'} />} />
            <Route path="404" element={<h1>404: PAGE NOT FOUND</h1>} />
            <Route path="/" element={<TodolistsList demo={demo} />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  );
};

export default App;
