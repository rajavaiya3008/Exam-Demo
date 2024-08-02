import { showExam } from "./examPaperConstant";
import { createInputField } from "./formFieldConstant";

export const subjectField = (examData, disable, action) => {
  return {
    ...createInputField("text","subject","subjectName","Subject Name"),
    data: examData,
    disable: disable,
    updateData: !disable ? action : () => {},
  };
};

export const questionField = (examData, currQuestion, disable, action) => {
  return {
    ...createInputField("text","question","question",`Question ${currQuestion + 1}`),
    data: examData?.questions?.[currQuestion],
    disable: disable,
    updateData: !disable ? action : () => {},
    currQuestion: currQuestion,
  };
};

export const radioField = (examData, currQuestion, Options, option, action) => {
  return {
    ...createInputField("radio",`op${option}`,"ans"),
    data: Options,
    updateData: action,
    currQuestion: currQuestion,
    ans: examData?.questions?.[currQuestion]?.answer,
    opIndex: option - 1,
  };
};

export const optionField = (currQuestion, Options, option, disable, action) => {
  return {
    ...createInputField("text",`op${option}`,`op${option}`,`Option ${option}`),
    data: Options,
    disable: disable,
    updateData: !disable ? action : () => {},
    currQuestion: currQuestion,
    opIndex: option - 1,
  };
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
