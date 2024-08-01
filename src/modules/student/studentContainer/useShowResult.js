import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { getCurrUserData } from "../../../utils/currentUser";
import { cancelFetchData, currAbortController, fetchData } from "../../../redux/slices/api";
import { removeLocalStorageItem } from "../../../utils/localStorageFunction";
import { ALL_EXAM, LOGIN_PAGE } from "../../../utils/routeConstant";
import { STUDENT_ALL_EXAM } from "../../../utils/apiUrlConstant";
import { USER_DATA } from "../../../utils/localStorageConstant";

export const useShowResult = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const allExamData = useSelector((state) => state.student.allExamData);
  const {id} = Object.fromEntries(searchParams.entries())
  const [result, setResult] = useState([]);
  const {token} = getCurrUserData()

  useEffect(() => {
    const fetchAllExam = async () => {
      const config = {
        method: "get",
        url: STUDENT_ALL_EXAM,
        headers: { "access-token": token },
      };
      const res = await dispatch(fetchData(config));
      if (res?.payload?.statusCode === 401) {
        removeLocalStorageItem(USER_DATA);
        navigate(LOGIN_PAGE);
        return;
      }
      loadResult(res.payload.data)
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

// const keys = ["subjectName", "rank", "score", "resultStatus"];
