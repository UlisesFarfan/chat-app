import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { clearUserChat, getAllChatsByUserId, getChatsById, postMessage, resiveAMessage } from "../async/chatsAsync";

interface HistorySliceState {
  chats: any;
  currentChat: Array<Object> | null;
}

const initialState: HistorySliceState = {
  chats: null,
  currentChat: null,
};

export const historySlice = createSlice({
  name: "chats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getAllChatsByUserId.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        state.chats = action.payload
      }
    );
    builder.addCase(
      clearUserChat.fulfilled,
      (state: HistorySliceState, action: PayloadAction<any>) => {
        state.currentChat = null
      }
    );
    builder.addCase(
      getChatsById.fulfilled,
      (state: HistorySliceState, action: PayloadAction<any>) => {
        state.currentChat = action.payload
        let array = [...state.chats]
        for (let i = 0; i < array.length; i++) {
          if (array[i]._id === action.payload._id) {
            array[i].messageToView = false
          }
        }
        state.chats = array
      }
    );
    builder.addCase(
      postMessage.fulfilled,
      (state: HistorySliceState, action: PayloadAction<any>) => {
        let addMessage: any = state.currentChat!
        addMessage.messagesId?.push(action.payload.message)
        state.currentChat = addMessage
      }
    );
    builder.addCase(
      resiveAMessage.fulfilled,
      (state: HistorySliceState, action: PayloadAction<any>) => {
        let addMessage: any = state.currentChat!
        addMessage.messagesId?.push(action.payload)
        state.currentChat = addMessage
      }
    );
  },
});

export default historySlice.reducer;
