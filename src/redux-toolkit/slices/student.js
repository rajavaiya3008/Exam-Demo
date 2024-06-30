import { createSlice } from "@reduxjs/toolkit"
import { handleAns } from "./teacher";


const initialState = {
    allExamData:[],
    examPaper:{}
}

export const studentSlice = createSlice({
    name:'student',
    initialState,
    reducers:{
        loadAllExamData:(state,action) => {
            state.allExamData = action.payload;
        },
        loadExamPaper:(state,action) => {
            state.examPaper = action.payload;
        },
        handleStudentAns:(state,action) => {
            state.examPaper.questions[action.payload.queIndex].answer = action.payload.ans;
        }
    }
})

export const {loadAllExamData,loadExamPaper,handleStudentAns} = studentSlice.actions;
export default studentSlice.reducer;