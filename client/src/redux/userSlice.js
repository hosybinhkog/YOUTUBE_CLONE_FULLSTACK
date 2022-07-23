import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  success: false,
  loading: false,
  error: null,
  currentUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.success = false;
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.success = action.payload.success;
      state.loading = false;
      state.currentUser = action.payload.user;
    },
    loginFailure: (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.loading = false;
      state.currentUser = null;
      state.error = null;
    },
  },
});

export const { loginFailure, loginRequest, loginSuccess, logout } =
  userSlice.actions;

export default userSlice.reducer;
