import { useSelector } from "react-redux"
import { handleError } from "../../redux/slices/user"
import { handleStudentError } from "../../redux/slices/student"
import { handleTeacherError } from "../../redux/slices/teacher"
import { getCurrUserData } from "../../utils/currentUser"
import { isStudent } from "../../utils/commonFunction"
import { useLocation } from "react-router"
import { STUDENT_RESET_PASS, TEACHER_RESET_PASS } from "../../utils/routeConstant"

export const useGetError = () => {
    const { role } = getCurrUserData();
    const location = useLocation();
    const isReset = location.pathname === (STUDENT_RESET_PASS || TEACHER_RESET_PASS)
  
    const error = useSelector(state => {
      if (!role || isReset) {
        return state.user.error;
      } else if (isStudent()) {
        return state.student.error;
      } else {
        return state.teacher.error;
      }
    });
  
    let handleErrorFunction;
    if (!role) {
      handleErrorFunction = handleError;
    } else if (isStudent()) {
      handleErrorFunction = handleStudentError;
    } else {
      handleErrorFunction = handleTeacherError;
    }

    return { error, handleError: handleErrorFunction };
  };