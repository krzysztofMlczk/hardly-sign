import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { requestAuthCode, validateAuthCode } from "../../../services/api";
import { store, RootState } from "../../../state/store";
import { setUser } from "../../App/App.slice";
import { LoginPage } from "./LoginPage";

export interface LoginPageState {
  authCodeToken: string | null;
  step: "email" | "pin";
  isSubmitting: boolean;
}

const initialState: LoginPageState = {
  authCodeToken: null,
  step: "email",
  isSubmitting: false,
};

export const requestAuthorizationCode = createAsyncThunk(
  "loginPage/requestAuthCode",
  async (credentials: { email: string; password: string }) => {
    return await requestAuthCode(credentials);
  }
);

export const validateAuthorizationCode = createAsyncThunk(
  "loginPage/validateAuthCode",
  async () => {
    // try {
    const token = store.getState().loginPage.authCodeToken as string;
    // TODO: validateAuthCode should return user object with image
    return await validateAuthCode(token);
    // const user = await validateAuthCode(LoginPage);
    // store.dispatch(setUser(user));
    // } catch (err) {
    //   console.log(err);
    // }
  }
);

export const LoginPageSlice = createSlice({
  name: "loginPage",
  initialState,
  reducers: {
    resetSteps: (state) => {
      state.step = "email";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestAuthorizationCode.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(requestAuthorizationCode.fulfilled, (state, action) => {
        // Save first token
        state.authCodeToken = action.payload.access;
        state.isSubmitting = false;
        state.step = "pin";
      })
      .addCase(requestAuthorizationCode.rejected, (state) => {
        // TODO: code for error case
        state.isSubmitting = false;
      })
      .addCase(validateAuthorizationCode.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(validateAuthorizationCode.fulfilled, (state) => {
        state.isSubmitting = false;
        state.step = "email"; // reset the form so the email field shows as first when we logout
      })
      .addCase(validateAuthorizationCode.rejected, (state) => {
        // TODO: code for wrong auth code case
        state.isSubmitting = false;
      });
  },
});

// export action creators
export const { resetSteps } = LoginPageSlice.actions;

export const select = {
  step: ({ loginPage }: RootState) => loginPage.step,
  isSubmitting: ({ loginPage }: RootState) => loginPage.isSubmitting,
  authCodeToken: ({ loginPage }: RootState) => loginPage.authCodeToken,
};

export default LoginPageSlice.reducer;
