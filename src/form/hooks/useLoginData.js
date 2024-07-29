import { useDispatch, useSelector } from "react-redux";
import {
  handleError,
} from "../../redux/slices/user";
import { validateData } from "../../utils/validation";
import { fetchData } from "../../redux/slices/api";
import { useNavigate } from "react-router";
import { toastError, toastSuccess } from "../../utils/toastFunction";
import { setLocalStorageItem } from "../../utils/localStorageFunction";
import {
  emailValidation,
  passwordValidation,
} from "../../utils/validationConstant";
import { loginUrl } from "../../utils/apiUrlConstant";
import { getCurrUserData } from "../../utils/currentUser";
import { useEffect } from "react";
import { STUDENT_DASHBOARD, TEACHER_DASHBOARD } from "../../utils/routeConstant";
import { hasObjectLength, isStudent } from "../../utils/commonFunction";

const validate = {
  email: emailValidation,
  password: passwordValidation,
};

export const useLoginData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.user.error);
  const { role } = getCurrUserData();

  const loginField = [
    {
      type: "email",
      id: "email",
      name: "email",
      label: `Enter Email`,
      clearError: handleError,
      error: error,
    },
    {
      type: "password",
      id: "password",
      name: "password",
      label: "Enter Password",
      error: error,
      clearError: handleError,
    },
  ];

  useEffect(() => {
    dispatch(handleError({}));
    (role && navigate(isStudent() ? STUDENT_DASHBOARD :TEACHER_DASHBOARD, { replace: true }))
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData(e.target);
      const loginData = Object.fromEntries(formData.entries())
      const error = validateData(loginData, validate);
      if (hasObjectLength(error)) {
        dispatch(handleError(error));
        return;
      }
      const config = {
        method: "post",
        url: loginUrl,
        data: loginData,
      };
      const res = await dispatch(fetchData(config));
      if (res.payload.statusCode === 500) {
        toastError(res.payload.message);
        return;
      }
      toastSuccess("Login Successful");
      setLocalStorageItem("userData", res.payload.data);
      navigate(res.payload.data.role === 'student' ? STUDENT_DASHBOARD :TEACHER_DASHBOARD, { replace: true });
    } catch (error) {
      console.log("error", error);
    }
  };

  return {
    loginField,
    handleSubmit,
  };
};
