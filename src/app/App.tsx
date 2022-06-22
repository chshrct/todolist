import React, { useEffect } from "react";
import "./App.css";
import { TodolistsList } from "../features/TodolistsList/TodolistsList";
import { useSelector } from "react-redux";
import { AppRootStateType, useAppDispatch } from "./store";
import { RequestStatusType } from "./app-reducer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import LinearProgress from "@mui/material/LinearProgress";
import { Menu } from "@mui/icons-material";
import { ErrorSnackbar } from "../components/ErrorSnackbar/ErrorSnackbar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../features/Login/Login";
import { initializeAppTC, logoutTC } from "../features/Login/auth-reducer";
import { CircularProgress } from "@mui/material";

type PropsType = {
  demo?: boolean;
};

function App({ demo = false }: PropsType) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!demo) {
      dispatch(initializeAppTC());
    }
  }, [dispatch]);
  const status = useSelector<AppRootStateType, RequestStatusType>(
    (state) => state.app.status
  );
  const isInitialized = useSelector<AppRootStateType, boolean>(
    (state) => state.auth.isInitialized
  );
  const isLoggedIn = useSelector<AppRootStateType, boolean>(
    (state) => state.auth.isLoggedIn
  );
  if (!isInitialized) {
    return (
      <div
        style={{
          position: "fixed",
          top: "30%",
          textAlign: "center",
          width: "100%",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  const logoutHandler = () => dispatch(logoutTC());

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
          {status === "loading" && <LinearProgress />}
        </AppBar>
        <Container fixed>
          <Routes>
            <Route
              path="*"
              element={<Navigate to={demo ? "login" : "404"} />}
            />
            <Route path="404" element={<h1>404: PAGE NOT FOUND</h1>} />
            <Route path="/" element={<TodolistsList demo={demo} />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
