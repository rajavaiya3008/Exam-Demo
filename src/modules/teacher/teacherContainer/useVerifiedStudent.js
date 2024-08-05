import { useDispatch, useSelector } from "react-redux";
import { cancelFetchData, currAbortController, fetchData } from "../../../redux/slices/api";
import {
  handleSearchField,
  loadVerifiedStudentData,
} from "../../../redux/slices/teacher";
import { useEffect } from "react";
import { TEACHER_VERIFIED_STUDENT } from "../../../utils/apiUrlConstant";
import { createInputField } from "../../../utils/formFieldConstant";
import { useApiRes } from "../../../hooks/useApiRes";
import { TEXT_TYPE } from "../../../utils/constant";
import { useHandleInput } from "../../../hooks/useHandleInput";

const keys = ["name", "email", "status"];

export const useVerifiedStudent = () => {
  const dispatch = useDispatch();
  const {handleApiResponse} = useApiRes()
  const {handleInputChange} = useHandleInput()
  const verifiedStudentData = useSelector(
    (state) => state.teacher.verifiedStudentData
  );
  const searchData = useSelector((state) => state.teacher.searchField);
  const searchField = {
    ...createInputField(TEXT_TYPE,"name","name","Name of Email"),
    value:searchData["name"],
    updateData: handleInputChange,
  };

  useEffect(() => {
    const fetchAllStudentData = async () => {
      const config = {
        method: "get",
        url: TEACHER_VERIFIED_STUDENT,
      };
      const res = await dispatch(fetchData(config));
      if(handleApiResponse({statusCode:res?.payload?.statusCode})){
        return
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
