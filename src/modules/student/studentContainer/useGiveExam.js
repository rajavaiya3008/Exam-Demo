import { useDispatch, useSelector } from "react-redux";
import {
  cancelExam,
  initiateExamPaper,
  loadAllExamData,
  loadExamPaper,
} from "../../../redux/slices/student";
import {
  cancelFetchData,
  currAbortController,
  fetchData,
} from "../../../redux/slices/api";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import {
  handleCurrQuestion,
  initiateAnsIndex,
} from "../../../redux/slices/teacher";
import { toastError, toastSuccess } from "../../../utils/toastFunction";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
} from "../../../utils/localStorageFunction";
import { ALL_EXAM } from "../../../utils/routeConstant";
import { useSearchParams } from "react-router-dom";
import {
  STUDENT_EXAM_PAPER,
  STUDENT_SUBMIT_EXAM,
} from "../../../utils/apiUrlConstant";
import { checkExam, validateOptions } from "../../../utils/commonFunction";
import { ansArray, showExam } from "../../../utils/examPaperConstant";
import {
  ANS_INDEX,
  EXAM_PAPER,
  PAPER_ID,
} from "../../../utils/localStorageConstant";
import { EXAM_SUBMITTED, FILL_ALL_QUE } from "../../../utils/constant";
import { useExamFields } from "../../../hooks/useExamFields";
import { useApiRes } from "../../../hooks/useApiRes";

const validate = {
  answer: [{ required: true, message: "Answer Required" }],
};

export const useGiveExam = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleApiResponse } = useApiRes();
  const [searchParams] = useSearchParams();
  const { id, subject } = Object.fromEntries(searchParams.entries());
  const currQuestion = useSelector((state) => state.teacher.currQuestion);
  const examData = useSelector((state) => state.student.examPaper);
  const ansIndex = useSelector((state) => state.teacher.ansIndex);
  const error = useSelector((state) => state.student.error);

  const Options = validateOptions(examData, currQuestion);

  const validateExamData = {
    answer: examData?.questions?.[currQuestion]?.answer?.trim(),
  };

  const createExamFields = useExamFields(
    examData,
    currQuestion,
    Options,
    ansIndex
  );

  const { ansArr } = ansArray(examData);

  useEffect(() => {
    const fetchExamPaper = async () => {
      const config = {
        method: "get",
        url: STUDENT_EXAM_PAPER,
        params: { id },
      };
      const res = await dispatch(fetchData(config));
      if (
        handleApiResponse({
          statusCode: res?.payload?.statusCode,
          path: ALL_EXAM,
        })
      ) {
        return;
      }
      const { showExamData } = showExam(subject, res?.payload?.data);
      dispatch(loadExamPaper(showExamData));
    };
    dispatch(handleCurrQuestion(0));

    const isCorrectExam = checkExam(id);
    !isCorrectExam && navigate(ALL_EXAM);

    const examPaper = getLocalStorageItem(EXAM_PAPER);
    const ansIndexLocal = getLocalStorageItem(ANS_INDEX);
    if (examPaper) {
      dispatch(loadExamPaper(examPaper));
      ansIndexLocal && dispatch(initiateAnsIndex(ansIndexLocal));
    } else {
      fetchExamPaper();
    }

    window.addEventListener("storage", handleStorageChange);

    return () => {
      clearGiveExam();
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleStorageChange = (e) => {
    const { key, newValue } = e;
    console.log("newValue", newValue);

    // const examPaper = getLocalStorageItem(EXAM_PAPER);
    const ansIndexLocal = getLocalStorageItem(ANS_INDEX);
    // const decodedValue = JSON.parse(newValue.replace(/\\"/g, '"'));

    const examPaper = JSON.parse(newValue);
    console.log('examPaper', examPaper)
    if (key === EXAM_PAPER) {
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
    }
  };

  // const handleStorageChange = (e) => {
  //   console.log('event in Give Exam', e)
  //   const {key,newValue} = e
  //   const examPaper = getLocalStorageItem(EXAM_PAPER);
  //   const ansIndexLocal = getLocalStorageItem(ANS_INDEX);
  //   if (examPaper) {
  //     dispatch(loadExamPaper(examPaper));
  //     if (ansIndexLocal) {
  //       dispatch(initiateAnsIndex(ansIndexLocal));
  //     } else {
  //       dispatch(initiateExamPaper());
  //       dispatch(initiateAnsIndex(ansIndex));
  //       navigate(ALL_EXAM);
  //     }
  //   }
  // };

  const clearGiveExam = () => {
    cancelFetchData(currAbortController);
    removeLocalStorageItem(EXAM_PAPER);
    removeLocalStorageItem(ANS_INDEX);
    removeLocalStorageItem(PAPER_ID);
  };

  const handleSubmitExam = () => {
    const submitExam = async () => {
      try {
        const config = {
          method: "post",
          url: STUDENT_SUBMIT_EXAM,
          data: ansArr,
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
    ansArr.length === 7 ? submitExam() : toastError(FILL_ALL_QUE);
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
    handleSubmitExam,
    handleCancel,
  };
};
