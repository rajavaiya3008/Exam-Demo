import { useExam } from "../form/hooks/useExam";
// import { handleStudentAns } from "../redux/slices/student";
import {
//   handleAns,
//   handleOptions,
//   handleQuestion,
//   handleSubject,
} from "../redux/slices/teacher";
import { isStudent } from "./commonFunction";
import { showExam } from "./examPaperConstant";

const subjectField = (examData, disable,action) => {
  return {
    type: "text",
    id: "subject",
    name: "subjectName",
    label: "Subject Name",
    data: examData,
    disable: disable,
    updateData: !disable ? action : () => {},
  };
};

const questionField = (examData, currQuestion, disable,action) => {
  return {
    type: "text",
    id: "question",
    name: "question",
    label: `Question ${currQuestion + 1}`,
    data: examData?.questions?.[currQuestion],
    disable: disable,
    updateData: !disable ? action : () => {},
    currQuestion: currQuestion,
  };
};

const radioField = (examData, currQuestion, Options, option,action) => {
  return {
    type: "radio",
    name: "ans",
    id: `op${option}`,
    data: Options,
    updateData: action,
    currQuestion: currQuestion,
    ans: examData?.questions?.[currQuestion]?.answer,
    opIndex: option - 1,
  };
};

const optionField = (currQuestion, Options, option, disable,action) => {
  return {
    type: "text",
    id: `op${option}`,
    name: `op${option}`,
    label: `Option ${option}`,
    data: Options,
    disable: disable,
    updateData: !disable ? action : () => {},
    currQuestion: currQuestion,
    opIndex: option - 1,
  };
};

// export const useExamFields = (examData, currQuestion, Options) => {
//   const fields = [
//     subjectField(examData, isStudent()),
//     questionField(examData, currQuestion, isStudent()),
//   ];

//   for (let i = 1; i <= 4; i++) {
//     fields.push(radioField(examData, currQuestion, Options, i));
//     fields.push(optionField(currQuestion, Options, i, isStudent()));
//   }

//   return fields;
// };

export const useExamFields = (examData, currQuestion, Options) => {
  const { handleStudentAns ,handleAns,handleOptions,handleQuestion,handleSubject} = useExam();
  const fields = [
    subjectField(examData, isStudent(),handleSubject),
    questionField(examData, currQuestion, isStudent(),handleQuestion),
  ];

  for (let i = 1; i <= 4; i++) {
    fields.push(isStudent() ? radioField(examData, currQuestion, Options, i,handleStudentAns):radioField(examData, currQuestion, Options, i,handleAns));
    fields.push(optionField(currQuestion, Options, i, isStudent(),handleOptions));
  }

  return fields;
};

export const sameQuestionMsg = "Question already Exists";
export const sameOptionMsg = "Two Options are Same Please Check";

export const editData = (subjectName, questions) => {
  const { showExamData: editExamData } = showExam(subjectName, questions);
  const ansArr = editExamData.questions.reduce((acc, curr) => {
    const ansIndex = curr.options.findIndex((option) => option === curr.answer);
    acc.push(ansIndex);
    return acc;
  }, []);
  return { editExamData, ansArr };
};
