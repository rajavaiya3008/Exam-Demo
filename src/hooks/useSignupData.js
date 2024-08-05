import { useDispatch } from "react-redux";
import {
  handleError,
} from "../redux/slices/user";
import { validateData } from "../utils/validation";
import { cancelFetchData, currAbortController, fetchData } from "../redux/slices/api";
import { useNavigate } from "react-router";
import { toastSuccess } from "../utils/toastFunction";
import { LOGIN_PAGE, STUDENT_DASHBOARD, TEACHER_DASHBOARD } from "../utils/routeConstant";
import { emailValidation, nameValidation, passwordValidation } from "../utils/validationConstant";
import { SIGNUP_URL } from "../utils/apiUrlConstant";
import { getCurrUserData } from "../utils/currentUser";
import { useEffect } from "react";
import { hasObjectLength, isStudent } from "../utils/commonFunction";
import { EMAIL_TYPE, PASS_TYPE, SELECT_TYPE, SIGNUP_SUCCESS, TEXT_TYPE } from "../utils/constant";
import { createDropDownField, createInputField } from "../utils/formFieldConstant";
import { useApiRes } from "./useApiRes";

const validate = {
  name: nameValidation,
  email: emailValidation,
  password: passwordValidation,
  role: [{ required: true, message: "Please Select Role" }],
};

const signupField = [
  {...createInputField(TEXT_TYPE,"name","name","Enter Name"),updateData:()=>{}},
  {...createInputField(EMAIL_TYPE,"email","email","Enter Email"),updateData:()=>{}},
  {...createInputField(PASS_TYPE,"password","password","Enter Password"),updateData:()=>{}},
  {...createDropDownField(SELECT_TYPE,'mt-[10px]',["student", "teacher"],"role"),updateData:()=>{}}
];

export const useSignupData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {handleApiResponse} = useApiRes()
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
      if(handleApiResponse({statusCode:res?.payload?.statusCode,msg:res.payload.message})){
        return
      }
      toastSuccess(SIGNUP_SUCCESS);
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
