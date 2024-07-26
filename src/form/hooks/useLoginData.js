import { useDispatch, useSelector } from "react-redux";
import {
  handleError,
  handleLoginData,
  initiateLoginData,
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
import { isStudent } from "../../utils/commonFunction";

const validate = {
  email: emailValidation,
  password: passwordValidation,
};

export const useLoginData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginData = useSelector((state) => state.user.loginData);
  const error = useSelector((state) => state.user.error);
  const { role } = getCurrUserData();

  const loginField = [
    {
      type: "email",
      id: "email",
      name: "email",
      label: `Enter Email`,
      data: loginData,
      error: error,
      updateData: handleLoginData,
    },
    {
      type: "password",
      id: "password",
      name: "password",
      label: "Enter Password",
      data: loginData,
      error: error,
      updateData: handleLoginData,
    },
  ];

  useEffect(() => {
    dispatch(handleError({}));
    if (role) {
      navigate(isStudent ? STUDENT_DASHBOARD :TEACHER_DASHBOARD, { replace: true });
    }

    return () => {
      dispatch(initiateLoginData());
    };
  }, []);

  const handleSubmit = async () => {
    try {
      const error = validateData(loginData, validate);
      if (Object.keys(error).length) {
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
