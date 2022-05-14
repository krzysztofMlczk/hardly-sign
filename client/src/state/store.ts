import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import appReducer from "../components/App/App.slice";
import loginPageReducer from "../components/Pages/LoginPage/LoginPage.slice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    loginPage: loginPageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
