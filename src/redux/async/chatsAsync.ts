import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllChatsByUserId = createAsyncThunk(
  "getAllChatsByUserId",
  async (userId: string, thunkApi) => {
    try {
      const { data } = await axios({
        method: "GET",
        url: import.meta.env.VITE_API_ENDPOINT + `/chat/user/${userId}`,
        headers: {
          Accept: "application/json",
        }
      });
      return data
    } catch (error: any) {
      throw thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getChatsById = createAsyncThunk(
  "getChatsById",
  async (chatId: string, thunkApi) => {
    try {
      const { data } = await axios({
        method: "GET",
        url: import.meta.env.VITE_API_ENDPOINT + `/chat/${chatId}`,
        headers: {
          Accept: "application/json",
        }
      });
      return data
    } catch (error: any) {
      throw thunkApi.rejectWithValue(error.message);
    }
  }
);

export const postMessage = createAsyncThunk(
  "postMessage",
  async (body: any, thunkApi) => {
    try {
      const { data } = await axios({
        method: "POST",
        url: import.meta.env.VITE_API_ENDPOINT + "/message",
        headers: {
          Accept: "application/json",
        },
        data: body
      });
      return data
    } catch (error: any) {
      throw thunkApi.rejectWithValue(error.message);
    }
  }
);

export const resiveAMessage = createAsyncThunk(
  "resiveAMessage",
  async (message: any, thunkApi) => {
    try {
      return message
    } catch (error: any) {
      throw thunkApi.rejectWithValue(error.message);
    }
  }
);

export const clearUserChat = createAsyncThunk(
  "clearUserChat",
  async () => {
    try {
      return
    } catch (e) {
    }
  }
);