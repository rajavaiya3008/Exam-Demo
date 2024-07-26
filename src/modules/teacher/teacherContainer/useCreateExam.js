import { useDispatch, useSelector } from "react-redux";
import {
  handleAns,
  handleError,
  handleOptions,
  handleQuestion,
  handleSubject,
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

const validate = examValidation;

export const useCreateExam = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const examData = useSelector((state) => state.teacher.createExam);
  const [currQuestion, setCurrQuestion] = useState(0);
  const error = useSelector((state) => state.teacher.error);
  const sameQuestions = useSelector((state) => state.teacher.questions);
  const { token } = getCurrUserData();

  const validateExamData = {
    subjectName: examData?.subjectName,
    question: examData?.questions?.[currQuestion]?.question,
    op1: examData?.questions?.[currQuestion]?.options[0],
    op2: examData?.questions?.[currQuestion]?.options[1],
    op3: examData?.questions?.[currQuestion]?.options[2],
    op4: examData?.questions?.[currQuestion]?.options[3],
    answer: examData?.questions?.[currQuestion]?.answer?.trim(),
  };

  const Options = {
    op1: examData?.questions?.[currQuestion]?.options?.[0],
    op2: examData?.questions?.[currQuestion]?.options?.[1],
    op3: examData?.questions?.[currQuestion]?.options?.[2],
    op4: examData?.questions?.[currQuestion]?.options?.[3],
  };

  const optionArr = examData?.questions?.[currQuestion]?.options;

  const createExamFields = [
    {
      type: "text",
      id: "subject",
      name: "subjectName",
      label: "Subject Name",
      data: examData,
      updateData: handleSubject,
      error: error,
    },
    {
      type: "text",
      id: "question",
      name: "question",
      label: `Question ${currQuestion + 1}`,
      data: examData?.questions?.[currQuestion],
      updateData: handleQuestion,
      currQuestion: currQuestion,
      error: error,
    },
    {
      type: "radio",
      name: "ans",
      id: "op1",
      data: Options,
      examData: examData,
      updateData: handleAns,
      currQuestion: currQuestion,
      ans: examData?.questions?.[currQuestion]?.answer,
      opIndex: 0,
      error: error,
    },
    {
      type: "text",
      id: "op1",
      name: "op1",
      label: "Option 1",
      data: Options,
      optionArr: optionArr,
      updateData: handleOptions,
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
      updateData: handleAns,
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
      optionArr: optionArr,
      updateData: handleOptions,
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
      updateData: handleAns,
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
      optionArr: optionArr,
      updateData: handleOptions,
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
      updateData: handleAns,
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
      optionArr: optionArr,
      updateData: handleOptions,
      currQuestion: currQuestion,
      opIndex: 3,
      error: error,
    },
  ];

  useEffect(() => {
    const createExamData = getLocalStorageItem("createExam");
    const ansIndex = getLocalStorageItem("ansIndex");
    if (!createExamData) {
      dispatch(initiateExam());
      dispatch(initiateAnsIndex([]));
    } else {
      dispatch(loadExamData(createExamData));
      if (ansIndex) {
        dispatch(initiateAnsIndex(ansIndex));
      }
    }
  }, []);

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
    if (Object.keys(error).length !== 0) {
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
