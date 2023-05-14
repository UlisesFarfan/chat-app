import { createAsyncThunk } from "@reduxjs/toolkit";

export const UpdateUsersConects = createAsyncThunk(
  "UpdateSocketUsers",
  (usersConect: Array<Object>, thunkApi) => {
    try {
      return usersConect;
    } catch (error: any) {
      throw thunkApi.rejectWithValue(error.message);
    }
  }
);
export const logoutSocket = createAsyncThunk(
  "logout",
  async (userId: any, thunkApi) => {
    try {
      return userId;
    } catch (error: any) {
      throw thunkApi.rejectWithValue(error.message);
    }
  }
);