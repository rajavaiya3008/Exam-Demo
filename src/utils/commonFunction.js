import { getCurrUserData } from "./currentUser";

export const hasDuplicates = (array) => {
    return new Set(array).size !== array.length;
  }

export const isNext = (navigate) => {
  return navigate === 'next'
}

export const isPrev = (navigate) => {
  return navigate === 'prev'
}

export const hasObjectLength = (obj) => {
  return obj && Object.keys(obj).length > 0
}

export const validationExamData = (examData,currQuestion) => {
  return {
    subjectName: examData?.subjectName,
    question: examData?.questions?.[currQuestion]?.question,
    ...validateOptions(examData,currQuestion),
    answer: examData?.questions?.[currQuestion]?.answer?.trim(),
  }
}

export const validateOptions = (examData,currQuestion) => {
  return {
    op1: examData?.questions?.[currQuestion]?.options?.[0],
    op2: examData?.questions?.[currQuestion]?.options?.[1],
    op3: examData?.questions?.[currQuestion]?.options?.[2],
    op4: examData?.questions?.[currQuestion]?.options?.[3],
  }
}

export const isStudent = () => {
  return getCurrUserData()?.role === 'student' 
}

