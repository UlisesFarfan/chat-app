import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../../interfaces/Auth/authSlice.interface";
import {
  LoginAsync,
  LogoutAsync,
  getAuthUserAsync,
  RefreshAsync,
  SignupAsync
} from "../async/authAsync";

const initialState = {
  authUser: null,
  loading: false,
  logged: false,
  accessToken: null,
  error: false,
} as AuthState;

export const AuthSlice:any = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state: any, action: PayloadAction<any>) => {
      state.authUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    /* LOGIN */
    // 1st case, pending, change loading value to true
    builder.addCase(LoginAsync.pending, (state, action) => {
      state.loading = true;
    });
    // 2nd case - solved without errors, change my loading to false,
    // and change my status to user with the authenticated user's data
    builder.addCase(LoginAsync.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.logged = true;
      state.authUser = payload.user;
      state.accessToken = payload.access_token;
      state.error = false;
    });
    builder.addCase(SignupAsync.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.logged = true;
      state.authUser = payload.user;
      state.accessToken = payload.access_token;
      state.error = false;
    });
    builder.addCase(LoginAsync.rejected, (state, { payload }) => {
      state.error = payload as string;
      state.loading = false;
    });
    builder.addCase(SignupAsync.rejected, (state, { payload }) => {
      state.error = payload as string;
      state.loading = false;
    });
    /* LOGOUT */
    builder.addCase(LogoutAsync.fulfilled, (state, action) => {
      state.authUser = null;
      state.logged = false;
    });
    builder.addCase(getAuthUserAsync.pending, (state, action) => {
      state.loading = true;
      state.logged = false;
    });
    builder.addCase(getAuthUserAsync.fulfilled, (state, { payload }) => {
      state.authUser = payload.user;
      state.accessToken = payload.access_token;
      if (payload !== null) state.logged = true;
      state.loading = false;
    });
    builder.addCase(getAuthUserAsync.rejected, (state, action) => {
      state.logged = false;
      state.loading = false;
    });
    builder.addCase(RefreshAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(RefreshAsync.fulfilled, (state, { payload }) => {
      state.accessToken = payload.access_token;
      state.logged = true;
      state.authUser = payload.user;
      state.loading = false;
    });
    builder.addCase(RefreshAsync.rejected, (state, { payload }) => {
      state.accessToken = null;
      state.authUser = null;
      state.logged = false;
      state.loading = false;
    });
  },
});
export const { setAuthUser } = AuthSlice.actions;
export default AuthSlice.reducer;
