import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    loginData:{},
    signupData:{
        name:'',
        email:'',
        password:'',
        role:'student',
    },
    login:false,
    focused:false,
    forgetPassword:{},
    newPassword:{},
    resetPassword:{},
    error:{},
    prevVisitedPage:1,
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        handleLoginData:(state,action) => {
            const {name,value} = action.payload;
            state.error = {};
            state.loginData[name] = value;
        },
        handleSignupData:(state,action) => {
            const {name,value} = action.payload
            state.error = {};
            state.signupData[name] = value;
        },
        handleForgetPassword:(state,action) => {
            const {name,value} = action.payload;
            state.error = {};
            state.forgetPassword[name] = value;
        },
        handleNewPassword:(state,action) => {
            const {name,value} = action.payload;
            state.error = {};
            state.newPassword[name] = value;
        },
        handleResetPassword:(state,action) => {
            const {name,value} = action.payload;
            state.error = {};
            state.resetPassword[name] = value;
        },
        initiateResetPassword:(state,action) => {
            state.error = {};
            state.resetPassword = action.payload;
        },
        handleError:(state,action) => {
            state.error = action.payload;
        },
        handleLogin:(state,action) => {
            state.login = action.payload;
        },
        initiateLoginData:(state,action) => {
            state.loginData = {};
        },
        initiateSignupData:(state,action) => {
            state.signupData = {};
        },
        handleFocus:(state,action) => {
            state.focused = action.payload
        },
        handlePrevVisitedPage:(state,action) => {
            state.prevVisitedPage = action.payload
        },
        initiateForgetPassword:(state,action) => {
            state.forgetPassword = action.payload
        }
    }
})

export const 
    {
        handleLoginData,
        handleSignupData,
        handleError,
        handleForgetPassword,
        handleNewPassword,
        handleResetPassword,
        initiateResetPassword,
        handleLogin,
        initiateLoginData,
        initiateSignupData,
        handleFocus,
        handlePrevVisitedPage,
        initiateForgetPassword
    } = userSlice.actions;

export default userSlice.reducer;