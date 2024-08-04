import { RADIO_TYPE, TEXT_TYPE } from "./constant";
import { showExam } from "./examPaperConstant";
import { createInputField } from "./formFieldConstant";

export const subjectField = (examData, disable, action) => {
  return {
    ...createInputField(TEXT_TYPE,"subject","subjectName","Subject Name"),
    value:examData?.["subjectName"],
    disable: disable,
    updateData: !disable ? action : () => {},
  };
};

export const questionField = (examData, currQuestion, disable, action) => {
  return {
    ...createInputField(TEXT_TYPE,"question","question",`Question ${currQuestion + 1}`),
    value:examData?.questions?.[currQuestion]?.["question"],
    disable: disable,
    updateData: !disable ? action : () => {},
    currQuestion: currQuestion,
  };
};

export const radioField = (examData, currQuestion, Options, option, action,ansIndex) => {
  return {
    ...createInputField(RADIO_TYPE,`op${option}`,"ans"),
    value:Options?.[`op${option}`],
    updateData: action,
    checked:Options?.[`op${option}`] === examData?.questions?.[currQuestion]?.answer && ansIndex?.[currQuestion] === option - 1
  };
};

export const optionField = (currQuestion, Options, option, disable, action) => {
  return {
    ...createInputField(TEXT_TYPE,`op${option}`,`op${option}`,`Option ${option}`),
    value:Options?.[`op${option}`],
    disable: disable,
    updateData: !disable ? action : () => {},
  };
};

export const sameQuestionMsg = "Question already Exists";
export const sameOptionMsg = "Two Options are Same Please Check";

export const editData = (subjectName, questions) => {
  const { showExamData: editExamData } = showExam(subjectName, questions);
  const ansArr = editExamData?.questions?.reduce((acc, curr) => {
    const ansIndex = curr?.options?.findIndex((option) => option === curr?.answer);
    acc.push(ansIndex);
    return acc;
  }, []);
  return { editExamData, ansArr };
};
