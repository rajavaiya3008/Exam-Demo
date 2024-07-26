import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginData: {
    email: "",
    password: "",
  },
  signupData: {
    name: "",
    email: "",
    password: "",
    role: "",
  },
  menu: false,
  forgetPassword: {
    email: "",
  },
  newPassword: {
    Password: "",
    ConfirmPassword: "",
  },
  resetPassword: {
    oldPassword:'',
    Password:'',
    ConfirmPassword:''
  },
  error: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleLoginData: (state, action) => {
      const { name, value } = action.payload;
      state.error = {};
      state.loginData[name] = value;
    },
    handleSignupData: (state, action) => {
      const { name, value } = action.payload;
      state.error = {};
      state.signupData[name] = value;
    },
    handleForgetPassword: (state, action) => {
      const { name, value } = action.payload;
      state.error = {};
      state.forgetPassword[name] = value;
    },
    handleNewPassword: (state, action) => {
      const { name, value } = action.payload;
      state.error = {};
      state.newPassword[name] = value;
    },
    handleResetPassword: (state, action) => {
      const { name, value } = action.payload;
      state.error = {};
      state.resetPassword[name] = value;
    },
    initiateResetPassword: (state) => {
      state.error = {};
      state.resetPassword = initialState.resetPassword;
    },
    handleError: (state, action) => {
      state.error = action.payload;
    },
    initiateLoginData: (state) => {
      state.loginData = initialState.loginData;
    },
    initiateSignupData: (state) => {
      state.signupData = initialState.signupData;
    },
    initiateForgetPassword: (state) => {
      state.forgetPassword = initialState.forgetPassword;
    },
    handleMenu: (state) => {
      state.menu = !state.menu;
    },
  },
});

export const {
  handleLoginData,
  handleSignupData,
  handleError,
  handleForgetPassword,
  handleNewPassword,
  handleResetPassword,
  initiateResetPassword,
  initiateLoginData,
  initiateSignupData,
  initiateForgetPassword,
  handleMenu,
} = userSlice.actions;

export default userSlice.reducer;
