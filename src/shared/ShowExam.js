import React from "react";
import { useDispatch, useSelector } from "react-redux";
import InputField from "./InputField";
import {
  addNewQuestion,
  handleError,
  handleSameQuestions,
  initiateQuestions,
} from "../redux/slices/teacher";
import { validateData } from "../utils/validation";
import { handleStudentError } from "../redux/slices/student";
import { useLocation } from "react-router";
import { EDIT_EXAM } from "../utils/routeConstant";
import { hasDuplicates, hasObjectLength, isNext, isPrev, isStudent } from "../utils/commonFunction";
import Button from "./Button";

const question = {
  question: "",
  answer: "",
  options: ["", "", "", ""],
};

const ShowExam = ({
  createExamFields,
  error,
  setCurrQuestion,
  currQuestion,
  validateExamData,
  validate,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const sameQuestions = useSelector((state) => state.teacher.questions);
  const examData = useSelector((state) => state.teacher.createExam);
  const optionArr = examData?.questions?.[currQuestion]?.options;
  const { answer, sameOption } = error;
  const prevDisable = currQuestion === 0;
  const nextDisabled = currQuestion === 14 || (isStudent() && currQuestion === 6);

  const handleNavigation = (navigate) => {
    if(location.pathname === EDIT_EXAM || (isNext(navigate) && !isStudent())){
      if (
        (sameQuestions.includes(validateExamData.question) &&
          sameQuestions.length === currQuestion) ||
        sameQuestions[currQuestion] !== validateExamData.question
      ) {
        validateExamData.questions = sameQuestions;
        validateExamData.sameQueMsg = "Question already Exists";
      }
      const error = validateData(validateExamData, validate);
      if (hasObjectLength(error)) {
        dispatch(handleError(error));
        return;
      }
      if (hasDuplicates(optionArr)) {
        dispatch(handleError({sameOption:"Two Options are Same Please Check"}));
        return;
      }
      dispatch(
        handleSameQuestions({
          question: validateExamData.question,
          queIndex: currQuestion,
        })
      );
      isNext(navigate) && examData.questions.length !== 15 &&
      examData.questions.length < currQuestion + 2 && dispatch(addNewQuestion(question))
      isPrev(navigate) && currQuestion === 1 && dispatch(initiateQuestions());
    }
    if(isStudent() && isNext(navigate)){
      const error = validateData(validateExamData, validate);
      if (hasObjectLength(error)) {
        dispatch(handleStudentError(error));
        return;
      }
    }
    dispatch(isStudent() && isPrev(navigate) ? handleStudentError({}) : handleError({}));
    setCurrQuestion(isPrev(navigate) ? currQuestion - 1 : currQuestion + 1)
  }

  return (
    <div>
      <div>
        {createExamFields.map((field, i) => (
          <InputField fieldData={field} key={i} />
        ))}
      </div>

      {answer && <span className="text-red-500 text-sm">{answer}</span>}

      {sameOption && <span className="text-red-500 text-sm">{sameOption}</span>}

      <div className="mt-2 flex gap-0">
        <Button
          onSubmit={() => handleNavigation('prev')}
          disable={prevDisable}
          style={"mr-[-15px]"}
        >
          Prev
        </Button>
        <Button onSubmit={() => handleNavigation('next')} disable={nextDisabled}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default ShowExam;





































// const handlePrevQuestion = () => {
//   if (location.pathname === EDIT_EXAM) {
//     if (
//       !sameQuestions.includes(validateExamData.question) ||
//       sameQuestions[currQuestion] !== validateExamData.question
//     ) {
//       validateExamData.questions = sameQuestions;
//       validateExamData.sameQueMsg = "Question already Exists";
//     }
//     const error = validateData(validateExamData, validate);
//     if (Object.keys(error).length) {
//       dispatch(handleError(error));
//       return;
//     }
//     dispatch(
//       handleSameQuestions({
//         question: validateExamData.question,
//         queIndex: currQuestion,
//       })
//     );
//     if (currQuestion === 1) {
//       dispatch(initiateQuestions());
//     }
//   }
//   if (isStudent) {
//     dispatch(handleStudentError({}));
//   } else {
//     dispatch(handleError({}));
//   }
//   setCurrQuestion(currQuestion - 1);
// };

// const handleNextQuestion = () => {
//   if (isStudent) {
//     const error = validateData(validateExamData, validate);
//     if (Object.keys(error).length) {
//       dispatch(handleStudentError(error));
//       return;
//     }
//   } else {
//     if (
//       (sameQuestions.includes(validateExamData.question) &&
//         sameQuestions.length === currQuestion) ||
//       sameQuestions[currQuestion] !== validateExamData.question
//     ) {
//       validateExamData.questions = sameQuestions;
//       validateExamData.sameQueMsg = "Question already Exists";
//     }
//     const error = validateData(validateExamData, validate);
//     if (Object.keys(error).length) {
//       dispatch(handleError(error));
//       return;
//     }
//     if (hasDuplicates(optionArr)) {
//       const error = {};
//       error.sameOption = "Two Options are Same Please Check";
//       dispatch(handleError(error));
//       return;
//     }
//     dispatch(
//       handleSameQuestions({
//         question: validateExamData.question,
//         queIndex: currQuestion,
//       })
//     );
//     if (
//       examData.questions.length !== 15 &&
//       examData.questions.length < currQuestion + 2
//     ) {
//       dispatch(addNewQuestion(question));
//     }
//   }
//   setCurrQuestion(currQuestion + 1);
// };