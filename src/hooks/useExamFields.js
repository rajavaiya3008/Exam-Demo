import { isStudent } from "../utils/commonFunction";
import { optionField, questionField, radioField, subjectField } from "../utils/examDataConstant";
import { useExam } from "./useExam";

export const useExamFields = (examData, currQuestion, Options,ansIndex) => {
    const {
      handleStudentAns,
      handleAns,
      handleOptions,
      handleQuestion,
      handleSubject,
    } = useExam();
    const fields = [
      subjectField(examData, isStudent(), handleSubject),
      questionField(examData, currQuestion, isStudent(), handleQuestion),
    ];
  
    const handleRadioField = isStudent() ? handleStudentAns : handleAns;
  
    for (let i = 1; i <= 4; i++) {
      fields.push(
        radioField(examData, currQuestion, Options, i, handleRadioField,ansIndex)
      );
      fields.push(
        optionField(currQuestion, Options, i, isStudent(), handleOptions)
      );
    }
  
    return fields;
  };
  