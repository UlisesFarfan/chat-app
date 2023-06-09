import { combineReducers } from "@reduxjs/toolkit";
import AuthSlice from "../slices/AuthenticationSlice";
import HistorySlice from "../slices/HistorySlice";
import SocketIo from "../slices/SocketIo";
import Chat from "../slices/ChatsSlice"
import FriendsSlice from "../slices/FriendsSlice";

export type StateGlobalType = {
};

const rootReducer = combineReducers({
  // Add the generated reducer as a specific top-level slice
  auth: AuthSlice,
  history: HistorySlice,
  socket: SocketIo,
  chat: Chat,
  social: FriendsSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
