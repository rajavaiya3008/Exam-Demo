import { createSlice } from "@reduxjs/toolkit";
import { setLocalStorageItem } from "../../utils/localStorageFunction";
import { EXAM_PAPER } from "../../utils/localStorageConstant";

const initialState = {
  allExamData: [],
  examPaper: {},
  studentProfile: {
    name:'',
    email:''
  },
  searchField: { subjectName: "" },
  error: {},
};

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    loadAllExamData: (state, action) => {
      state.allExamData = action.payload;
    },
    loadExamPaper: (state, action) => {
      state.error = initialState.error;
      state.examPaper = action.payload;
      setLocalStorageItem(EXAM_PAPER, action.payload)
    },
    handleStudentError: (state, action) => {
      state.error = action.payload;
    },
    loadStudentProfile: (state, action) => {
      state.studentProfile = action.payload;
    },
    cancelExam: (state) => {
      state.examPaper = {};
    },
    handleSearchField: (state, action) => {
      state.searchField.subjectName = action.payload;
    },
    initiateExamPaper: (state) => {
      state.examPaper = initialState.examPaper;
    },
  },
});

export const {
  loadAllExamData,
  loadExamPaper,
  handleStudentError,
  loadStudentProfile,
  cancelExam,
  handleSearchField,
  initiateExamPaper,
} = studentSlice.actions;

export default studentSlice.reducer;
