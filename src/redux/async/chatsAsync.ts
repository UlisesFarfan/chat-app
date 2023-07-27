import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PropsDeleteMessage, PropsMessage, PropsPostMessage } from "../../interfaces/Chat/chat.interface";
import { PropsGet } from "../../interfaces/get";

export const getAllChatsByUserId = createAsyncThunk(
  "getAllChatsByUserId",
  async ({ token, id }: PropsGet, thunkApi) => {
    try {
      const { data } = await axios({
        method: "GET",
        url: import.meta.env.VITE_API_ENDPOINT + `/chat/user/${id}`,
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

export const getChatsById = createAsyncThunk(
  "getChatsById",
  async ({ token, id }: PropsGet, thunkApi) => {
    try {
      const { data } = await axios({
        method: "GET",
        url: import.meta.env.VITE_API_ENDPOINT + `/chat/userid/${id}`,
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

export const getSearchChatByName = createAsyncThunk(
  "getSearchChatByName",
  async ({ token, id, userName, signal }: PropsGet, thunkApi) => {
    try {
      const { data } = await axios({
        method: "GET",
        url: import.meta.env.VITE_API_ENDPOINT + `/chat/search-chat/${id}?userName=${userName}`,
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

export const getSearchChatByUsersName = createAsyncThunk(
  "getSearchChatByUsersName",
  async ({ token, userId, secUserId }: PropsGet, thunkApi) => {
    try {
      const { data } = await axios({
        method: "GET",
        url: import.meta.env.VITE_API_ENDPOINT + `/chat/usersname?userId=${userId}&secUserId=${secUserId}`,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        },
      });
      return data;
    } catch (error: any) {
      throw thunkApi.rejectWithValue(error.message);
    }
  }
);

export const postNewChat = createAsyncThunk(
  "postNewChat",
  async ({ token, body }: any, thunkApi) => {
    try {
      const { data } = await axios({
        method: "POST",
        url: import.meta.env.VITE_API_ENDPOINT + "/chat",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        },
        data: body
      });
      return data
    } catch (error: any) {
      throw thunkApi.rejectWithValue(error.message);
    }
  }
);

export const postMessage = createAsyncThunk(
  "postMessage",
  async ({ token, body }: PropsPostMessage, thunkApi) => {
    try {
      const { data } = await axios({
        method: "POST",
        url: import.meta.env.VITE_API_ENDPOINT + "/message",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`
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

export const deleteMessage = createAsyncThunk(
  "deleteMessage",
  async ({ token, id }: PropsDeleteMessage, thunkApi) => {
    try {
      const { data } = await axios({
        method: "POST",
        url: import.meta.env.VITE_API_ENDPOINT + `/message/delete/${id}`,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        },
      });
      return data
    } catch (error: any) {
      throw thunkApi.rejectWithValue(error.message);
    }
  }
);