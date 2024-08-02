import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getCurrUserData } from "../../../utils/currentUser";
import { cancelFetchData, currAbortController, fetchData } from "../../../redux/slices/api";
import { removeLocalStorageItem } from "../../../utils/localStorageFunction";
import {
  handleSearchField,
  loadVerifiedStudentData,
} from "../../../redux/slices/teacher";
import { useEffect } from "react";
import { TEACHER_VERIFIED_STUDENT } from "../../../utils/apiUrlConstant";
import { LOGIN_PAGE } from "../../../utils/routeConstant";
import { USER_DATA } from "../../../utils/localStorageConstant";
import { createInputField } from "../../../utils/formFieldConstant";

const keys = ["name", "email", "status"];

export const useVerifiedStudent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const verifiedStudentData = useSelector(
    (state) => state.teacher.verifiedStudentData
  );
  const searchData = useSelector((state) => state.teacher.searchField);
  const searchField = {
    ...createInputField("text","name","name","Name of Email"),
    data: searchData,
    updateData: handleSearchField,
  };

  useEffect(() => {
    const fetchAllStudentData = async () => {
      const config = {
        method: "get",
        url: TEACHER_VERIFIED_STUDENT,
        headers: { "access-token": getCurrUserData().token },
      };
      const res = await dispatch(fetchData(config));
      if (res?.payload?.statusCode === 401) {
        removeLocalStorageItem(USER_DATA);
        navigate(LOGIN_PAGE);
        return;
      }
      dispatch(loadVerifiedStudentData(res?.payload?.data));
    };
    (verifiedStudentData.length && fetchAllStudentData())
    return () => {
      cancelFetchData(currAbortController)
    }
  }, []);

  return {
    searchField,
    verifiedStudentData,
    keys,
    searchData,
  };
};
