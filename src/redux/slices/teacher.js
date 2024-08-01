import { createSlice } from "@reduxjs/toolkit";
import { setLocalStorageItem } from "../../utils/localStorageFunction";
import { ANS_INDEX, CREATE_EXAM_CONST } from "../../utils/localStorageConstant";

const initialState = {
  allStudentData: [],
  verifiedStudentData: [],
  createExam: {
    subjectName: "",
    questions: [
      {
        question: "",
        options: ["", "", "", ""],
      },
    ],
    notes: ["Exams"],
  },
  questions: [],
  viewExam: [],
  currStudentDetail: {},
  searchField: {
    name:''
  },
  edited: false,
  ansIndex: [],
  error: {},
};

export const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    loadAllStudentData: (state, action) => {
      state.allStudentData = action.payload;
    },
    loadVerifiedStudentData: (state, action) => {
      state.verifiedStudentData = action.payload;
    },
    addNewQuestion: (state, action) => {
      state.createExam.questions.push(action.payload);
    },
    handleTeacherError: (state, action) => {
      state.error = action.payload;
    },
    initiateExam: (state) => {
      state.error = {};
      state.createExam = initialState.createExam;
    },
    loadViewExamData: (state, action) => {
      state.viewExam = action.payload;
    },
    loadCurrStudentDetail: (state, action) => {
      state.currStudentDetail = action.payload;
    },
    initiateTeacherError: (state) => {
      state.error = {};
    },
    handleSameQuestions: (state, action) => {
      const { queIndex, question } = action.payload;
      state.questions[queIndex] = question;
    },
    initiateQuestions: (state) => {
      state.questions = [];
    },
    handleSearchField: (state, action) => {
      state.searchField.name = action.payload.value;
    },
    handleEdited: (state) => {
      state.edited = false;
    },
    handleAnsIndexes: (state, action) => {
      const {currQuestion,ansIndex} = action.payload
      state.ansIndex[currQuestion] = ansIndex;
      setLocalStorageItem(ANS_INDEX, state.ansIndex);
    },
    initiateAnsIndex: (state, action) => {
      state.ansIndex = action.payload;
    },
    loadExamData: (state, action) => {
      state.edited = true;
      state.error = initialState.error
      state.createExam = action.payload;
      setLocalStorageItem(CREATE_EXAM_CONST, state.createExam)
    },
  },
});

export const {
  loadAllStudentData,
  loadVerifiedStudentData,
  addNewQuestion,
  handleTeacherError,
  initiateExam,
  loadViewExamData,
  loadCurrStudentDetail,
  initiateTeacherError,
  handleSameQuestions,
  initiateQuestions,
  handleSearchField,
  handleEdited,
  handleAnsIndexes,
  initiateAnsIndex,
  loadExamData,
} = teacherSlice.actions;

export default teacherSlice.reducer;
