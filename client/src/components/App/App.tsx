import { useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import {
  DashboardPage,
  SettingsPage,
  LoginPage,
  RegisterPage,
} from "../Pages/pages";
import { LoadingScreen } from "../LoadingScreen/LoadingScreen";

import { GuestOnlyRoute, UserOnlyRoute } from "../Routes/Routes";

import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { setUserByToken, endLoad, select } from "./App.slice";

const App = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(select.loading);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Stop loading when no token
      dispatch(endLoad());
      return;
    }
    // TODO:
    // if there is a token then save it in axios defaults (HOW?)
    // axios.defaults.headers.Authorization = `Token ${token}`;
    dispatch(setUserByToken());
  }, []);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route element={<UserOnlyRoute />}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
            <Route element={<GuestOnlyRoute />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
