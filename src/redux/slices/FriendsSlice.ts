import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { getAllContactsByUserId } from "../async/friendsAsync";

interface FriendsSliceState {
  friends: Array<object> | null;
}

const initialState: FriendsSliceState = {
  friends: null,
};

export const friendsSlice: any = createSlice({
  name: "history",
  initialState,
  reducers: {
    clearFriends: (state) => {
      state.friends = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllContactsByUserId.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        state.friends = action.payload;
      }
    );
  },
});

export const { clearFriends } = friendsSlice.actions;

export default friendsSlice.reducer;
