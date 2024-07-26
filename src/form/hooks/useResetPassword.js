import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getCurrUserData } from "../../utils/currentUser";
import {
  handleError,
  handleResetPassword,
  initiateResetPassword,
} from "../../redux/slices/user";
import { useEffect } from "react";
import { validateData } from "../../utils/validation";
import { fetchData } from "../../redux/slices/api";
import { toastError, toastSuccess } from "../../utils/toastFunction";
import { passwordValidation } from "../../utils/validationConstant";
import { isStudent } from "../../utils/commonFunction";
import { STUDENT_DASHBOARD, TEACHER_DASHBOARD } from "../../utils/routeConstant";

export const useResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const resetPassword = useSelector((state) => state.user.resetPassword);
  const error = useSelector((state) => state.user.error);
  const { token, role } = getCurrUserData();

  const ResetPasswordFields = [
    {
      type: "password",
      id: "oldPassword",
      name: "oldPassword",
      label: "Old Password",
      data: resetPassword,
      updateData: handleResetPassword,
      error: error,
    },
    {
      type: "password",
      id: "Password",
      name: "Password",
      label: "Password",
      data: resetPassword,
      updateData: handleResetPassword,
      error: error,
    },
    {
      type: "password",
      id: "ConfirmPassword",
      name: "ConfirmPassword",
      label: "Confirm Password",
      data: resetPassword,
      updateData: handleResetPassword,
      error: error,
    },
  ];

  const validate = {
    oldPassword: passwordValidation,
    Password: passwordValidation,
    ConfirmPassword: [
      { required: true, message: "Please Enter Confirm Password" },
      { length: 6, message: "Password Must be 6 char" },
      {
        match: true,
        comKey: resetPassword?.Password,
        message: "Password Do not Match",
      },
    ],
  };

  useEffect(() => {
    return () => {
      dispatch(initiateResetPassword());
    };
  }, []);

  const handleReset = async () => {
    try {
      const error = validateData(resetPassword, validate);
      if (Object.keys(error).length !== 0) {
        dispatch(handleError(error));
        return;
      }
      const config = {
        method: "post",
        url: "users/ResetPassword",
        data: resetPassword,
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
      toastSuccess("Password Reset Successfully");
      navigate(isStudent ? STUDENT_DASHBOARD :TEACHER_DASHBOARD);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleCancel = () => {
    dispatch(initiateResetPassword());
  };

  return {
    ResetPasswordFields,
    handleReset,
    handleCancel,
  };
};
