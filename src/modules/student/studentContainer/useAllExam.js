import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getCurrUserData } from "../../../utils/currentUser";
import { fetchData } from "../../../redux/slices/api";
import { removeLocalStorageItem } from "../../../utils/localStorageFunction";
import {
  handleSearchField,
  loadAllExamData,
} from "../../../redux/slices/student";
import { useEffect } from "react";
import {
  GIVE_EXAM,
  LOGIN_PAGE,
  SHOW_RESULT,
} from "../../../utils/routeConstant";
import { studentAllExam } from "../../../utils/apiUrlConstant";

const keys = ["subjectName", "email"];
const btn = {
  giveExamBtn: GIVE_EXAM,
  showResultBtn: SHOW_RESULT,
};

export const useAllExam = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allExamData = useSelector((state) => state.student.allExamData);
  const searchData = useSelector((state) => state.student.searchField);
  const { token } = getCurrUserData();

  const searchField = {
    type: "text",
    id: "subjectName",
    name: "subjectName",
    label: "Subject Name or Email",
    data: searchData,
    updateData: handleSearchField,
  };

  useEffect(() => {
    const fetchAllExam = async () => {
      const config = {
        method: "get",
        url: studentAllExam,
        headers: { "access-token": token },
      };
      const res = await dispatch(fetchData(config));
      if (res?.payload?.statusCode === 401) {
        removeLocalStorageItem("userData");
        navigate(LOGIN_PAGE);
        return;
      }
      dispatch(loadAllExamData(res?.payload?.data));
    };
    if (!allExamData.length) {
      fetchAllExam();
    }

    return () => {
      dispatch(handleSearchField(""));
    };
  }, []);

  return {
    searchField,
    btn,
    keys,
    allExamData,
    searchData,
  };
};