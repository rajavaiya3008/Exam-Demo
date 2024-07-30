import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { getCurrUserData } from "../../../utils/currentUser";
import { fetchData } from "../../../redux/slices/api";
import { removeLocalStorageItem } from "../../../utils/localStorageFunction";
import { ALL_EXAM, LOGIN_PAGE } from "../../../utils/routeConstant";
import { STUDENT_ALL_EXAM } from "../../../utils/apiUrlConstant";
import { USER_DATA } from "../../../utils/localStorageConstant";

export const useShowResult = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
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
      const allExams = res.payload.data;
      const finalResult = allExams.find((item) => {
        return item._id === id;
      });
      if (!finalResult) {
        navigate(ALL_EXAM);
        return;
      }
      setResult(finalResult.Result);
    };
    fetchAllExam();
  }, []);

  const handleBack = () => {
    navigate(ALL_EXAM);
  };

  return {
    result,
    handleBack,
  };
};

// const keys = ["subjectName", "rank", "score", "resultStatus"];
