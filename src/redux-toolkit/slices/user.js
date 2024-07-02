import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    loginData:{
        email:'xyz@mail.com',
        password:'111111',
        
    },
    signupData:{
        name:'raj',
        email:'abc@gmail.com',
        password:'222222',
        role:'student',
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
            console.log('action.payload', action.payload);
            state.error = {};
            state.loginData[action.payload.name] = action.payload.value;
        },
        handleSignupData:(state,action) => {
            state.error = {};
            state.signupData[action.payload.name] = action.payload.value;
        },
        handleForgetPassword:(state,action) => {
            state.error = {};
            state.forgetPassword[action.payload.name] = action.payload.value;
        },
        handleNewPassword:(state,action) => {
            state.error = {};
            state.newPassword[action.payload.name] = action.payload.value;
        },
        handleResetPassword:(state,action) => {
            state.error = {};
            state.resetPassword[action.payload.name] = action.payload.value;
        },
        initiateResetPassword:(state,action) => {
            state.resetPassword = {};
        },
        handleError:(state,action) => {
            state.error = action.payload;
        },
        handleLogin:(state,action) => {
            state.login = action.payload;
        }
    }
})

export const {handleLoginData,handleSignupData,handleError,handleForgetPassword,handleNewPassword,handleResetPassword,initiateResetPassword,handleLogin} = userSlice.actions;
export default userSlice.reducer;