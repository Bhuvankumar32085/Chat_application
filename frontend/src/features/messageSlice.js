import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allMessages: [],
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setAllMessages: (state, action) => {
      state.allMessages = action.payload;
    },
    addMessage: (state, action) => {
      state.allMessages.push(action.payload);
    },
  },
});

export const { setAllMessages,addMessage } = messageSlice.actions;
export default messageSlice.reducer;
