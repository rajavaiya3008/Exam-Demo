import { createSlice } from "@reduxjs/toolkit"
import { handleAns } from "./teacher";


const initialState = {
    allExamData:[],
    examPaper:{},
    studentProfile:{},
    error:{}
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
            console.log('ans in student slice', action.payload.ans);
            state.error = {};
            state.examPaper.questions[action.payload.queIndex].answer = action.payload.ans;
        },
        handleStudentError:(state,action) => {
            state.error = action.payload;
        },
        loadStudentProfile:(state,action) => {
            state.studentProfile = action.payload;
        },
        updateProfile:(state,action) => {
            state.error = {}
            state.studentProfile[action.payload.name] = action.payload.value;
        },
        cancelExam:(state,action) => {
            state.examPaper = {};
        }
    }
})

export const {loadAllExamData,loadExamPaper,handleStudentAns,handleStudentError,loadStudentProfile,updateProfile,cancelExam} = studentSlice.actions;
export default studentSlice.reducer;