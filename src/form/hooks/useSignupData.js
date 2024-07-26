import { useDispatch, useSelector } from "react-redux";
import {
  handleError,
} from "../../redux/slices/user";
import { validateData } from "../../utils/validation";
import { fetchData } from "../../redux/slices/api";
import { useNavigate } from "react-router";
import { toastError, toastSuccess } from "../../utils/toastFunction";
import { LOGIN_PAGE, STUDENT_DASHBOARD, TEACHER_DASHBOARD } from "../../utils/routeConstant";
import { emailValidation, nameValidation, passwordValidation } from "../../utils/validationConstant";
import { signupUrl } from "../../utils/apiUrlConstant";
import { getCurrUserData } from "../../utils/currentUser";
import { useEffect } from "react";
import { hasObjectLength, isStudent } from "../../utils/commonFunction";

const validate = {
  name: nameValidation,
  email: emailValidation,
  password: passwordValidation,
  role: [{ required: true, message: "Please Select Role" }],
};

export const useSignupData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.user.error);
  const {role} = getCurrUserData();

  const signupField = [
    {
      type: "text",
      id: "name",
      name: "name",
      label: "Enter Name",
      error: error,
      clearError: handleError
    },
    {
      type: "email",
      id: "email",
      name: "email",
      label: "Enter Email",
      error: error,
      clearError: handleError
    },
    {
      type: "password",
      id: "password",
      name: "password",
      label: "Enter Password",
      error: error,
      clearError: handleError
    },
  ];

  useEffect(() => {
    dispatch(handleError({}));
    if (role) {
      navigate(isStudent() ? STUDENT_DASHBOARD :TEACHER_DASHBOARD,{replace:true});
    }
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const name = formData.get('name');
      const email = formData.get("email");
      const password = formData.get('password')
      const userRole = formData.get('role');
      const signupData = {
        name,
        email,
        password,
        role:userRole
      };
      console.log('signupData', signupData);
      const error = validateData(signupData, validate);
      if (hasObjectLength(error)) {
        dispatch(handleError(error));
        return;
      }
      const config = {
        method: "post",
        url: signupUrl,
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
