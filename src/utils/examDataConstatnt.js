import {
  handleAns,
  handleOptions,
  handleQuestion,
  handleSubject,
} from "../redux/slices/teacher";
import { showExam } from "./examPaperConstant";

const radioField = (examData, error, currQuestion, Options, option) => {
  return {
    type: "radio",
    name: "ans",
    id: `op${option}`,
    data: Options,
    updateData: handleAns,
    currQuestion: currQuestion,
    ans: examData?.questions?.[currQuestion]?.answer,
    opIndex: option - 1,
    error: error,
  };
};

const optionField = (currQuestion, Options, error, option) => {
  return {
    type: "text",
    id: `op${option}`,
    name: `op${option}`,
    label: `Option ${option}`,
    data: Options,
    updateData: handleOptions,
    currQuestion: currQuestion,
    opIndex: option - 1,
    error: error,
  };
};

export const examFields = (examData, error, currQuestion, Options) => {
  return [
    {
      type: "text",
      id: "subject",
      name: "subjectName",
      label: "Subject Name",
      data: examData,
      updateData: handleSubject,
      error: error,
    },
    {
      type: "text",
      id: "question",
      name: "question",
      label: `Question ${currQuestion + 1}`,
      data: examData?.questions?.[currQuestion],
      updateData: handleQuestion,
      currQuestion: currQuestion,
      error: error,
    },
    radioField(examData, error, currQuestion, Options, 1),
    optionField(currQuestion, Options, error, 1),
    radioField(examData, error, currQuestion, Options, 2),
    optionField(currQuestion, Options, error, 2),
    radioField(examData, error, currQuestion, Options, 3),
    optionField(currQuestion, Options, error, 3),
    radioField(examData, error, currQuestion, Options, 4),
    optionField(currQuestion, Options, error, 4),
  ];
};

export const editData = (subjectName, questions) => {
  const {showExamData:editExamData} = showExam(subjectName, questions)
  const ansArr = editExamData.questions.reduce((acc, curr) => {
    const ansIndex = curr.options.findIndex((option) => option === curr.answer);
    acc.push(ansIndex);
    return acc;
  }, []);
  return {editExamData,ansArr}
};

// {
//   type: "radio",
//   name: "ans",
//   id: "op2",
//   data: Options,
//   updateData: handleAns,
//   currQuestion: currQuestion,
//   ans: examData?.questions?.[currQuestion]?.answer,
//   opIndex: 1,
//   error: error,
// },
// {
//   type: "text",
//   id: "op2",
//   name: "op2",
//   label: "Option 2",
//   data: Options,
//   updateData: handleOptions,
//   currQuestion: currQuestion,
//   opIndex: 1,
//   error: error,
// },
// {
//   type: "radio",
//   name: "ans",
//   id: "op3",
//   data: Options,
//   updateData: handleAns,
//   currQuestion: currQuestion,
//   ans: examData?.questions?.[currQuestion]?.answer,
//   opIndex: 2,
//   error: error,
// },
// {
//   type: "text",
//   id: "op3",
//   name: "op3",
//   label: "Option 3",
//   data: Options,
//   updateData: handleOptions,
//   currQuestion: currQuestion,
//   opIndex: 2,
//   error: error,
// },
// {
//   type: "radio",
//   name: "ans",
//   id: "op4",
//   data: Options,
//   updateData: handleAns,
//   currQuestion: currQuestion,
//   ans: examData?.questions?.[currQuestion]?.answer,
//   opIndex: 3,
//   error: error,
// },
// {
//   type: "text",
//   id: "op4",
//   name: "op4",
//   label: "Option 4",
//   data: Options,
//   updateData: handleOptions,
//   currQuestion: currQuestion,
//   opIndex: 3,
//   error: error,
// },
