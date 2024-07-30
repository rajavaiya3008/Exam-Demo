import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleEdited,
  handleTeacherError,
  initiateAnsIndex,
  initiateExam,
  initiateQuestions,
  loadExamData,
  loadViewExamData,
} from "../../../redux/slices/teacher";
import { validateData } from "../../../utils/validation";
import { getCurrUserData } from "../../../utils/currentUser";
import { fetchData } from "../../../redux/slices/api";
import { useNavigate } from "react-router";
import { LOGIN_PAGE, VIEW_EXAM } from "../../../utils/routeConstant";
import { toastSuccess } from "../../../utils/toastFunction";
import { removeLocalStorageItem } from "../../../utils/localStorageFunction";
import { useSearchParams } from "react-router-dom";
import { GET_EDIT_EXAM, TEACHER_DELETE_EXAM, TEACHER_EDIT_EXAM } from "../../../utils/apiUrlConstant";
import { examValidation } from "../../../utils/validationConstant";
import { hasDuplicates, hasObjectLength, validateOptions, validationExamData } from "../../../utils/commonFunction";
import { editData, examFields, sameOptionMsg, sameQuestionMsg } from "../../../utils/examDataConstatnt";
import { ANS_INDEX, CREATE_EXAM_CONST, USER_DATA } from "../../../utils/localStorageConstant";

const validate = examValidation

export const useEditExam = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const {id,subject:subjectName} = Object.fromEntries(searchParams.entries())
  const examData = useSelector((state) => state.teacher.createExam);
  const sameQuestions = useSelector((state) => state.teacher.questions);
  const [currQuestion, setCurrQuestion] = useState(0);
  const error = useSelector((state) => state.teacher.error);
  const edited = useSelector((state) => state.teacher.edited);
  const { token } = getCurrUserData();

  const validateExamData = validationExamData(examData,currQuestion);

  const Options = validateOptions(examData,currQuestion);

  const optionArr = examData?.questions?.[currQuestion]?.options;

  const createExamFields = examFields(examData,currQuestion,Options)

  useEffect(() => {
    try {
      const fetchEditExamData = async () => {
        const config = {
          method: "get",
          url: GET_EDIT_EXAM,
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
      removeLocalStorageItem(CREATE_EXAM_CONST);
      removeLocalStorageItem(ANS_INDEX);
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
      const config = {
        method: "put",
        url: TEACHER_EDIT_EXAM,
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
          url: TEACHER_DELETE_EXAM,
          headers: { "access-token": token },
          params: { id },
        };
        const res = await dispatch(fetchData(config));
        toastSuccess("exam deleted successfully");
        dispatch(loadViewExamData([]))
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