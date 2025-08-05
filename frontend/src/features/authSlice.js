import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginUser: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SetLoginUser: (state, action) => {
      state.loginUser = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { SetLoginUser, setIsLoggedIn } = authSlice.actions;
export default authSlice.reducer;
