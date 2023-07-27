import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PropsGet } from "../../interfaces/get";

export const getAllContactsByUserId = createAsyncThunk(
  "getAllContactsByUserId",
  async ({ token, id }: PropsGet, thunkApi) => {
    try {
      const { data } = await axios({
        method: "GET",
        url: import.meta.env.VITE_API_ENDPOINT + `/user/contact/${id}`,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      return data
    } catch (error: any) {
      throw thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getSearchContactByName = createAsyncThunk(
  "getSearchContactByName",
  async ({ token, id, userName, signal }: PropsGet, thunkApi) => {
    try {
      const { data } = await axios({
        method: "GET",
        url: import.meta.env.VITE_API_ENDPOINT + `/user/search-contact/${id}?userName=${userName}`,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        },
        signal: signal
      });
      return data
    } catch (error: any) {
      throw thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getKpisUsers = createAsyncThunk(
  "getKpisUsers",
  async ({ token, id }: PropsGet, thunkApi) => {
    try {
      const { data } = await axios({
        method: "GET",
        url: import.meta.env.VITE_API_ENDPOINT + `/user/kpis/${id}`,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      return data
    } catch (error: any) {
      throw thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getKpisUsersOnline = createAsyncThunk(
  "getKpisUsersOnline",
  async (data: Object, thunkApi) => {
    try {
      return data
    } catch (error: any) {
      throw thunkApi.rejectWithValue(error.message);
    }
  }
);