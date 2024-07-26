import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { getCurrUserData } from "../../utils/currentUser";
import { handleError, handleNewPassword } from "../../redux/slices/user";
import { validateData } from "../../utils/validation";
import { fetchData } from "../../redux/slices/api";
import { LOGIN_PAGE, STUDENT_DASHBOARD, TEACHER_DASHBOARD } from "../../utils/routeConstant";
import { toastSuccess } from "../../utils/toastFunction";
import { useEffect } from "react";
import { passwordValidation } from "../../utils/validationConstant";
import { forgetPasswordUrl } from "../../utils/apiUrlConstant";
import { isStudent } from "../../utils/commonFunction";

export const useNewPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newPassword = useSelector((state) => state.user.newPassword);
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
      data: newPassword,
      updateData: handleNewPassword,
      error: error,
    },
    {
      type: "password",
      id: "ConfirmPassword",
      name: "ConfirmPassword",
      label: "Confirm Password:",
      data: newPassword,
      updateData: handleNewPassword,
      error: error,
    },
  ];

  const validate = {
    Password: passwordValidation,
    ConfirmPassword: [
      { required: true, message: "Please Enter Password" },
      { length: 6, message: "Password Must be 6 char" },
      {
        match: true,
        comKey: newPassword.Password,
        message: "Password Do not Match",
      },
    ],
  };

  useEffect(() => {
    if (role) {
      navigate(isStudent ? STUDENT_DASHBOARD :TEACHER_DASHBOARD, { replace: true });
    }
  }, []);

  const handleChangePassword = async () => {
    try {
      const error = validateData(newPassword, validate);
      if (Object.keys(error).length) {
        dispatch(handleError(error));
        return;
      }
      const config = {
        method: "post",
        url: `${forgetPasswordUrl}/Verify`,
        data: newPassword,
        params: { token },
      };
      const res = await dispatch(fetchData(config));
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
