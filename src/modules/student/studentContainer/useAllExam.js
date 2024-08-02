import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getCurrUserData } from "../../../utils/currentUser";
import { cancelFetchData, currAbortController, fetchData } from "../../../redux/slices/api";
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
import { STUDENT_ALL_EXAM } from "../../../utils/apiUrlConstant";
import { PAGE_NO, USER_DATA } from "../../../utils/localStorageConstant";
import { createInputField } from "../../../utils/formFieldConstant";

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
    ...createInputField("text","subjectName","subjectName","Subject Name or Email"),
    isSearch:true,
    data: searchData,
    updateData: handleSearchField,
  };

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
      dispatch(loadAllExamData(res?.payload?.data));
    };
    !allExamData.length && fetchAllExam();
    removeLocalStorageItem(PAGE_NO)

    return () => {
      cancelFetchData(currAbortController)
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
