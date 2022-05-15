import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import {
  DashboardPage,
  SettingsPage,
  LoginPage,
  RegisterPage,
  LandingPage,
} from "../Pages/pages";

import { GuestOnlyRoute, UserOnlyRoute } from "../Routes/Routes";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/about" element={<LandingPage />} />
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
    </>
  );
};

export default App;
