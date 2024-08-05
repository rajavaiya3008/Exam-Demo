import { useSelector } from "react-redux";
import { handleError } from "../redux/slices/user";
import { handleStudentError } from "../redux/slices/student";
import { handleTeacherError } from "../redux/slices/teacher";
import { getCurrUserData } from "../utils/currentUser";
import { isResetPassword, isStudent } from "../utils/commonFunction";
import { useLocation } from "react-router";

export const useGetError = () => {
  const { pathname } = useLocation();
  const { role } = getCurrUserData();
  const userError = useSelector((state) => state.user.error);
  const studentError = useSelector((state) => state.student.error);
  const teacherError = useSelector((state) => state.teacher.error);
  const error = { ...userError, ...studentError, ...teacherError };

  const errorHandlers = {
    user: handleError,
    student: handleStudentError,
    teacher: handleTeacherError,
  };

  return {
    error,
    handleError:
      errorHandlers[
        !role || isResetPassword(pathname)
          ? "user"
          : isStudent()
          ? "student"
          : "teacher"
      ],
  };
};
