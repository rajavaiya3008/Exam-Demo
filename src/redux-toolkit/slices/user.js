import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    loginData:{},
    signupData:{
        name:'',
        email:'',
        password:'',
        role:'',
    },
    login:false,
    forgetPassword:{},
    newPassword:{},
    resetPassword:{},
    error:{}
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
            console.log('name', name)
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
        initiateLoginData
    } = userSlice.actions;

export default userSlice.reducer;