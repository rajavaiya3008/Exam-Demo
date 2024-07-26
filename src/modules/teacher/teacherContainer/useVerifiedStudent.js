import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getCurrUserData } from "../../../utils/currentUser";
import { fetchData } from "../../../redux/slices/api";
import { removeLocalStorageItem } from "../../../utils/localStorageFunction";
import {
  handleSearchField,
  loadVerifiedStudentData,
} from "../../../redux/slices/teacher";
import { useEffect } from "react";
import { teacherVerifiedStudent } from "../../../utils/apiUrlConstant";
import { LOGIN_PAGE } from "../../../utils/routeConstant";

const keys = ["name", "email", "status"];

export const useVerifiedStudent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const verifiedStudentData = useSelector(
    (state) => state.teacher.verifiedStudentData
  );
  const searchData = useSelector((state) => state.teacher.searchField);
  const searchField = {
    type: "text",
    id: "name",
    name: "name",
    label: "Name of Email",
    data: searchData,
    updateData: handleSearchField,
  };

  useEffect(() => {
    const fetchAllStudentData = async () => {
      const config = {
        method: "get",
        url: teacherVerifiedStudent,
        headers: { "access-token": getCurrUserData().token },
      };
      const res = await dispatch(fetchData(config));
      if (res?.payload?.statusCode === 401) {
        removeLocalStorageItem("userData");
        navigate(LOGIN_PAGE);
        return;
      }
      dispatch(loadVerifiedStudentData(res?.payload?.data));
    };
    (verifiedStudentData.length && fetchAllStudentData())
  }, []);

  return {
    searchField,
    verifiedStudentData,
    keys,
    searchData,
  };
};
