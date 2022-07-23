import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  videos: null,
  error: null,
  success: false,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {},
});

export const {} = videoSlice.actions;

export default videoSlice.reducer;
