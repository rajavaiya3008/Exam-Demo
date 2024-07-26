import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  handleError,
  handleForgetPassword,
  initiateForgetPassword,
} from "../../redux/slices/user";
import { validateData } from "../../utils/validation";
import { fetchData } from "../../redux/slices/api";
import { toastError, toastSuccess } from "../../utils/toastFunction";
import { LOGIN_PAGE, STUDENT_DASHBOARD, TEACHER_DASHBOARD } from "../../utils/routeConstant";
import { getCurrUserData } from "../../utils/currentUser";
import { emailValidation } from "../../utils/validationConstant";
import { forgetPasswordUrl } from "../../utils/apiUrlConstant";
import { isStudent } from "../../utils/commonFunction";

const validate = {
  email: emailValidation,
};

export const useForgetData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const forgetPassword = useSelector((state) => state.user.forgetPassword);
  const error = useSelector((state) => state.user.error);
  const { role } = getCurrUserData();
  const fieldData = {
    type: "email",
    id: "email",
    name: "email",
    label: "Email",
    data: forgetPassword,
    updateData: handleForgetPassword,
    error: error,
  };

  useEffect(() => {
    dispatch(handleError({}));
    if (role) {
      navigate(isStudent ? STUDENT_DASHBOARD :TEACHER_DASHBOARD, { replace: true });
    }

    return () => {
      dispatch(initiateForgetPassword());
    };
  }, []);

  const sendMail = async () => {
    try {
      const error = validateData(forgetPassword, validate);
      if (Object.keys(error).length) {
        dispatch(handleError(error));
        return;
      }
      const config = {
        method: "post",
        url: forgetPasswordUrl,
        data: forgetPassword,
      };
      const res = await dispatch(fetchData(config));
      if (res.payload.statusCode === 500) {
        toastError("Email not Found Please SignUp");
        return;
      }
      navigate(LOGIN_PAGE);
      toastSuccess("Mail send Successful Please Check Your Email");
    } catch (error) {
      console.log("error", error);
    }
  };

  return {
    fieldData,
    sendMail,
  };
};
