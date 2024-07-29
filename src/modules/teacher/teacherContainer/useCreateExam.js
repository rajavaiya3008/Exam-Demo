import { useDispatch, useSelector } from "react-redux";
import {
  handleError,
  initiateAnsIndex,
  initiateExam,
  initiateQuestions,
  loadExamData,
  loadViewExamData,
} from "../../../redux/slices/teacher";
import { useEffect, useState } from "react";
import { validateData } from "../../../utils/validation";
import { getCurrUserData } from "../../../utils/currentUser";
import { fetchData } from "../../../redux/slices/api";
import { useNavigate } from "react-router";
import { VIEW_EXAM } from "../../../utils/routeConstant";
import { toastSuccess } from "../../../utils/toastFunction";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
} from "../../../utils/localStorageFunction";
import { teacherCreateExam } from "../../../utils/apiUrlConstant";
import { examValidation } from "../../../utils/validationConstant";
import { hasObjectLength, validateOptions, validationExamData } from "../../../utils/commonFunction";
import { examFields } from "../../../utils/examDataConstatnt";

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

  const createExamFields = examFields(examData,error,currQuestion,Options)
  console.log('createExamFields', createExamFields)

  useEffect(() => {
    const handleStorageChange = () => {
      const createExamData = getLocalStorageItem("createExam");
      const ansIndex = getLocalStorageItem("ansIndex");

      if (!createExamData) {
        dispatch(initiateExam());
        dispatch(initiateAnsIndex([]));
        setCurrQuestion(0);
      } else {
        dispatch(loadExamData(createExamData));
        if (ansIndex) {
          dispatch(initiateAnsIndex(ansIndex));
        }
      }
    };

    handleStorageChange();
    window.addEventListener("storage", handleStorageChange);

    return () => {
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
      validateExamData.sameQueMsg = "Question already Exists";
    }

    const error = validateData(validateExamData, validate);
    if (hasObjectLength(error)) {
      dispatch(handleError(error));
      return;
    }
    const createExam = async () => {
      try {
        const config = {
          method: "post",
          url: teacherCreateExam,
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
    removeLocalStorageItem("ansIndex");
    removeLocalStorageItem("createExam");
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
