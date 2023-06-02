import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { getAllChatsByUserId, getChatsById, postMessage, resiveAMessage } from "../async/chatsAsync";

interface ChatSliceState {
  chats: any;
  currentChat: Array<Object> | null;
}

const initialState: ChatSliceState = {
  chats: null,
  currentChat: null,
};

export const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    clearCurrentChat(state) {
      state.currentChat = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllChatsByUserId.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        state.chats = action.payload
      }
    );
    builder.addCase(getChatsById.fulfilled,
      (state: ChatSliceState, action: PayloadAction<any>) => {
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
    builder.addCase(postMessage.fulfilled,
      (state: ChatSliceState, action: PayloadAction<any>) => {
        let addMessage: any = state.currentChat!
        addMessage.messagesId?.push(action.payload.message)
        state.currentChat = addMessage
      }
    );
    builder.addCase(resiveAMessage.fulfilled,
      (state: ChatSliceState, action: PayloadAction<any>) => {
        let addMessage: any = state.currentChat!
        if (addMessage._id === action.payload.chatId) addMessage.messagesId?.push(action.payload);
        state.currentChat = addMessage;
      }
    );
  },
});

export const { clearCurrentChat } = chatSlice.actions;

export default chatSlice.reducer;
