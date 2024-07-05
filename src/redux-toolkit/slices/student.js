import { createSlice } from "@reduxjs/toolkit"


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
            const {queIndex,ans} = action.payload;
            state.error = {};
            state.examPaper.questions[queIndex].answer = ans;
        },
        handleStudentError:(state,action) => {
            state.error = action.payload;
        },
        loadStudentProfile:(state,action) => {
            state.studentProfile = action.payload;
        },
        updateProfile:(state,action) => {
            const {name,value} = action.payload;
            state.error = {}
            state.studentProfile[name] = value;
        },
        cancelExam:(state,action) => {
            state.examPaper = {};
        }
    }
})

export const 
    {
        loadAllExamData,
        loadExamPaper,
        handleStudentAns,
        handleStudentError,
        loadStudentProfile,
        updateProfile,
        cancelExam
    } = studentSlice.actions;

export default studentSlice.reducer;