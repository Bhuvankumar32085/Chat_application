import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
  name: "socketio",
  initialState: {
    socket: null,
    OnlineUser: [],
  },

  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    setOnlineUser: (state, action) => {
      state.OnlineUser = action.payload;
      // console.log("chat/slice", state.OnlineUser);
    },
  },
});

export const { setSocket, setOnlineUser, setMessages } = socketSlice.actions;
export default socketSlice.reducer;
