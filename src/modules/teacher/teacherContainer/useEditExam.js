import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleCurrQuestion,
  handleEdited,
  handleTeacherError,
  initiateAnsIndex,
  initiateExam,
  initiateQuestions,
  loadExamData,
  loadViewExamData,
} from "../../../redux/slices/teacher";
import { validateData } from "../../../utils/validation";
import { cancelFetchData, currAbortController, fetchData } from "../../../redux/slices/api";
import { useNavigate } from "react-router";
import { VIEW_EXAM } from "../../../utils/routeConstant";
import { toastSuccess } from "../../../utils/toastFunction";
import { removeLocalStorageItem } from "../../../utils/localStorageFunction";
import { useSearchParams } from "react-router-dom";
import { GET_EDIT_EXAM, TEACHER_DELETE_EXAM, TEACHER_EDIT_EXAM } from "../../../utils/apiUrlConstant";
import { examValidation } from "../../../utils/validationConstant";
import { hasDuplicates, hasObjectLength, validateOptions, validationExamData } from "../../../utils/commonFunction";
import { editData, sameOptionMsg, sameQuestionMsg } from "../../../utils/examDataConstant";
import { ANS_INDEX, CREATE_EXAM_CONST } from "../../../utils/localStorageConstant";
import { EXAM_DELETED, EXAM_EDITED } from "../../../utils/constant";
import { useExamFields } from "../../../form/hooks/useExamFields";
import { useApiRes } from "../../../form/hooks/useApiRes";

const validate = examValidation

export const useEditExam = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {handleApiResponse} = useApiRes()
  const [searchParams] = useSearchParams();
  const {id,subject:subjectName} = Object.fromEntries(searchParams.entries())
  const examData = useSelector((state) => state.teacher.createExam);
  const sameQuestions = useSelector((state) => state.teacher.questions);
  const currQuestion = useSelector(state => state.teacher.currQuestion)
  const error = useSelector((state) => state.teacher.error);
  const edited = useSelector((state) => state.teacher.edited);
  const ansIndex = useSelector(state => state.teacher.ansIndex)

  const validateExamData = validationExamData(examData,currQuestion);

  const Options = validateOptions(examData,currQuestion);

  const optionArr = examData?.questions?.[currQuestion]?.options;

  const createExamFields = useExamFields(examData,currQuestion,Options,ansIndex)

  useEffect(() => {
    try {
      const fetchEditExamData = async () => {
        const config = {
          method: "get",
          url: GET_EDIT_EXAM,
          params: { id },
        };
        const res = await dispatch(fetchData(config));
        if(handleApiResponse({statusCode:res?.payload?.statusCode,path:VIEW_EXAM})){
          return
        }
        const {editExamData,ansArr} = editData(subjectName,res.payload?.data?.questions)
        dispatch(handleCurrQuestion(0));
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
      clearEditExam()
    };
  }, []);

  const clearEditExam = () => {
      cancelFetchData(currAbortController);
      dispatch(initiateExam());
      dispatch(initiateAnsIndex([]));
      dispatch(initiateQuestions([]));
      dispatch(handleEdited());
      removeLocalStorageItem(CREATE_EXAM_CONST);
      removeLocalStorageItem(ANS_INDEX);
  }

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
        params: { id },
      };
      dispatch(loadViewExamData([]))
      await dispatch(fetchData(config));
      toastSuccess(EXAM_EDITED);
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
          params: { id },
        };
        await dispatch(fetchData(config));
        toastSuccess(EXAM_DELETED);
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
    handleEditExam,
    handleDeleteExam,
    handleCancel,
  };
};