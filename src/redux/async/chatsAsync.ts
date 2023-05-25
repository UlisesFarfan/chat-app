import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PropsGet, PropsMessage, PropsPostMessage } from "../../interfaces/Chat/chat.interface";

export const getAllChatsByUserId = createAsyncThunk(
  "getAllChatsByUserId",
  async ({ headers, id }: PropsGet, thunkApi) => {
    try {
      const { data } = await axios({
        method: "GET",
        url: import.meta.env.VITE_API_ENDPOINT + `/chat/user/${id}`,
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

export const getChatsById = createAsyncThunk(
  "getChatsById",
  async ({ headers, id }: PropsGet, thunkApi) => {
    try {
      const { data } = await axios({
        method: "GET",
        url: import.meta.env.VITE_API_ENDPOINT + `/chat/${id}`,
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

export const postMessage = createAsyncThunk(
  "postMessage",
  async ({ headers, body }: PropsPostMessage, thunkApi) => {
    try {
      const { data } = await axios({
        method: "POST",
        url: import.meta.env.VITE_API_ENDPOINT + "/message",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${headers}`
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
  async (message: PropsMessage, thunkApi) => {
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