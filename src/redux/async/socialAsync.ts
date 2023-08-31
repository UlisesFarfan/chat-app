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
        url: import.meta.env.VITE_API_ENDPOINT + `/chat/chats/${id}`,
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
  async ({ token, id, userName, signal, typeChat }: PropsGet, thunkApi) => {
    try {
      const { data } = await axios({
        method: "GET",
        url: import.meta.env.VITE_API_ENDPOINT + `/chat/search-chat/${id}?userName=${userName}&type=${typeChat}`,
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

export const putArchiveUserChat = createAsyncThunk(
  "putArchiveUserChat",
  async ({ token, userId, chatId, action }: PropsGet, thunkApi) => {
    try {
      const { data } = await axios({
        method: "PUT",
        url: import.meta.env.VITE_API_ENDPOINT + `/chat/arichive?userId=${userId}&chatId=${chatId}&action=${action}`,
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

export const deleteArchiveUserChat = createAsyncThunk(
  "deleteArchiveUserChat",
  async ({ token, userId, chatId }: PropsGet, thunkApi) => {
    try {
      const { data } = await axios({
        method: "DELETE",
        url: import.meta.env.VITE_API_ENDPOINT + `/chat/delete-user-archive-chat?userId=${userId}&chatId=${chatId}`,
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

export const deleteUserChat = createAsyncThunk(
  "deleteUserChat",
  async ({ token, userId, chatId }: PropsGet, thunkApi) => {
    try {
      const { data } = await axios({
        method: "DELETE",
        url: import.meta.env.VITE_API_ENDPOINT + `/chat/delete-user-chat?userId=${userId}&chatId=${chatId}`,
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

export const getContactBlocked = createAsyncThunk(
  "getContactBlocked",
  async ({ token, userId }: PropsGet, thunkApi) => {
    try {
      const { data } = await axios({
        method: "GET",
        url: import.meta.env.VITE_API_ENDPOINT + `/user/block-users/${userId}`,
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

export const putBlockUser = createAsyncThunk(
  "putBlockUser",
  async ({ token, userId, otherUser, action }: PropsGet, thunkApi) => {
    try {
      const { data } = await axios({
        method: "PUT",
        url: import.meta.env.VITE_API_ENDPOINT + `/user/block-user?id=${userId}&otherUser=${otherUser}&action=${action}`,
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

export const addUserContact = createAsyncThunk(
  "addUserContact",
  async ({ token, body }: PropsGet, thunkApi) => {
    try {
      const { data } = await axios({
        method: "POST",
        url: import.meta.env.VITE_API_ENDPOINT + `/user/add`,
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

export const deleteUserContact = createAsyncThunk(
  "deleteUserContact",
  async ({ token, userId, otherUser }: PropsGet, thunkApi) => {
    try {
      const { data } = await axios({
        method: "DELETE",
        url: import.meta.env.VITE_API_ENDPOINT + `/user/delete-contact?id=${userId}&otherUser=${otherUser}`,
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