import { createSlice } from "@reduxjs/toolkit";
import { setLocalStorageItem } from "../../utils/localStorageFunction";

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
      state.examPaper = action.payload;
    },
    handleStudentAns: (state, action) => {
      const { queIndex, ans } = action.payload;
      state.error = {};
      state.examPaper.questions[queIndex].answer = ans;
      setLocalStorageItem("examPaper", state.examPaper);
    },
    handleStudentError: (state, action) => {
      state.error = action.payload;
    },
    loadStudentProfile: (state, action) => {
      state.studentProfile = action.payload;
    },
    updateProfile: (state, action) => {
      const { name, value } = action.payload;
      state.error = {};
      state.studentProfile[name] = value;
    },
    cancelExam: (state) => {
      state.examPaper = {};
    },
    handleSearchField: (state, action) => {
      state.searchField.subjectName = action.payload.value;
    },
    initiateExamPaper: (state) => {
      state.examPaper = initialState.examPaper;
    },
  },
});

export const {
  loadAllExamData,
  loadExamPaper,
  handleStudentAns,
  handleStudentError,
  loadStudentProfile,
  updateProfile,
  cancelExam,
  handleSearchField,
  initiateExamPaper,
} = studentSlice.actions;

export default studentSlice.reducer;
