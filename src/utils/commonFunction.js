import { NEXT, PREV } from "./constant";
import { getCurrUserData } from "./currentUser";
import { PAPER_ID } from "./localStorageConstant";
import { getLocalStorageItem, setLocalStorageItem } from "./localStorageFunction";
import { STUDENT_RESET_PASS, TEACHER_RESET_PASS } from "./routeConstant";

export const hasDuplicates = (array) => {
    return new Set(array).size !== array.length;
  }

export const isNext = (navigate) => {
  return navigate === NEXT
}

export const isPrev = (navigate) => {
  return navigate === PREV
}

export const isRadio = (type) => {
  return type === 'radio'
}

export const isSelect = (type) => {
  return type === 'select'
}

export const hasObjectLength = (obj) => {
  return obj && Object.keys(obj).length > 0
}

export const isResetPassword = (path) => {
  return (path === STUDENT_RESET_PASS || path === TEACHER_RESET_PASS)
}

export const checkExam = (id) => {
  const paperId = getLocalStorageItem(PAPER_ID)
  if(paperId){
    return paperId === id
  }
  setLocalStorageItem(PAPER_ID,id)
  return true;
}

export const validationExamData = (examData,currQuestion) => {
  return {
    subjectName: examData?.subjectName,
    question: examData?.questions?.[currQuestion]?.question,
    ...validateOptions(examData,currQuestion),
    answer: examData?.questions?.[currQuestion]?.answer?.trim(),
  }
}

export const validateOptions = (examData, currQuestion) => {
  const options = examData?.questions?.[currQuestion]?.options || [];

  return options.reduce((acc, option, index) => {
    acc[`op${index + 1}`] = option;
    return acc;
  }, {});
};

export const isStudent = () => {
  return getCurrUserData()?.role === 'student' 
}

