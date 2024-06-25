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
    error:{

    }
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
        handleError:(state,action) => {
            state.error = action.payload;
        }
    }
})

export const {handleLoginData,handleSignupData,handleError} = userSlice.actions;
export default userSlice.reducer;