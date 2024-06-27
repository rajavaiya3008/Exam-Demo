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
        notes:[]
    },
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
            state.createExam[action.payload.name] = action.payload.value
        },
        handleQuestion:(state,action) => {
            state.createExam.questions[action.payload.queIndex][action.payload.name] = action.payload.value
        },
        handleOptions:(state,action) => {
            if(state.createExam.questions[action.payload.queIndex].options[action.payload.opIndex] === state.createExam.questions[action.payload.queIndex].answer){
                state.createExam.questions[action.payload.queIndex].answer = action.payload.value;
            }
            state.createExam.questions[action.payload.queIndex].options[action.payload.opIndex] = action.payload.value;
        },
        handleAns:(state,action) => {
            
            console.log('ans in  teacher slice', action.payload.ans);
            // console.log('past answer', state.createExam.questions[action.payload.queIndex]['answer']);
            state.createExam.questions[action.payload.queIndex].answer = action.payload.ans;
        },
        addNewQuestion:(state,action) => {
            state.createExam.questions.push(action.payload);
        }
    }
})

export const {loadAllStudentData,loadVerifiedStudentData,createExamData,handleSubject,handleQuestion,handleOptions,handleAns,addNewQuestion} = teacherSlice.actions;
export default teacherSlice.reducer;