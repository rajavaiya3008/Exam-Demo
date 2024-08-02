import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { getCurrUserData } from "../../utils/currentUser";
import { handleError } from "../../redux/slices/user";
import { validateData } from "../../utils/validation";
import { cancelFetchData, currAbortController, fetchData } from "../../redux/slices/api";
import {
  LOGIN_PAGE,
  STUDENT_DASHBOARD,
  TEACHER_DASHBOARD,
} from "../../utils/routeConstant";
import { toastSuccess } from "../../utils/toastFunction";
import { useEffect } from "react";
import {
  confirmPasswordValidation,
  passwordValidation,
} from "../../utils/validationConstant";
import { FORGET_PASS_VERIFY } from "../../utils/apiUrlConstant";
import { hasObjectLength, isStudent } from "../../utils/commonFunction";
import { PASS_CHANGE, PASS_NOT_MATCH, PASS_TYPE } from "../../utils/constant";
import { createInputField } from "../../utils/formFieldConstant";

const validate = {
  Password: passwordValidation,
  ConfirmPassword: confirmPasswordValidation,
};

const createNewPasswordField = [
  createInputField(PASS_TYPE,"Password","Password","Password"),
  createInputField(PASS_TYPE,"ConfirmPassword","ConfirmPassword","Confirm Password")
];

export const useNewPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 const [searchParams] = useSearchParams();
  const {token} = Object.fromEntries(searchParams.entries())
  const { role } = getCurrUserData() || {};

  useEffect(() => {
    (role && navigate(isStudent() ? STUDENT_DASHBOARD :TEACHER_DASHBOARD, { replace: true }))

    return () => {
      cancelFetchData(currAbortController);
    }
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const newPasswordData = Object.fromEntries(formData.entries());
      validate.ConfirmPassword.push({
        match: true,
        comKey: newPasswordData.Password,
        message: PASS_NOT_MATCH,
      });
      const error = validateData(newPasswordData, validate);
      if (hasObjectLength(error)) {
        dispatch(handleError(error));
        validate.ConfirmPassword.pop()
        return;
      }
      const config = {
        method: "post",
        url: FORGET_PASS_VERIFY,
        data: newPasswordData,
        params: { token },
      };
      await dispatch(fetchData(config));
      validate.ConfirmPassword.pop()
      toastSuccess(PASS_CHANGE);
      navigate(LOGIN_PAGE);
    } catch (error) {
      console.log("error", error);
    }
  };

  return {
    createNewPasswordField,
    handleChangePassword,
  };
};
