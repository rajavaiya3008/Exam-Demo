import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allStudentData:[],
    verifiedStudentData:[],
    createExam:{
        subjectName:'',
        questions:[
            {
                question:'',
                answer:'',
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
            const {name,value} = action.payload;
            state.error = {};
            state.createExam[name] = value
        },
        handleQuestion:(state,action) => {
            const {name,value,queIndex} = action.payload;
            state.error = {};
            state.createExam.questions[queIndex][name] = value
        },
        handleOptions:(state,action) => {
            const {queIndex,opIndex,value} = action.payload;
            state.error = {};
            if(state.createExam.questions[queIndex].options[opIndex] === state.createExam.questions[queIndex].answer){
                state.createExam.questions[queIndex].answer = value;
            }
            state.createExam.questions[queIndex].options[opIndex] = value;
        },
        handleAns:(state,action) => {
            const {queIndex,ans} = action.payload;
            state.error = {};
            state.createExam.questions[queIndex].answer = ans;
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
        initiateQuestions
    } = teacherSlice.actions;

export default teacherSlice.reducer;