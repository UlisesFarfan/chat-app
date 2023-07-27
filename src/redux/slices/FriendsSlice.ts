import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { getAllContactsByUserId, getKpisUsers, getKpisUsersOnline, getSearchContactByName } from "../async/friendsAsync";

interface FriendsSliceState {
  friends: Array<object> | null;
  friends_number: number | null;
  friends_online: number | null;
  users_total: number | null;
  users_online: number | null;
  users_blocked: number | null;
  requests_number: number | null;
}

const initialState: FriendsSliceState = {
  friends: null,
  friends_number: null,
  friends_online: null,
  users_total: null,
  users_online: null,
  users_blocked: null,
  requests_number: null,
};

export const friendsSlice: any = createSlice({
  name: "history",
  initialState,
  reducers: {
    clearFriends: (state) => {
      state.friends = null
    },
    sumUserOnline: (state) => {
      state.users_online !== null ? state.users_online = state.users_online + 1 : null
    },
    resUserOnline: (state) => {
      state.users_online !== null ? state.users_online = state.users_online - 1 : null
    },
  },
  extraReducers: (builder) => {
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
    builder.addCase(getKpisUsers.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        const { blocked, contacts, requests, total_users } = action.payload;
        state.friends = contacts
        state.friends_number = contacts.length;
        state.users_total = total_users;
        state.users_blocked = blocked;
        state.requests_number = requests;
      }
    );
    builder.addCase(getKpisUsersOnline.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        const { friends_online, users_online } = action.payload;
        state.friends_online = friends_online;
        state.users_online = users_online;
      }
    );
  },
});

export const { clearFriends, sumUserOnline, resUserOnline } = friendsSlice.actions;

export default friendsSlice.reducer;
