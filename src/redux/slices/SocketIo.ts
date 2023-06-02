import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
import { UpdateUsersConects, logoutSocket } from "../async/socketAsync";

interface SocketSliceState {
  socketIo: any;
  socketIoUsers: any;
  userChat: any;
}

const initialState: SocketSliceState = {
  socketIo: io(import.meta.env.VITE_SOCKET_ENDPOINT),
  socketIoUsers: null,
  userChat: null,
};

export const socketIo: any = createSlice({
  name: "socket",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(
    //   AddUserSocketIo.fulfilled,
    //   (state: any, action: PayloadAction<any>) => {
    //     state.socketIo.emit("addUser", action.payload);
    //   }
    // );
    // builder.addCase(
    //   GetUsersConects.fulfilled,
    //   (state: SocketSliceState, action: PayloadAction<any>) => {
    //     state.socketIo.emit("getAllUsersConect", action.payload)
    //   }
    // );
    builder.addCase(UpdateUsersConects.fulfilled,
      (state: SocketSliceState, action: PayloadAction<any>) => {
        state.socketIoUsers = action.payload
      }
    );
    builder.addCase(logoutSocket.fulfilled,
      (state: SocketSliceState, action: PayloadAction<any>) => {
        state.socketIo.emit("logout", action.payload)
      }
    );
  },
});

export default socketIo.reducer;

/**
 * import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
import { AddUserSocketIo, GetUsersConects, UpdateUsersConects } from "../async/socketAsync";

interface SocketSliceState {
  socketIo: any;
  socketIoUsers: any;
}

const initialState: SocketSliceState = {
  socketIo: io(import.meta.env.VITE_SOCKET_ENDPOINT),
  socketIoUsers: null
};

export const socketIo = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      AddUserSocketIo.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        state.socketIo.emit("addUser", action.payload);
      }
    );
    builder.addCase(
      GetUsersConects.fulfilled,
      (state: SocketSliceState, action: PayloadAction<any>) => {
        state.socketIo.emit("getAllUsersConect", action.payload)
      }
    );
    builder.addCase(
      UpdateUsersConects.fulfilled,
      (state: SocketSliceState, action: PayloadAction<any>) => {
        state.socketIoUsers =
      }
    )
  },
});

export default socketIo.reducer;

 */
