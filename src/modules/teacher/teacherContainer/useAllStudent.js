import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getCurrUserData } from "../../../utils/currentUser";
import { cancelFetchData, currAbortController, fetchData } from "../../../redux/slices/api";
import { removeLocalStorageItem } from "../../../utils/localStorageFunction";
import {
  handleSearchField,
  loadAllStudentData,
} from "../../../redux/slices/teacher";
import { TEACHER_ALL_STUDENT } from "../../../utils/apiUrlConstant";
import { LOGIN_PAGE } from "../../../utils/routeConstant";
import { PAGE_NO, USER_DATA } from "../../../utils/localStorageConstant";
import { createInputField } from "../../../utils/formFieldConstant";

const keys = ["name", "email", "status"];

export const useAllStudent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allStudentData = useSelector((state) => state.teacher.allStudentData);
  const searchData = useSelector((state) => state.teacher.searchField);
  const {token} = getCurrUserData()

  const searchField = {
    ...createInputField("text","name","name","Name or Email"),
    isSearch:true,
    data: searchData,
    updateData: handleSearchField,
  };

  useEffect(() => {
    const fetchAllStudentData = async () => {
      const config = {
        method: "get",
        url: TEACHER_ALL_STUDENT,
        headers: { "access-token": token },
      };
      const res = await dispatch(fetchData(config));
      if (res?.payload?.statusCode === 401) {
        removeLocalStorageItem(USER_DATA);
        navigate(LOGIN_PAGE);
        return;
      }
      dispatch(loadAllStudentData(res?.payload?.data));
    };
    (!allStudentData.length && fetchAllStudentData())
    removeLocalStorageItem(PAGE_NO)
    return () => {
      cancelFetchData(currAbortController)
      dispatch(handleSearchField(""));
    };
  }, []);

  return {
    searchField,
    allStudentData,
    keys,
    searchData,
  };
};
