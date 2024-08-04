import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/api";
import { getCurrUserData } from "../../utils/currentUser";

export let currAbortController = null;

const initialState = {
  data: {},
  status: "",
  error: "",
};

export const fetchData = createAsyncThunk(
  "data/fetchData",
  async (config) => {
    cancelFetchData(currAbortController)
    config.headers = { "access-token": getCurrUserData().token }
    currAbortController = new AbortController();
    const signal = currAbortController.signal;
    config.signal = signal;
    try {
      let data = await axiosInstance(config);
      return data.data;
    } catch (e) {
      throw new Error(e);
    }
  }
);

export const cancelFetchData = (currAbortController) => {
  if (currAbortController) {
      currAbortController.abort();
    }
};

const apiSlice = createSlice({
  name: "api",
  initialState: initialState,
  reducers: {
    addData: () => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "ideal";
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload || "Something went Wrong";
      });
  },
});

export default apiSlice.reducer;
