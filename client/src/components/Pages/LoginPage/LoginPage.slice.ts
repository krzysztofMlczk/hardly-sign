import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { requestAuthCode, validateAuthCode } from "../../../services/api";
import { store, RootState } from "../../../state/store";
import { setUserByToken } from "../../App/App.slice";
import { toast } from "react-toastify";

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
  async (code: string) => {
    const result = await validateAuthCode(code);
    const tokens = {
      token: result.access,
      refreshToken: result.refresh,
    };
    store.dispatch(setUserByToken(tokens));
    return result;
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
        toast.info("Provide code from SMS");
        // Save first token
        state.authCodeToken = action.payload.access;
        state.isSubmitting = false;
        state.step = "pin";
      })
      .addCase(requestAuthorizationCode.rejected, (state) => {
        // TODO: code for error case
        toast.error("Invalid credentials");
        state.isSubmitting = false;
      })
      .addCase(validateAuthorizationCode.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(validateAuthorizationCode.fulfilled, (state) => {
        toast.success("Successfully verified");
        state.isSubmitting = false;
        state.step = "email"; // reset the form so the email field shows as first when we logout
      })
      .addCase(validateAuthorizationCode.rejected, (state) => {
        // TODO: code for wrong auth code case
        toast.error("Invalid authorization code");
        state.step = "email";
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
