import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { handleError } from "../../redux/slices/user";
import { validateData } from "../../utils/validation";
import { cancelFetchData, currAbortController, fetchData } from "../../redux/slices/api";
import { toastSuccess } from "../../utils/toastFunction";
import {
  confirmPasswordValidation,
  passwordValidation,
} from "../../utils/validationConstant";
import { hasObjectLength, isStudent } from "../../utils/commonFunction";
import {
  STUDENT_DASHBOARD,
  TEACHER_DASHBOARD,
} from "../../utils/routeConstant";
import { RESET_PASS_URL } from "../../utils/apiUrlConstant";
import { useEffect, useRef } from "react";
import { PASS_NOT_MATCH, PASS_RESET, PASS_TYPE } from "../../utils/constant";
import { createInputField } from "../../utils/formFieldConstant";
import { useApiRes } from "./useApiRes";

const validate = {
  oldPassword: passwordValidation,
  Password: passwordValidation,
  ConfirmPassword: confirmPasswordValidation,
};

const ResetPasswordFields = [
  createInputField(PASS_TYPE,"oldPassword","oldPassword","Old Password"),
  createInputField(PASS_TYPE,"Password","Password","Password"),
  createInputField(PASS_TYPE,"ConfirmPassword","ConfirmPassword","Confirm Password")
];

export const useResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {handleApiResponse} = useApiRes()
  const resetPass = useRef()

  useEffect(() => {
    dispatch(handleError({}))
    return () => {
      cancelFetchData(currAbortController);
    };
  }, []);

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const resetPasswordData = Object.fromEntries(formData.entries());
      validate.ConfirmPassword.push({
        match: true,
        comKey: resetPasswordData.Password,
        message: PASS_NOT_MATCH,
      });
      const error = validateData(resetPasswordData, validate);
      if (hasObjectLength(error)) {
        dispatch(handleError(error));
        validate.ConfirmPassword.pop();
        return;
      }
      const config = {
        method: "post",
        url: RESET_PASS_URL,
        data: resetPasswordData,
      };
      const res = await dispatch(fetchData(config));

      if(handleApiResponse({statusCode:res.payload.statusCode,msg:res.payload.message})){
        return
      }
      validate.ConfirmPassword.pop();
      toastSuccess(PASS_RESET);
      navigate(isStudent() ? STUDENT_DASHBOARD : TEACHER_DASHBOARD);
    } catch (error) {
      console.log("error", error);
    }
  };

  const clearPass = () => {
    resetPass.current.reset()
    dispatch(handleError({}))
  }

  return {
    ResetPasswordFields,
    resetPass,
    handleReset,
    clearPass
  };
};
