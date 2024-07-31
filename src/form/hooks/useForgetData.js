import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { handleError } from "../../redux/slices/user";
import { validateData } from "../../utils/validation";
import { cancelFetchData, currAbortController, fetchData } from "../../redux/slices/api";
import { toastError, toastSuccess } from "../../utils/toastFunction";
import {
  LOGIN_PAGE,
  STUDENT_DASHBOARD,
  TEACHER_DASHBOARD,
} from "../../utils/routeConstant";
import { getCurrUserData } from "../../utils/currentUser";
import { emailValidation } from "../../utils/validationConstant";
import { FORGET_PASS_URL } from "../../utils/apiUrlConstant";
import { hasObjectLength, isStudent } from "../../utils/commonFunction";

const validate = {
  email: emailValidation,
};

const fieldData = [
  {
    type: "email",
    id: "email",
    name: "email",
    label: "Email",
  },
];

export const useForgetData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { role } = getCurrUserData();

  useEffect(() => {
    dispatch(handleError({}));
    (role && navigate(isStudent() ? STUDENT_DASHBOARD :TEACHER_DASHBOARD, { replace: true }))

    return () => {
      cancelFetchData(currAbortController);
    }
  }, []);

  const sendMail = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const forgetData = Object.fromEntries(formData.entries());
      const error = validateData(forgetData, validate);
      if (hasObjectLength(error)) {
        dispatch(handleError(error));
        return;
      }
      const config = {
        method: "post",
        url: FORGET_PASS_URL,
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
