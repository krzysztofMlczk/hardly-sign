import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../state/store";
import { signFilesApi, verifyFilesApi } from "../../services/api";

export interface UploadState {
  signedFiles: Array<any>;
  verifiedFiles: Array<any>;
  ownerValue: string;
}

const initialState: UploadState = {
  signedFiles: [],
  verifiedFiles: [],
  ownerValue: "",
};

export const signFiles = createAsyncThunk(
  "upload/singFiles",
  async (formData: FormData) => {
    const res = await signFilesApi(formData);
    return res;
  }
);

export const verifyFiles = createAsyncThunk(
  "upload/verifyFiles",
  async (data: { formData: FormData; ownerValue: string }) => {
    const res = await verifyFilesApi(data);
    return res;
  }
);

export const UploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    setOwnerValue: (state, { payload: ownerValue }: PayloadAction<string>) => {
      state.ownerValue = ownerValue;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signFiles.fulfilled, (state, action) => {
        state.signedFiles.push(action.payload);
      })
      .addCase(verifyFiles.fulfilled, (state, action) => {
        state.verifiedFiles.push(action.payload);
      });
  },
});

export const { setOwnerValue } = UploadSlice.actions;

export const select = {
  ownerValue: ({ upload }: RootState) => upload.ownerValue,
  signedFiles: ({ upload }: RootState) => upload.signedFiles,
  verifiedFiles: ({ upload }: RootState) => upload.verifiedFiles,
};

export default UploadSlice.reducer;