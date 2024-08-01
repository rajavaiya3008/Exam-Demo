import { useSelector } from "react-redux";
import { handleError } from "../../redux/slices/user";
import { handleStudentError } from "../../redux/slices/student";
import { handleTeacherError } from "../../redux/slices/teacher";
import { getCurrUserData } from "../../utils/currentUser";
import { isStudent } from "../../utils/commonFunction";
import { useLocation } from "react-router";
import { STUDENT_RESET_PASS, TEACHER_RESET_PASS } from "../../utils/routeConstant";
export const useGetError = () => {
    const location = useLocation();
    const isResetPassword = (location.pathname === STUDENT_RESET_PASS || location.pathname === TEACHER_RESET_PASS)
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
      errorHandlers[!role || isResetPassword ? "user" : (isStudent() ? "student" : "teacher")],
  };
};
