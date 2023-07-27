import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { deleteMessage, getAllChatsByUserId, getChatsById, getSearchChatByName, getSearchChatByUsersName, postMessage, postNewChat, resiveAMessage } from "../async/chatsAsync";
import { BubbleSort } from "../../utils/utils";
interface ChatSliceState {
  chats: any;
  currentChat: Array<Object> | null;
}

const initialState: ChatSliceState = {
  chats: null,
  currentChat: null,
};

export const chatSlice: any = createSlice({
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
        state.chats = BubbleSort(action.payload)
      }
    );
    builder.addCase(getChatsById.fulfilled,
      (state: ChatSliceState, action: PayloadAction<any>) => {
        state.currentChat = action.payload
        // let array = [...state.chats]
        // for (let i = 0; i < array.length; i++) {
        //   if (array[i]._id === action.payload._id) {
        //     array[i].messageToView = false
        //   }
        // }
        // state.chats = array
      }
    );
    builder.addCase(postMessage.fulfilled,
      (state: ChatSliceState, action: PayloadAction<any>) => {
        let addMessage: any = state.currentChat!
        let chats: any = state.chats!
        addMessage.messagesId?.push(action.payload.message)
        if (chats) {
          for (let i = 0; i < chats.length; i++) {
            if (chats[i]._id === action.payload.message.chatId) {
              chats[i].lastMessage = action.payload.message
            }
          }
        }
        state.chats = BubbleSort(chats)
        state.currentChat = addMessage
      }
    );
    builder.addCase(getSearchChatByName.fulfilled,
      (state: ChatSliceState, action: PayloadAction<any>) => {
        state.chats = action.payload
      }
    );
    builder.addCase(getSearchChatByUsersName.fulfilled,
      (state: ChatSliceState, action: PayloadAction<any>) => {
        //state.chats.push(action.payload)
        state.currentChat = action.payload
      }
    );
    builder.addCase(resiveAMessage.fulfilled,
      (state: ChatSliceState, action: PayloadAction<any>) => {
        let addMessage: any = state.currentChat!
        let chats: any = state.chats!
        if (addMessage && addMessage._id === action.payload.chatId) addMessage.messagesId?.push(action.payload);
        if (chats) {
          for (let i = 0; i < chats.length; i++) {
            if (chats[i]._id === action.payload.chatId) {
              chats[i].lastMessage = action.payload
            }
          }
        }
        state.chats = BubbleSort(chats)
        state.currentChat = addMessage;
      }
    );
    builder.addCase(postNewChat.fulfilled,
      (state: ChatSliceState, action: PayloadAction<any>) => {
        state.currentChat = action.payload;
      }
    );
    builder.addCase(deleteMessage.fulfilled,
      (state: ChatSliceState, action: PayloadAction<any>) => {

      }
    );
  },
});

export const { clearCurrentChat } = chatSlice.actions;

export default chatSlice.reducer;
