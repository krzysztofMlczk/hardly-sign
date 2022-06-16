import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import appReducer from "../components/App/App.slice";
import loginPageReducer from "../components/Pages/LoginPage/LoginPage.slice";
import uploadSliceReducer from "../components/Uploader/Upload.slice";

import { saveState, loadState } from "./localStorage";

export const store = configureStore({
  reducer: {
    app: appReducer,
    loginPage: loginPageReducer,
    upload: uploadSliceReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => saveState(store.getState()));

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
