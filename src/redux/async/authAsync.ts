import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UserLogin } from "../../interfaces/Auth/async.interface";
import { UserSignup } from "../../interfaces/Auth/authSlice.interface";
import { PropsGet } from "../../interfaces/get";

export const LoginAsync = createAsyncThunk(
  "auth/login",
  async (user: UserLogin, thunkApi) => {
    try {
      // Prepare data to send
      const dataSend = {
        ...user,
        grant_type: "password",
      };

      // Send request to login
      const { data } = await axios({
        method: "POST",
        url: import.meta.env.VITE_API_ENDPOINT + "/auth/login",
        headers: {
          Accept: "application/json",
        },
        data: dataSend,
      });

      const { refresh_token } = data;

      // Save refresh token in local storage
      localStorage.setItem("refresh_token", refresh_token);

      // Return data
      return data;
    } catch (error: any) {
      // If error, return error message
      throw thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);

export const SignupAsync = createAsyncThunk(
  "auth/signup",
  async (form: UserSignup, thunkApi) => {
    try {
      const { data } = await axios({
        method: "POST",
        url: import.meta.env.VITE_API_ENDPOINT + "/user",
        headers: {
          Accept: "application/json",
        },
        data: form,
      });

      // Prepare data to send
      const dataSend = {
        ...{ username: data.message.email, password: data.message.password },
        grant_type: "password",
      };

      // Send request to login
      const res = await axios({
        method: "POST",
        url: import.meta.env.VITE_API_ENDPOINT + "/auth/login",
        headers: {
          Accept: "application/json",
        },
        data: dataSend,
      });

      const { refresh_token } = res.data;

      // Save refresh token in local storage
      localStorage.setItem("refresh_token", refresh_token);

      // Return data
      return res.data;
    } catch (error: any) {
      // If error, return error message
      throw thunkApi.rejectWithValue(error.message);
    }
  }
);

export const LogoutAsync = createAsyncThunk("auth/logout", async () => {
  const response = await axios.post("/auth/logout");
  // Remove refresh token from local storage
  localStorage.removeItem("refresh_token");

  return response;
});

export const RefreshAsync = createAsyncThunk("auth/refresh", async () => {
  try {
    console.log("refresh")
    const { data } = await axios.post("/auth/token/refresh", {
      refresh_token: localStorage.getItem("refresh_token") || "none",
      grant_type: "refresh_token",
    });
    return data;
  } catch (error: any) {
    localStorage.removeItem("refresh_token");
    throw error;
  }
});

export const getAuthUserAsync = createAsyncThunk(
  "auth/user",
  async (headers: string) => {
    try {
      const { data } = await axios.get("/auth/user", {
        headers: {
          Authorization: `Bearer ${headers}`,
        },
      });
      return data;
    } catch (error: any) {
      throw error;
    }
  }
);

export const upDateInfo = createAsyncThunk(
  "upDateInfo",
  async ({ token, body }: PropsGet, thunkApi) => {
    try {
      const { data } = await axios({
        method: "POST",
        url: import.meta.env.VITE_API_ENDPOINT + "/user/update-info/",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        },
        data: body
      });
      return data;
    } catch (error: any) {
      throw thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteMyAccount = createAsyncThunk(
  "deleteMyAccount",
  async ({ token, userId, email }: PropsGet, thunkApi) => {
    try {
      const { data } = await axios({
        method: "DELETE",
        url: import.meta.env.VITE_API_ENDPOINT + `/user/delete-user/${userId}?email=${email}`,
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