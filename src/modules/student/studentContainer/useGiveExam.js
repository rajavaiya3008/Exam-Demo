import { useDispatch, useSelector } from "react-redux";
import { getCurrUserData } from "../../../utils/currentUser";
import {
  cancelExam,
  handleStudentAns,
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

  const Options = {
    op1: examData?.questions?.[currQuestion]?.options[0],
    op2: examData?.questions?.[currQuestion]?.options[1],
    op3: examData?.questions?.[currQuestion]?.options[2],
    op4: examData?.questions?.[currQuestion]?.options[3],
  };

  const validateExamData = {
    answer: examData?.questions?.[currQuestion]?.answer?.trim(),
  };

  const createExamFields = [
    {
      type: "text",
      id: "subject",
      name: "subjectName",
      label: "Subject Name",
      data: examData,
      disable: true,
      error: error,
    },
    {
      type: "text",
      id: "question",
      name: "question",
      label: `Question ${currQuestion + 1}`,
      data: examData?.questions?.[currQuestion],
      disable: true,
      currQuestion: currQuestion,
      error: error,
    },
    {
      type: "radio",
      name: "ans",
      id: "op1",
      data: Options,
      examData: examData,
      updateData: handleStudentAns,
      currQuestion: currQuestion,
      ans: examData?.questions?.[currQuestion]?.answer,
      opIndex: 0,
      ansIndex: 0,
      error: error,
    },
    {
      type: "text",
      id: "op1",
      name: "op1",
      label: "Option 1",
      data: Options,
      disable: true,
      currQuestion: currQuestion,
      opIndex: 0,
      error: error,
    },
    {
      type: "radio",
      name: "ans",
      id: "op2",
      data: Options,
      examData: examData,
      updateData: handleStudentAns,
      currQuestion: currQuestion,
      ans: examData?.questions?.[currQuestion]?.answer,
      opIndex: 1,
      error: error,
    },
    {
      type: "text",
      id: "op2",
      name: "op2",
      label: "Option 2",
      data: Options,
      disable: true,
      currQuestion: currQuestion,
      opIndex: 1,
      error: error,
    },
    {
      type: "radio",
      name: "ans",
      id: "op3",
      data: Options,
      examData: examData,
      updateData: handleStudentAns,
      currQuestion: currQuestion,
      ans: examData?.questions?.[currQuestion]?.answer,
      opIndex: 2,
      error: error,
    },
    {
      type: "text",
      id: "op3",
      name: "op3",
      label: "Option 3",
      data: Options,
      disable: true,
      currQuestion: currQuestion,
      opIndex: 2,
      error: error,
    },
    {
      type: "radio",
      name: "ans",
      id: "op4",
      data: Options,
      examData: examData,
      updateData: handleStudentAns,
      currQuestion: currQuestion,
      ans: examData?.questions?.[currQuestion]?.answer,
      opIndex: 3,
      error: error,
    },
    {
      type: "text",
      id: "op4",
      name: "op4",
      label: "Option 4",
      data: Options,
      disable: true,
      currQuestion: currQuestion,
      opIndex: 3,
      error: error,
    },
  ];

  const ansArr = examData?.questions?.reduce((acc, curr) => {
    const obj = {
      question: curr._id,
      answer: curr.answer,
    };
    if (curr.answer !== undefined) {
      acc.push(obj);
    }
    return acc;
  }, []);

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
      let examPaper = {
        subjectName: subject,
        notes: [""],
      };
      examPaper.questions = res.payload.data;
      dispatch(loadExamPaper(examPaper));
    };
    const examPaper = getLocalStorageItem("examPaper");
    if (examPaper) {
      dispatch(loadExamPaper(getLocalStorageItem("examPaper")));
      const ansIndexLocal = getLocalStorageItem("ansIndex");
      dispatch(initiateAnsIndex(ansIndexLocal));
    } else {
      fetchExamPaper();
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const examPaper = getLocalStorageItem("examPaper");
      if (examPaper) {
        dispatch(loadExamPaper(getLocalStorageItem("examPaper")));
        const ansIndexLocal = getLocalStorageItem("ansIndex");
        if (ansIndexLocal && ansIndex.length) {
          dispatch(initiateAnsIndex(ansIndexLocal));
        } else {
          dispatch(initiateExamPaper({}));
          dispatch(initiateAnsIndex(ansIndex));
          navigate(ALL_EXAM);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleSubmitExam = () => {
    if (ansArr.length === 7) {
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
      submitExam();
    } else {
      toastError("Please Fill all Questions");
    }
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
