import React from "react";
import { useNavigate } from "react-router";
import { getCurrUserData } from "../utils/currentUser";
import { LOGIN_PAGE, STUDENT_DASHBOARD, TEACHER_DASHBOARD } from "../utils/routeConstant";
import Button from "../shared/Button";
import { isStudent } from "../utils/commonFunction";

const ErrorPage = () => {
  const navigate = useNavigate();
  const { role } = getCurrUserData();

  const handleBack = () => {
    (role ? navigate(isStudent() ? STUDENT_DASHBOARD :TEACHER_DASHBOARD) : navigate(LOGIN_PAGE))
  };

  return (
    <div className="h-[100vh] flex justify-center items-center">
      <div>
        <p className="text-lg">Opps! Something went Wrong!</p>
        <Button onSubmit={handleBack} cusStyle='mt-[20px]'>
          Back
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
