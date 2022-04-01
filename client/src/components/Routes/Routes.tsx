import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "../../state/hooks";
import { select } from "../App/App.slice";

type RouteProps = {
  redirectPath?: string;
};

export const UserOnlyRoute = ({ redirectPath = "/login" }: RouteProps) => {
  const isUserLoggedIn: boolean = !!useAppSelector(select.user);
  return isUserLoggedIn ? <Outlet /> : <Navigate to={redirectPath} replace />;
};

export const GuestOnlyRoute = ({ redirectPath = "/" }: RouteProps) => {
  const isUserLoggedIn: boolean = !!useAppSelector(select.user);
  return isUserLoggedIn ? <Navigate to={redirectPath} /> : <Outlet />;
};
