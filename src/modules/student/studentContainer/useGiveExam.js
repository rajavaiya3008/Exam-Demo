import { useDispatch, useSelector } from "react-redux";
import { getCurrUserData } from "../../../utils/currentUser";
import {
  cancelExam,
  initiateExamPaper,
  loadAllExamData,
  loadExamPaper,
} from "../../../redux/slices/student";
import { cancelFetchData, currAbortController, fetchData } from "../../../redux/slices/api";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { initiateAnsIndex } from "../../../redux/slices/teacher";
import { toastError, toastSuccess } from "../../../utils/toastFunction";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
} from "../../../utils/localStorageFunction";
import { ALL_EXAM, LOGIN_PAGE } from "../../../utils/routeConstant";
import { useSearchParams } from "react-router-dom";
import {
  STUDENT_EXAM_PAPER,
  STUDENT_SUBMIT_EXAM,
} from "../../../utils/apiUrlConstant";
import { validateOptions } from "../../../utils/commonFunction";
import {
  ansArray,
  showExam,
} from "../../../utils/examPaperConstant";
import { useExamFields } from "../../../utils/examDataConstatnt";
import { ANS_INDEX, EXAM_PAPER, USER_DATA } from "../../../utils/localStorageConstant";
import { EXAM_SUBMITTED, FILL_ALL_QUE } from "../../../utils/constant";

const validate = {
  answer: [{ required: true, message: "Answer Required" }],
};

export const useGiveExam = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {id,subject} = Object.fromEntries(searchParams.entries())
  const [currQuestion, setCurrQuestion] = useState(0);
  const examData = useSelector((state) => state.student.examPaper);
  const ansIndex = useSelector((state) => state.teacher.ansIndex);
  const error = useSelector((state) => state.student.error);
  const { token } = getCurrUserData();

  const Options = validateOptions(examData, currQuestion);

  const validateExamData = {
    answer: examData?.questions?.[currQuestion]?.answer?.trim(),
  };

  const createExamFields = useExamFields(
    examData,
    currQuestion,
    Options
  );

  const { ansArr } = ansArray(examData);

  useEffect(() => {
    const fetchExamPaper = async () => {
      const config = {
        method: "get",
        url: STUDENT_EXAM_PAPER,
        headers: { "access-token": token },
        params: { id },
      };
      const res = await dispatch(fetchData(config));
      if (res?.payload?.statusCode === 401) {
        removeLocalStorageItem(USER_DATA);
        navigate(LOGIN_PAGE);
        return;
      }
      if (res?.payload?.statusCode === 500) {
        navigate(ALL_EXAM);
        return;
      }
      const { showExamData } = showExam(subject, res?.payload?.data);
      dispatch(loadExamPaper(showExamData));
    };
    const examPaper = getLocalStorageItem(EXAM_PAPER);
    if (examPaper) {
      dispatch(loadExamPaper(examPaper));
      const ansIndexLocal = getLocalStorageItem(ANS_INDEX);
      dispatch(initiateAnsIndex(ansIndexLocal));
    } else {
      fetchExamPaper();
    }
    const handleStorageChange = () => {
      const examPaper = getLocalStorageItem(EXAM_PAPER);
      const ansIndexLocal = getLocalStorageItem(ANS_INDEX);
      console.log('examPaper', examPaper)
      console.log('ansIndexLocal', ansIndexLocal)
      if (examPaper) {
        dispatch(loadExamPaper(examPaper));
        if (ansIndexLocal) {
          dispatch(initiateAnsIndex(ansIndexLocal));
        } else {
          dispatch(initiateExamPaper());
          dispatch(initiateAnsIndex(ansIndex));
          navigate(ALL_EXAM);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      cancelFetchData(currAbortController);
      window.removeEventListener("storage", handleStorageChange);
      removeLocalStorageItem(EXAM_PAPER);
      removeLocalStorageItem(ANS_INDEX);
    };
  }, []);

  const handleSubmitExam = () => {
    const submitExam = async () => {
      try {
        const config = {
          method: "post",
          url: STUDENT_SUBMIT_EXAM,
          data: ansArr,
          headers: { "access-token": token },
          params: { id },
        };
        dispatch(loadAllExamData([]));
        await dispatch(fetchData(config));
        toastSuccess(EXAM_SUBMITTED);
        navigate(ALL_EXAM);
      } catch (error) {
        console.log("error", error);
      }
    };
    ansArr.length === 7
      ? submitExam()
      : toastError(FILL_ALL_QUE);
  };

  const handleCancel = () => {
    dispatch(cancelExam());
    dispatch(initiateAnsIndex([]));
    removeLocalStorageItem(ANS_INDEX);
    removeLocalStorageItem(EXAM_PAPER);
    navigate(ALL_EXAM);
  };

  return {
    createExamFields,
    currQuestion,
    examData,
    validateExamData,
    validate,
    error,
    setCurrQuestion,
    handleSubmitExam,
    handleCancel,
  };
};
