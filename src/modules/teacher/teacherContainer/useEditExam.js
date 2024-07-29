import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleEdited,
  handleError,
  initiateAnsIndex,
  initiateExam,
  initiateQuestions,
  loadExamData,
} from "../../../redux/slices/teacher";
import { validateData } from "../../../utils/validation";
import { getCurrUserData } from "../../../utils/currentUser";
import { fetchData } from "../../../redux/slices/api";
import { useNavigate } from "react-router";
import { LOGIN_PAGE, VIEW_EXAM } from "../../../utils/routeConstant";
import { toastSuccess } from "../../../utils/toastFunction";
import { removeLocalStorageItem } from "../../../utils/localStorageFunction";
import { useSearchParams } from "react-router-dom";
import { getEditExam, teacherDeleteExam, teacherEditExam } from "../../../utils/apiUrlConstant";
import { examValidation } from "../../../utils/validationConstant";
import { hasDuplicates, hasObjectLength, validateOptions, validationExamData } from "../../../utils/commonFunction";
import { editData, examFields } from "../../../utils/examDataConstatnt";

const validate = examValidation

export const useEditExam = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const subjectName = searchParams.get("subject");
  const examData = useSelector((state) => state.teacher.createExam);
  const sameQuestions = useSelector((state) => state.teacher.questions);
  const [currQuestion, setCurrQuestion] = useState(0);
  const error = useSelector((state) => state.teacher.error);
  const edited = useSelector((state) => state.teacher.edited);
  const { token } = getCurrUserData();

  const validateExamData = validationExamData(examData,currQuestion);

  const Options = validateOptions(examData,currQuestion);

  const optionArr = examData?.questions?.[currQuestion]?.options;

  const createExamFields = examFields(examData,error,currQuestion,Options)

  useEffect(() => {
    try {
      const fetchEditExamData = async () => {
        const config = {
          method: "get",
          url: getEditExam,
          headers: { "access-token": token },
          params: { id },
        };
        const res = await dispatch(fetchData(config));
        if (res?.payload?.statusCode === 401) {
          removeLocalStorageItem("userData");
          navigate(LOGIN_PAGE);
          return;
        }
        if (res?.payload?.statusCode === 500) {
          navigate(VIEW_EXAM);
          return;
        }
        const {editExamData,ansArr} = editData(subjectName,res.payload?.data?.questions)
        dispatch(loadExamData(editExamData));
        dispatch(initiateAnsIndex(ansArr));
        dispatch(handleEdited());
        dispatch(initiateQuestions([]));
      };
      fetchEditExamData();
    } catch (error) {
      console.log("error", error);
    }

    return () => {
      dispatch(initiateExam());
      dispatch(initiateAnsIndex([]));
      dispatch(initiateQuestions([]));
      dispatch(handleEdited());
      removeLocalStorageItem("createExam");
      removeLocalStorageItem("ansIndex");
    };
  }, []);

  const handleEditExam = async () => {
    try {
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
      const config = {
        method: "put",
        url: teacherEditExam,
        data: examData,
        headers: { "access-token": token },
        params: { id },
      };
      const res = await dispatch(fetchData(config));
      toastSuccess("Exam Edited Successfully");
      navigate(VIEW_EXAM);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleDeleteExam = () => {
    try {
      const bool = window.confirm("are you sure?");
      if (!bool) {
        return;
      }
      const deleteExam = async () => {
        const config = {
          method: "delete",
          url: teacherDeleteExam,
          headers: { "access-token": token },
          params: { id },
        };
        const res = await dispatch(fetchData(config));
        toastSuccess("exam deleted successfully");
        navigate(VIEW_EXAM);
      };
      deleteExam();
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleCancel = () => {
    navigate(VIEW_EXAM);
  };

  return {
    createExamFields,
    currQuestion,
    edited,
    validateExamData,
    validate,
    examData,
    error,
    setCurrQuestion,
    handleEditExam,
    handleDeleteExam,
    handleCancel,
  };
};
