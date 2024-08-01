import { useDispatch } from "react-redux";
import { handleError } from "../../redux/slices/user";
import { validateData } from "../../utils/validation";
import { cancelFetchData, currAbortController, fetchData } from "../../redux/slices/api";
import { useNavigate } from "react-router";
import { toastError, toastSuccess } from "../../utils/toastFunction";
import { setLocalStorageItem } from "../../utils/localStorageFunction";
import {
  emailValidation,
  passwordValidation,
} from "../../utils/validationConstant";
import { LOGIN_URL } from "../../utils/apiUrlConstant";
import { getCurrUserData } from "../../utils/currentUser";
import { useEffect } from "react";
import {
  STUDENT_DASHBOARD,
  TEACHER_DASHBOARD,
} from "../../utils/routeConstant";
import { hasObjectLength, isStudent } from "../../utils/commonFunction";
import { USER_DATA } from "../../utils/localStorageConstant";
import { LOGIN_SUCCESS } from "../../utils/constant";
import { createInputField } from "../../utils/formFieldConstatnt";

const validate = {
  email: emailValidation,
  password: passwordValidation,
};

const loginField = [
  createInputField("email","email","email","Enter Email"),
  createInputField("password","password","password","Enter Password"),
];

export const useLoginData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { role } = getCurrUserData();

  useEffect(() => {
    dispatch(handleError({}));
    role &&
      navigate(isStudent() ? STUDENT_DASHBOARD : TEACHER_DASHBOARD, {
        replace: true,
      });

      return () => {
        cancelFetchData(currAbortController);
      }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const loginData = Object.fromEntries(formData.entries());
      const error = validateData(loginData, validate);
      if (hasObjectLength(error)) {
        dispatch(handleError(error));
        return;
      }
      const config = {
        method: "post",
        url: LOGIN_URL,
        data: loginData,
      };
      const res = await dispatch(fetchData(config));
      if (res.payload.statusCode === 500) {
        toastError(res.payload.message);
        return;
      }
      toastSuccess(LOGIN_SUCCESS);
      setLocalStorageItem(USER_DATA, res.payload.data);
      navigate(isStudent() ? STUDENT_DASHBOARD : TEACHER_DASHBOARD, {
        replace: true,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  return {
    loginField,
    handleSubmit,
  };
};
