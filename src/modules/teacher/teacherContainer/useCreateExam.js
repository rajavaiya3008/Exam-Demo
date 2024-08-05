import { useDispatch, useSelector } from "react-redux";
import {
  handleCurrQuestion,
  handleTeacherError,
  initiateAnsIndex,
  initiateExam,
  initiateQuestions,
  loadExamData,
  loadViewExamData,
} from "../../../redux/slices/teacher";
import { useEffect } from "react";
import { validateData } from "../../../utils/validation";
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
import { sameOptionMsg, sameQuestionMsg } from "../../../utils/examDataConstant";
import { ANS_INDEX, CREATE_EXAM_CONST } from "../../../utils/localStorageConstant";
import { EXAM_CREATED } from "../../../utils/constant";
import { useExamFields } from "../../../hooks/useExamFields";

const validate = examValidation;

export const useCreateExam = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const examData = useSelector((state) => state.teacher.createExam);
  const currQuestion = useSelector(state => state.teacher.currQuestion)
  const error = useSelector((state) => state.teacher.error);
  const sameQuestions = useSelector((state) => state.teacher.questions);
  const ansIndex = useSelector(state => state.teacher.ansIndex)

  const validateExamData = validationExamData(examData,currQuestion);

  const Options = validateOptions(examData,currQuestion);

  const createExamFields = useExamFields(examData,currQuestion,Options,ansIndex)

  const optionArr = examData?.questions?.[currQuestion]?.options;

  useEffect(() => {
    const handleStorageChange = (e) => {
      const {key} = e
      if(key === CREATE_EXAM_CONST){
        loadCreateExam()
      }
    };

    loadCreateExam();
    window.addEventListener("storage", handleStorageChange);

    return () => {
      cancelFetchData(currAbortController);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const loadCreateExam = () => {
    const createExamData = getLocalStorageItem(CREATE_EXAM_CONST);
      const ansIndex = getLocalStorageItem(ANS_INDEX);

      if (!createExamData) {
        dispatch(initiateExam());
        dispatch(initiateAnsIndex([]));
        dispatch(handleCurrQuestion(0))
      } else {
        dispatch(loadExamData(createExamData));
        (ansIndex && dispatch(initiateAnsIndex(ansIndex)))
      }
  }

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
        };
        await dispatch(fetchData(config));
        toastSuccess(EXAM_CREATED);
        dispatch(handleCurrQuestion(0))
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
    dispatch(handleCurrQuestion(0))
  };

  return {
    createExamFields,
    validateExamData,
    validate,
    error,
    currQuestion,
    Options,
    examData,
    handleCreateExam,
    handleCancel,
  };
};
