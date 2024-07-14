import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allStudentData:[],
    verifiedStudentData:[],
    createExam:{
        subjectName:'',
        questions:[
            {
                question:'',
                options:[
                    '',
                    '',
                    '',
                    ''
                ]
            }
        ],
        notes:['gffgdg']
    },
    questions:[],
    viewExam:[],
    currStudentDetail:{},
    searchField:{},
    edited:false,
    ansIndex:[],
    error:{},

}

export const teacherSlice = createSlice({
    name:'teacher',
    initialState,
    reducers:{
        loadAllStudentData:(state,action) => {
            state.allStudentData = action.payload;
        },
        loadVerifiedStudentData:(state,action) => {
            state.verifiedStudentData = action.payload;
        },
        handleSubject:(state,action) => {
            state.edited = true
            const {name,value} = action.payload;
            state.error = {};
            state.createExam[name] = value
            localStorage.setItem('createExam',JSON.stringify(state.createExam))
        },
        handleQuestion:(state,action) => {
            state.edited = true
            const {name,value,queIndex} = action.payload;
            state.error = {};
            state.createExam.questions[queIndex][name] = value
            localStorage.setItem('createExam',JSON.stringify(state.createExam))
        },
        handleOptions:(state,action) => {
            state.edited = true
            console.log('action.payload', action.payload)
            const {queIndex,opIndex,value} = action.payload;
            state.error = {};
            if(state.createExam.questions[queIndex].options[opIndex] === state.createExam.questions[queIndex].answer && state.ansIndex[queIndex] === opIndex){
                state.createExam.questions[queIndex].answer = value;
            }
            state.createExam.questions[queIndex].options[opIndex] = value;
            localStorage.setItem('createExam',JSON.stringify(state.createExam))
        },
        handleAns:(state,action) => {
            state.edited = true
            const {queIndex,ans} = action.payload;
            state.error = {};
            state.createExam.questions[queIndex].answer = ans;
            localStorage.setItem('createExam',JSON.stringify(state.createExam))
        },
        addNewQuestion:(state,action) => {
            state.createExam.questions.push(action.payload);
        },
        handleError:(state,action) => {
            state.error = action.payload;
        },
        initiateExam:(state,action) => {
            state.error = {};
            state['createExam'] = action.payload;
        },
        loadViewExamData:(state,action) => {
            state.viewExam = action.payload;
        },
        loadCurrStudentDetail:(state,action) => {
            state.currStudentDetail = action.payload;
        },
        initiateTeacherError:(state,action) => {
            state.error = {};
        },
        handleSameQuestions:(state,action) => {
            const {queIndex,question} = action.payload;
            state.questions[queIndex] = question;
        },
        initiateQuestions:(state,action) => {
            state.questions = [];
        },
        handleSearchField:(state,action) => {
            state.searchField.name = action.payload.value
        },
        handleEdited:(state,action) => {
            state.edited = false;
        },
        handleAnsIndexes:(state,action) => {
            state.ansIndex[action.payload.currQuestion] = action.payload.ansIndex;
            localStorage.setItem('ansIndex',JSON.stringify(state.ansIndex))
        },
        initiateAnsIndex:(state,action) => {
            state.ansIndex = action.payload
        },
        initiateCreateExam:(state,action) => {
            state.createExam = action.payload
        }
    }
})

export const 
    {
        loadAllStudentData,
        loadVerifiedStudentData,
        handleSubject,
        handleQuestion,
        handleOptions,
        handleAns,
        addNewQuestion,
        handleError,
        initiateExam,
        loadViewExamData,
        loadCurrStudentDetail
        ,initiateTeacherError,
        handleSameQuestions,
        initiateQuestions,
        handleSearchField,
        handleEdited,
        handleAnsIndexes,
        initiateAnsIndex,
        initiateCreateExam
    } = teacherSlice.actions;

export default teacherSlice.reducer;