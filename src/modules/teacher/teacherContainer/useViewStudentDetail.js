import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  cancelFetchData,
  currAbortController,
  fetchData,
} from "../../../redux/slices/api";
import { ALL_STUDENT } from "../../../utils/routeConstant";
import { loadCurrStudentDetail } from "../../../redux/slices/teacher";
import { useEffect } from "react";
import { TEACHER_VIEW_STUDENT_DETAIL } from "../../../utils/apiUrlConstant";
import { useApiRes } from "../../../hooks/useApiRes";

export const useViewStudentDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {handleApiResponse} = useApiRes()
  const [searchParams] = useSearchParams();
  const { id } = Object.fromEntries(searchParams.entries());
  const currStudentDetail = useSelector(
    (state) => state.teacher.currStudentDetail
  );

  useEffect(() => {
    try {
      const fetchStudentDetail = async () => {
        const config = {
          method: "get",
          url: TEACHER_VIEW_STUDENT_DETAIL,
          params: { id },
        };
        const res = await dispatch(fetchData(config));
        if(handleApiResponse({statusCode:res?.payload?.statusCode,path:ALL_STUDENT})){
          return
        }
        dispatch(loadCurrStudentDetail(res.payload.data?.[0]));
      };
      fetchStudentDetail();
    } catch (error) {
      console.log("error", error);
    }
    return () => {
      cancelFetchData(currAbortController);
    };
  }, []);

  const handleBack = () => {
    navigate(ALL_STUDENT);
  };

  return {
    currStudentDetail,
    handleBack,
  };
};
