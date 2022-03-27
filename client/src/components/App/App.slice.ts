import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../state/store";

export interface AppState {
  isDrawerOpen: boolean;
}

const initialState: AppState = {
  isDrawerOpen: false,
};

export const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

// ACTION CREATORS are generated for each case reducer function
export const { toggleDrawer } = AppSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// Object containing all selectors
export const select = {
  isDrawerOpen: ({ app }: RootState) => app.isDrawerOpen,
};

export default AppSlice.reducer;
