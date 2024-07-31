import { useDispatch } from "react-redux";
import {
  handleError,
} from "../../redux/slices/user";
import { validateData } from "../../utils/validation";
import { cancelFetchData, currAbortController, fetchData } from "../../redux/slices/api";
import { useNavigate } from "react-router";
import { toastError, toastSuccess } from "../../utils/toastFunction";
import { LOGIN_PAGE, STUDENT_DASHBOARD, TEACHER_DASHBOARD } from "../../utils/routeConstant";
import { emailValidation, nameValidation, passwordValidation } from "../../utils/validationConstant";
import { SIGNUP_URL } from "../../utils/apiUrlConstant";
import { getCurrUserData } from "../../utils/currentUser";
import { useEffect } from "react";
import { hasObjectLength, isStudent } from "../../utils/commonFunction";

const validate = {
  name: nameValidation,
  email: emailValidation,
  password: passwordValidation,
  role: [{ required: true, message: "Please Select Role" }],
};

const signupField = [
  {
    type: "text",
    id: "name",
    name: "name",
    label: "Enter Name",
  },
  {
    type: "email",
    id: "email",
    name: "email",
    label: "Enter Email",
  },
  {
    type: "password",
    id: "password",
    name: "password",
    label: "Enter Password",
  },
  {
    type:'select',
    style:'mt-[10px]',
    dropDownOptions:["student", "teacher"],
    name:"role",
  }
];

export const useSignupData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {role} = getCurrUserData();

  useEffect(() => {
    dispatch(handleError({}));
    (role && navigate(isStudent() ? STUDENT_DASHBOARD :TEACHER_DASHBOARD, { replace: true }))

    return () => {
      cancelFetchData(currAbortController);
    }
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const signupData = Object.fromEntries(formData.entries());
      const error = validateData(signupData, validate);
      if (hasObjectLength(error)) {
        dispatch(handleError(error));
        return;
      }
      const config = {
        method: "post",
        url: SIGNUP_URL,
        data: signupData,
      };
      const res = await dispatch(fetchData(config));
      if (res?.payload?.statusCode !== 200) {
        toastError("Email Already Exist Please Login");
        return;
      }
      toastSuccess("Signup Successful");
      navigate(LOGIN_PAGE, { replace: true });
    } catch (error) {
      console.log("error", error);
    }
  };

  return {
    signupField,
    handleSignup,
  };
};
