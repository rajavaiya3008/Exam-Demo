import { configureStore } from "@reduxjs/toolkit";
import  userSlice  from "../slices/user";
import apiSlice from '../slices/api'

export const store = configureStore({
    reducer:{
        user:userSlice,
        api:apiSlice
    }
})