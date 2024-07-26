import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menu: false,
  error: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleError: (state, action) => {
      state.error = action.payload;
    },
    handleMenu: (state) => {
      state.menu = !state.menu;
    },
  },
});

export const {
  handleError,
  handleMenu,
} = userSlice.actions;

export default userSlice.reducer;
