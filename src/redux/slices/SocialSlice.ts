import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  deleteMessage,
  getAllChatsByUserId,
  getChatsById,
  getSearchChatByName,
  getSearchChatByUsersName,
  postMessage,
  postNewChat,
  resiveAMessage,
  getAllContactsByUserId,
  getSearchContactByName,
  getContactBlocked,
  putBlockUser,
  addUserContact,
  deleteUserContact,
} from "../async/socialAsync";
import { BubbleSort } from "../../utils/utils";
interface SocialSliceState {
  chats: Array<Object> | null;
  currentChat: Array<Object> | null;
  friends: Array<object> | null;
  archive_chats: Array<Object> | null;
  block_users: Array<Object> | null;
}

const initialState: SocialSliceState = {
  chats: null,
  archive_chats: null,
  currentChat: null,
  friends: null,
  block_users: null
};

export const socialSlice: any = createSlice({
  name: "social",
  initialState,
  reducers: {
    clearCurrentChat(state) {
      state.currentChat = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllChatsByUserId.fulfilled,
      (state: SocialSliceState, action: PayloadAction<any>) => {
        const { chatsUnarchive, chatsArchive } = action.payload
        state.chats = BubbleSort(chatsUnarchive)
        state.archive_chats = BubbleSort(chatsArchive)
      }
    );
    builder.addCase(getChatsById.fulfilled,
      (state: SocialSliceState, action: PayloadAction<any>) => {
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
      (state: SocialSliceState, action: PayloadAction<any>) => {
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
      (state: SocialSliceState, action: PayloadAction<any>) => {
        const { filterUnarchiveChat, filterArchiveChat } = action.payload
        state.chats = BubbleSort(filterUnarchiveChat)
        state.archive_chats = BubbleSort(filterArchiveChat)
      }
    );
    builder.addCase(getSearchChatByUsersName.fulfilled,
      (state: SocialSliceState, action: PayloadAction<any>) => {
        //state.chats.push(action.payload)
        state.currentChat = action.payload
      }
    );
    builder.addCase(resiveAMessage.fulfilled,
      (state: SocialSliceState, action: PayloadAction<any>) => {
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
      (state: SocialSliceState, action: PayloadAction<any>) => {
        state.currentChat = action.payload;
      }
    );
    builder.addCase(deleteMessage.fulfilled,
      (state: SocialSliceState, action: PayloadAction<any>) => {

      }
    );
    builder.addCase(getAllContactsByUserId.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        state.friends = action.payload;
      }
    );
    builder.addCase(getSearchContactByName.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        state.friends = action.payload;
      }
    );
    builder.addCase(getContactBlocked.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        state.block_users = action.payload;
      }
    );
    builder.addCase(putBlockUser.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        const { block_users, friends } = action.payload;
        state.friends = friends;
        state.block_users = block_users;
      }
    );
    builder.addCase(addUserContact.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        const { block_users, friends } = action.payload
        state.friends = friends;
        state.block_users = block_users;
      }
    );
    builder.addCase(deleteUserContact.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        state.friends = action.payload;
      }
    );
  },
});

export const { clearCurrentChat } = socialSlice.actions;

export default socialSlice.reducer;