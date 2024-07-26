import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { getCurrUserData } from "../../utils/currentUser";
import { handleError } from "../../redux/slices/user";
import { validateData } from "../../utils/validation";
import { fetchData } from "../../redux/slices/api";
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
import { forgetPasswordUrl } from "../../utils/apiUrlConstant";
import { hasObjectLength, isStudent } from "../../utils/commonFunction";

const validate = {
  Password: passwordValidation,
  ConfirmPassword: confirmPasswordValidation,
};

export const useNewPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.user.error);
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { role } = getCurrUserData() || {};

  const createNewPasswordField = [
    {
      type: "password",
      id: "Password",
      name: "Password",
      label: "Password:",
      error: error,
      clearError: handleError,
    },
    {
      type: "password",
      id: "ConfirmPassword",
      name: "ConfirmPassword",
      label: "Confirm Password:",
      error: error,
      clearError: handleError,
    },
  ];

  useEffect(() => {
    if (role) {
      navigate(isStudent() ? STUDENT_DASHBOARD : TEACHER_DASHBOARD, {
        replace: true,
      });
    }
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const Password = formData.get("Password");
      const ConfirmPassword = formData.get("ConfirmPassword");
      const newPasswordData = {
        Password,
        ConfirmPassword,
      };
      validate.ConfirmPassword.push({
        match: true,
        comKey: Password,
        message: "Password Do not Match",
      });
      const error = validateData(newPasswordData, validate);
      if (hasObjectLength(error)) {
        dispatch(handleError(error));
        validate.ConfirmPassword.pop()
        return;
      }
      const config = {
        method: "post",
        url: `${forgetPasswordUrl}/Verify`,
        data: newPasswordData,
        params: { token },
      };
      const res = await dispatch(fetchData(config));
      validate.ConfirmPassword.pop()
      toastSuccess("Password Change Successfully");
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
