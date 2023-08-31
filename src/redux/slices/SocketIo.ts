import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
import { UpdateUsersConects, logoutSocket } from "../async/socketAsync";

interface SocketSliceState {
  socketIo: any;
  isConnected: boolean;
}

const initialState: SocketSliceState = {
  socketIo: io(import.meta.env.VITE_SOCKET_ENDPOINT),
  isConnected: false,
};

export const socketIo: any = createSlice({
  name: "socket",
  initialState,
  reducers: {
    handleConnected: (state) => {
      state.isConnected = true
    }
  },
  extraReducers: (builder) => {
  },
});

export const { handleConnected } = socketIo.actions;

export default socketIo.reducer;