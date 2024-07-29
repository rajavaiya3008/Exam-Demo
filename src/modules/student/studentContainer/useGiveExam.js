import { useDispatch, useSelector } from "react-redux";
import { getCurrUserData } from "../../../utils/currentUser";
import {
  cancelExam,
  initiateExamPaper,
  loadAllExamData,
  loadExamPaper,
} from "../../../redux/slices/student";
import { fetchData } from "../../../redux/slices/api";
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
import { studentExamPaper, studentSubmitExam } from "../../../utils/apiUrlConstant";
import { validateOptions } from "../../../utils/commonFunction";
import { ansArray, examPaperFields, showExam } from "../../../utils/examPaperConstant";

const validate = {
  answer: [{ required: true, message: "Answer Required" }],
};

export const useGiveExam = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const subject = searchParams.get("subject");
  const [currQuestion, setCurrQuestion] = useState(0);
  const examData = useSelector((state) => state.student.examPaper);
  const ansIndex = useSelector((state) => state.teacher.ansIndex);
  const error = useSelector((state) => state.student.error);
  const { token,role } = getCurrUserData();

  const Options = validateOptions(examData,currQuestion);

  const validateExamData = {
    answer: examData?.questions?.[currQuestion]?.answer?.trim(),
  };

  const createExamFields = examPaperFields(examData, error, currQuestion, Options)

  const {ansArr} = ansArray(examData)

  useEffect(() => {
    const fetchExamPaper = async () => {
      const config = {
        method: "get",
        url: studentExamPaper,
        headers: { "access-token": getCurrUserData().token },
        params: { id },
      };
      const res = await dispatch(fetchData(config));
      if (res?.payload?.statusCode === 401) {
        removeLocalStorageItem("userData");
        navigate(LOGIN_PAGE);
        return;
      }
      if (res?.payload?.statusCode === 500) {
        navigate(ALL_EXAM);
        return;
      }
      const {showExamData} = showExam(subject,res?.payload?.data)
      dispatch(loadExamPaper(showExamData));
    };
    const examPaper = getLocalStorageItem("examPaper");
    if (examPaper) {
      dispatch(loadExamPaper(examPaper));
      const ansIndexLocal = getLocalStorageItem("ansIndex");
      dispatch(initiateAnsIndex(ansIndexLocal));
    } else {
      fetchExamPaper();
    }
    const handleStorageChange = () => {
      const examPaper = getLocalStorageItem("examPaper");
      const ansIndexLocal = getLocalStorageItem("ansIndex");
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
      removeLocalStorageItem('examPaper')
      removeLocalStorageItem('ansIndex')
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // useEffect(() => {
  //   const handleStorageChange = () => {
  //     const examPaper = getLocalStorageItem("examPaper");
  //     if (examPaper) {
  //       dispatch(loadExamPaper(getLocalStorageItem("examPaper")));
  //       const ansIndexLocal = getLocalStorageItem("ansIndex");
  //       if (ansIndexLocal && ansIndex.length) {
  //         dispatch(initiateAnsIndex(ansIndexLocal));
  //       } else {
  //         dispatch(initiateExamPaper({}));
  //         dispatch(initiateAnsIndex(ansIndex));
  //         navigate(ALL_EXAM);
  //       }
  //     }
  //   };

  //   window.addEventListener("storage", handleStorageChange);

  //   return () => {
  //     window.removeEventListener("storage", handleStorageChange);
  //   };
  // }, []);

  const handleSubmitExam = () => {
    const submitExam = async () => {
      try {
        const config = {
          method: "post",
          url: studentSubmitExam,
          data: ansArr,
          headers: { "access-token": token },
          params: { id },
        };
        dispatch(loadAllExamData([]));
        const res = await dispatch(fetchData(config));
        toastSuccess("Exam Submitted Successfully");
        navigate(ALL_EXAM);
      } catch (error) {
        console.log("error", error);
      }
    };
    (ansArr.length === 7 ? submitExam() : toastError("Please Fill all Questions"))
  };

  const handleCancel = () => {
    dispatch(cancelExam());
    dispatch(initiateAnsIndex([]));
    removeLocalStorageItem("ansIndex");
    removeLocalStorageItem("examPaper");
    navigate(ALL_EXAM);
  };

  return {
    createExamFields,
    currQuestion,
    examData,
    role,
    validateExamData,
    validate,
    error,
    setCurrQuestion,
    handleSubmitExam,
    handleCancel,
  };
};
