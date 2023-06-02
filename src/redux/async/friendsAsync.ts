import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PropsGet } from "../../interfaces/get";

export const getAllContactsByUserId = createAsyncThunk(
  "getAllContactsByUserId",
  async ({ headers, id }: PropsGet, thunkApi) => {
    try {
      const { data } = await axios({
        method: "GET",
        url: import.meta.env.VITE_API_ENDPOINT + `/user/contact/${id}`,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${headers}`
        }
      });
      return data
    } catch (error: any) {
      throw thunkApi.rejectWithValue(error.message);
    }
  }
);
