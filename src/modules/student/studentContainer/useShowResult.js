import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { cancelFetchData, currAbortController, fetchData } from "../../../redux/slices/api";
import { removeLocalStorageItem } from "../../../utils/localStorageFunction";
import { ALL_EXAM } from "../../../utils/routeConstant";
import { STUDENT_ALL_EXAM } from "../../../utils/apiUrlConstant";
import { PAGE_NO } from "../../../utils/localStorageConstant";
import { loadAllExamData } from "../../../redux/slices/student";
import { useApiRes } from "../../../hooks/useApiRes";

export const useShowResult = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {handleApiResponse} = useApiRes()
  const [searchParams] = useSearchParams();
  const allExamData = useSelector((state) => state.student.allExamData);
  const {id} = Object.fromEntries(searchParams.entries())
  const [result, setResult] = useState([]);

  useEffect(() => {
    const fetchAllExam = async () => {
      const config = {
        method: "get",
        url: STUDENT_ALL_EXAM,
      };
      const res = await dispatch(fetchData(config));
      if(handleApiResponse({statusCode:res?.payload?.statusCode})){
        return
      }
      removeLocalStorageItem(PAGE_NO)
      loadResult(res.payload.data)
      dispatch(loadAllExamData(res?.payload?.data))
    };
    !allExamData.length ? fetchAllExam() : loadResult(allExamData);
    return () => {
      cancelFetchData(currAbortController)
    }
  }, []);

  const loadResult = (examData) => {
    const allExams = examData;
      const finalResult = allExams.find((item) => {
        return item._id === id;
      });
      if (!finalResult) {
        navigate(ALL_EXAM);
        return;
      }
      setResult(finalResult.Result);
  }

  const handleBack = () => {
    navigate(ALL_EXAM);
  };

  return {
    result,
    handleBack,
  };
};
