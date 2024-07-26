import { useDispatch, useSelector } from "react-redux";
import {
  handleError,
  handleSignupData,
  initiateSignupData,
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
import { isStudent } from "../../utils/commonFunction";

const validate = {
  name: nameValidation,
  email: emailValidation,
  password: passwordValidation,
  role: [{ required: true, message: "Please Select Role" }],
};

export const useSignupData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signupData = useSelector((state) => state.user.signupData);
  const error = useSelector((state) => state.user.error);
  const {role} = getCurrUserData();

  const signupField = [
    {
      type: "text",
      id: "name",
      name: "name",
      label: "Enter Name",
      data: signupData,
      error: error,
      updateData: handleSignupData,
    },
    {
      type: "email",
      id: "email",
      name: "email",
      label: "Enter Email",
      data: signupData,
      error: error,
      updateData: handleSignupData,
    },
    {
      type: "password",
      id: "password",
      name: "password",
      label: "Enter Password",
      data: signupData,
      error: error,
      updateData: handleSignupData,
    },
  ];

  useEffect(() => {
    dispatch(handleError({}));

    if (role) {
      navigate(isStudent ? STUDENT_DASHBOARD :TEACHER_DASHBOARD,{replace:true});
    }

    return () => {
      dispatch(initiateSignupData());
    };
  }, []);

  const handleSignup = async () => {
    try {
      const error = validateData(signupData, validate);
      if (Object.keys(error).length) {
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
    signupData,
    handleSignup,
  };
};
