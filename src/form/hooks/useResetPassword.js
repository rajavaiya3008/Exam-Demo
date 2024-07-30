import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getCurrUserData } from "../../utils/currentUser";
import {
  handleError,
} from "../../redux/slices/user";
import { validateData } from "../../utils/validation";
import { fetchData } from "../../redux/slices/api";
import { toastError, toastSuccess } from "../../utils/toastFunction";
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

const validate = {
  oldPassword: passwordValidation,
  Password: passwordValidation,
  ConfirmPassword: confirmPasswordValidation,
};

export const useResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const error = useSelector((state) => state.user.error);
  const { token } = getCurrUserData();

  const ResetPasswordFields = [
    {
      type: "password",
      id: "oldPassword",
      name: "oldPassword",
      label: "Old Password",
    },
    {
      type: "password",
      id: "Password",
      name: "Password",
      label: "Password",
    },
    {
      type: "password",
      id: "ConfirmPassword",
      name: "ConfirmPassword",
      label: "Confirm Password",
    },
  ];

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const resetPasswordData = Object.fromEntries(formData.entries());
      validate.ConfirmPassword.push({
        match: true,
        comKey: resetPasswordData.Password,
        message: "Password Do not Match",
      });
      const error = validateData(resetPasswordData, validate);
      if (hasObjectLength(error)) {
        dispatch(handleError(error));
        validate.ConfirmPassword.pop()
        return;
      }
      const config = {
        method: "post",
        url: RESET_PASS_URL,
        data: resetPasswordData,
        headers: { "access-token": `${token}` },
      };
      const res = await dispatch(fetchData(config));
      if (res.payload.statusCode === 500) {
        toastError("Old Password and New Password are same");
        return;
      }
      if (res.payload.statusCode !== 200) {
        toastError("Please check old password");
        return;
      }
      validate.ConfirmPassword.pop();
      toastSuccess("Password Reset Successfully");
      navigate(isStudent() ? STUDENT_DASHBOARD : TEACHER_DASHBOARD);
    } catch (error) {
      console.log("error", error);
    }
  };

  return {
    ResetPasswordFields,
    handleReset,
  };
};
