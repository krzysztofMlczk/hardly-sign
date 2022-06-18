import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../state/store";
import {
  getFilesHistory,
  IFile,
  signFilesApi,
  verifyFilesApi,
} from "../../services/api";
import { toast } from "react-toastify";

export interface UploadState {
  ownerValue: string;
  filesHistory: Array<IFile>;
}

const initialState: UploadState = {
  ownerValue: "",
  filesHistory: [],
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
  async (data: FormData) => {
    return await verifyFilesApi(data);
  }
);

export const downloadFileHistory = createAsyncThunk(
  "upload/downloadFileHistory",
  async () => {
    return await getFilesHistory();
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
      .addCase(verifyFiles.fulfilled, (state, action) => {
        state.ownerValue = "";
        toast.success("Successfully verified!");
      })
      .addCase(verifyFiles.rejected, (state, action) => {
        state.ownerValue = "";
        toast.error("Verification failed!");
      })
      .addCase(downloadFileHistory.fulfilled, (state, action) => {
        state.filesHistory = action.payload;
      });
  },
});

export const { setOwnerValue } = UploadSlice.actions;

export const select = {
  ownerValue: ({ upload }: RootState) => upload.ownerValue,
  filesHistory: ({ upload }: RootState) => upload.filesHistory,
};

export default UploadSlice.reducer;
