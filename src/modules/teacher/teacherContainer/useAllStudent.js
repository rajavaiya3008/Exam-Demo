import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getCurrUserData } from "../../../utils/currentUser";
import { fetchData } from "../../../redux/slices/api";
import { removeLocalStorageItem } from "../../../utils/localStorageFunction";
import {
  handleSearchField,
  loadAllStudentData,
} from "../../../redux/slices/teacher";
import { teacherAllStudent } from "../../../utils/apiUrlConstant";
import { LOGIN_PAGE } from "../../../utils/routeConstant";

const keys = ["name", "email", "status"];

export const useAllStudent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allStudentData = useSelector((state) => state.teacher.allStudentData);
  const searchData = useSelector((state) => state.teacher.searchField);
  const {token} = getCurrUserData()

  const searchField = {
    type: "text",
    id: "name",
    name: "name",
    label: "Name or Email",
    data: searchData,
    updateData: handleSearchField,
  };

  useEffect(() => {
    const fetchAllStudentData = async () => {
      const config = {
        method: "get",
        url: teacherAllStudent,
        headers: { "access-token": token },
      };
      const res = await dispatch(fetchData(config));
      if (res?.payload?.statusCode === 401) {
        removeLocalStorageItem("userData");
        navigate(LOGIN_PAGE);
        return;
      }
      dispatch(loadAllStudentData(res?.payload?.data));
    };
    (!allStudentData.length && fetchAllStudentData())
    return () => {
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
