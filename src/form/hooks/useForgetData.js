import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { handleError } from "../../redux/slices/user";
import { validateData } from "../../utils/validation";
import { fetchData } from "../../redux/slices/api";
import { toastError, toastSuccess } from "../../utils/toastFunction";
import {
  LOGIN_PAGE,
  STUDENT_DASHBOARD,
  TEACHER_DASHBOARD,
} from "../../utils/routeConstant";
import { getCurrUserData } from "../../utils/currentUser";
import { emailValidation } from "../../utils/validationConstant";
import { forgetPasswordUrl } from "../../utils/apiUrlConstant";
import { hasObjectLength, isStudent } from "../../utils/commonFunction";

const validate = {
  email: emailValidation,
};

export const useForgetData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.user.error);
  const { role } = getCurrUserData();
  const fieldData = {
    type: "email",
    id: "email",
    name: "email",
    label: "Email",
    clearError: handleError,
    error: error,
  };

  useEffect(() => {
    dispatch(handleError({}))
    if (role) {
      navigate(isStudent() ? STUDENT_DASHBOARD : TEACHER_DASHBOARD, {
        replace: true,
      });
    }
  }, []);

  const sendMail = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const email = formData.get("email");
      const forgetData = {
        email,
      };
      const error = validateData(forgetData, validate);
      if (hasObjectLength(error)) {
        dispatch(handleError(error));
        return;
      }
      const config = {
        method: "post",
        url: forgetPasswordUrl,
        data: forgetData,
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
