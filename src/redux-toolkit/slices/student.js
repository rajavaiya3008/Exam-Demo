import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    allExamData:[],
    examPaper:{},
    studentProfile:{},
    searchField:{subjectName:''},
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
        },
        handleSearchField:(state,action) => {
            state.searchField.subjectName = action.payload.value
        },
        initiateExamPaper:(state,action) => {
            state.examPaper = action.payload
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
        cancelExam,
        handleSearchField,
        initiateExamPaper
    } = studentSlice.actions;

export default studentSlice.reducer;