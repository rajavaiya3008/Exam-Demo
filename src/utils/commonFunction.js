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

