import { createAsyncThunk } from "@reduxjs/toolkit";

export const setRootLocation = createAsyncThunk(
  "set-root-location",
  async (rootLocation: any, thunkApi) => {
    try {
      return rootLocation;
    } catch (error: any) {
      throw thunkApi.rejectWithValue(error.message);
    }
  }
);
