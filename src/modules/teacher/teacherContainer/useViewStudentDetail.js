import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getCurrUserData } from "../../../utils/currentUser";
import { fetchData } from "../../../redux/slices/api";
import { removeLocalStorageItem } from "../../../utils/localStorageFunction";
import { ALL_STUDENT, LOGIN_PAGE } from "../../../utils/routeConstant";
import { loadCurrStudentDetail } from "../../../redux/slices/teacher";
import { useEffect } from "react";
import { TEACHER_VIEW_STUDENT_DETAIL } from "../../../utils/apiUrlConstant";
import { USER_DATA } from "../../../utils/localStorageConstant";

export const useViewStudentDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const {id} = Object.fromEntries(searchParams.entries())
  const currStudentDetail = useSelector(
    (state) => state.teacher.currStudentDetail
  );
  const {token} = getCurrUserData()

  useEffect(() => {
    try {
      const fetchStudentDetail = async () => {
        const config = {
          method: "get",
          url: TEACHER_VIEW_STUDENT_DETAIL,
          headers: { "access-token": token },
          params: { id },
        };
        const res = await dispatch(fetchData(config));
        if (res?.payload?.statusCode === 401) {
          removeLocalStorageItem(USER_DATA);
          navigate(LOGIN_PAGE);
          return;
        }
        if (res?.payload?.statusCode === 500) {
          navigate(ALL_STUDENT);
          return;
        }
        dispatch(loadCurrStudentDetail(res.payload.data[0]));
      };
      fetchStudentDetail();
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  const handleBack = () => {
    navigate(ALL_STUDENT);
  };

  return {
    currStudentDetail,
    handleBack,
  };
};
