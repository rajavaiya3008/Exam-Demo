import { useDispatch, useSelector } from "react-redux";
import {
  handleTeacherError,
  initiateAnsIndex,
  initiateExam,
  initiateQuestions,
  loadExamData,
  loadViewExamData,
} from "../../../redux/slices/teacher";
import { useEffect, useState } from "react";
import { validateData } from "../../../utils/validation";
import { getCurrUserData } from "../../../utils/currentUser";
import { cancelFetchData, currAbortController, fetchData } from "../../../redux/slices/api";
import { useNavigate } from "react-router";
import { VIEW_EXAM } from "../../../utils/routeConstant";
import { toastSuccess } from "../../../utils/toastFunction";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
} from "../../../utils/localStorageFunction";
import { TEACHER_CREATE_EXAM } from "../../../utils/apiUrlConstant";
import { examValidation } from "../../../utils/validationConstant";
import { hasDuplicates, hasObjectLength, validateOptions, validationExamData } from "../../../utils/commonFunction";
import { useExamFields, sameOptionMsg, sameQuestionMsg } from "../../../utils/examDataConstatnt";
import { ANS_INDEX, CREATE_EXAM_CONST } from "../../../utils/localStorageConstant";

const validate = examValidation;

export const useCreateExam = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const examData = useSelector((state) => state.teacher.createExam);
  const [currQuestion, setCurrQuestion] = useState(0);
  const error = useSelector((state) => state.teacher.error);
  const sameQuestions = useSelector((state) => state.teacher.questions);
  const { token } = getCurrUserData();

  const validateExamData = validationExamData(examData,currQuestion);

  const Options = validateOptions(examData,currQuestion);

  const createExamFields = useExamFields(examData,currQuestion,Options)

  const optionArr = examData?.questions?.[currQuestion]?.options;

  useEffect(() => {
    const handleStorageChange = () => {
      const createExamData = getLocalStorageItem(CREATE_EXAM_CONST);
      const ansIndex = getLocalStorageItem(ANS_INDEX);

      if (!createExamData) {
        dispatch(initiateExam());
        dispatch(initiateAnsIndex([]));
        setCurrQuestion(0);
      } else {
        dispatch(loadExamData(createExamData));
        (ansIndex && dispatch(initiateAnsIndex(ansIndex)))
      }
    };

    handleStorageChange();
    window.addEventListener("storage", handleStorageChange);

    return () => {
      cancelFetchData(currAbortController);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleCreateExam = () => {
    if (
      (sameQuestions.includes(validateExamData.question) &&
        sameQuestions.length === currQuestion) ||
      sameQuestions[currQuestion] !== validateExamData.question
    ) {
      validateExamData.questions = sameQuestions;
      validateExamData.sameQueMsg = sameQuestionMsg;
    }

    const error = validateData(validateExamData, validate);
    if (hasObjectLength(error)) {
      dispatch(handleTeacherError(error));
      return;
    }
    if (hasDuplicates(optionArr)) {
      dispatch(handleTeacherError({sameOption:sameOptionMsg}));
      return;
    }
    const createExam = async () => {
      try {
        const config = {
          method: "post",
          url: TEACHER_CREATE_EXAM,
          data: examData,
          headers: { "access-token": token },
        };
        const res = await dispatch(fetchData(config));
        toastSuccess("Exam Created Successfully");
        setCurrQuestion(0);
        dispatch(loadViewExamData([]))
        dispatch(initiateQuestions());
        navigate(VIEW_EXAM);
      } catch (e) {
        console.log("e", e);
      }
    };
    createExam();
  };

  const handleCancel = () => {
    dispatch(initiateExam());
    dispatch(initiateQuestions());
    dispatch(initiateAnsIndex([]));
    removeLocalStorageItem(ANS_INDEX);
    removeLocalStorageItem(CREATE_EXAM_CONST);
    setCurrQuestion(0);
  };

  return {
    createExamFields,
    validateExamData,
    validate,
    error,
    currQuestion,
    Options,
    examData,
    setCurrQuestion,
    handleCreateExam,
    handleCancel,
  };
};
