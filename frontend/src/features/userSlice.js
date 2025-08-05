import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allUsers: null,
  selectedUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAllusers: (state, action) => {
      state.allUsers = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});

export const { setAllusers, setSelectedUser } = userSlice.actions;
export default userSlice.reducer;
