import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allStudentData:[],
    verifiedStudentData:[],
    createExam:{
        subjectName:'math',
        questions:[
            {
                question:'question1',
                answer:'ans1',
                options:[
                    'ans1',
                    'ans2',
                    'ans3',
                    'ans4'
                ]
            }
        ],
        notes:['gffgdg']
    },
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
        createExamData:(state,action) => {

        },
        handleSubject:(state,action) => {
            state.error = {};
            state.createExam[action.payload.name] = action.payload.value
        },
        handleQuestion:(state,action) => {
            state.error = {};
            state.createExam.questions[action.payload.queIndex][action.payload.name] = action.payload.value
        },
        handleOptions:(state,action) => {
            state.error = {};
            if(state.createExam.questions[action.payload.queIndex].options[action.payload.opIndex] === state.createExam.questions[action.payload.queIndex].answer){
                state.createExam.questions[action.payload.queIndex].answer = action.payload.value;
            }
            state.createExam.questions[action.payload.queIndex].options[action.payload.opIndex] = action.payload.value;
        },
        handleAns:(state,action) => {
            state.error = {};
            console.log('ans in  teacher slice', action.payload.ans);
            // console.log('past answer', state.createExam.questions[action.payload.queIndex]['answer']);
            state.createExam.questions[action.payload.queIndex].answer = action.payload.ans;
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
        }
    }
})

export const {loadAllStudentData,loadVerifiedStudentData,createExamData,handleSubject,handleQuestion,handleOptions,handleAns,addNewQuestion,handleError,initiateExam,loadViewExamData,loadCurrStudentDetail} = teacherSlice.actions;
export default teacherSlice.reducer;