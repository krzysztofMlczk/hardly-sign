import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { requestAuthCode, validateAuthCode } from "../../../services/api";
import { store, RootState } from "../../../state/store";
import { setUser } from "../../App/App.slice";

export interface LoginPageState {
  step: "email" | "pin";
  isSubmitting: boolean;
}

const initialState: LoginPageState = {
  step: "email",
  isSubmitting: false,
};

export const requestAuthorizationCode = createAsyncThunk(
  "loginPage/requestAuthCode",
  async () => {
    return await requestAuthCode();
  }
);

export const validateAuthorizationCode = createAsyncThunk(
  "loginPage/validateAuthCode",
  async () => {
    try {
      const user = await validateAuthCode();
      store.dispatch(setUser(user));
    } catch (err) {
      console.log(err);
    }
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
      .addCase(requestAuthorizationCode.fulfilled, (state) => {
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
};

export default LoginPageSlice.reducer;
