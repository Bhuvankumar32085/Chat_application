import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import userSlice from "../features/userSlice";
import messageSlice from "../features/messageSlice";
import socketSlice from "../features/socketSlice";
import { combineReducers } from "redux";

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["socketio"],
};

const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
  message: messageSlice,
  socketio: socketSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
