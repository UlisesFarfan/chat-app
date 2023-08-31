import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setRootLocation } from "../async/historyAsync";

interface HistorySliceState {
  rootLocation: any;
}

const initialState: HistorySliceState = {
  rootLocation: null,
};

export const historySlice: any = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setRootLocation.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        state.rootLocation = action.payload;
      }
    );
  },
});

export default historySlice.reducer;
