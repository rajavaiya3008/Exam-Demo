import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { axiosInstance } from '../../api/api';
import axios from 'axios';

let currAbortController = null;
// const controller = new AbortController();
// let signal = controller.signal;

const initialState = {
    data:{},
    status:'',
    error:''
}

export const fetchData = createAsyncThunk('data/fetchData', async(config,{rejectWithValue}) => {
    if(currAbortController){
        currAbortController.abort();
    }
    // currAbortController = controller;
    // signal = currAbortController.signal;
    // controller.abort();
    currAbortController = new AbortController();
    const signal = currAbortController.signal;
    config.signal = signal;
    try{
        // cancelFetchData();
        let data = await axiosInstance(config);
        //dispatch(update(data.data))
        return data.data;
    }catch (e){
        throw new Error(e);
    }
})

export const cancelFetchData = () => {
    const controller = new AbortController();
    controller.abort();
};

const apiSlice = createSlice({
    name:'api',
    initialState : initialState,
    reducers:{
        addData: () => {
            
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state,action) => {
                state.status = 'loading'
            })
            .addCase(fetchData.fulfilled, (state,action) => {
                state.status = 'ideal';
                state.data = action.payload
            })
            .addCase(fetchData.rejected, (state,action) => {
                state.status = 'error';
                state.error = action.payload || 'Something went Wrong'
            })

    }
})

export default apiSlice.reducer;