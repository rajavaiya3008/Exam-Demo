import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelFetchData, currAbortController, fetchData } from "../../../redux/slices/api";
import { removeLocalStorageItem } from "../../../utils/localStorageFunction";
import {
  handleSearchField,
  loadAllStudentData,
} from "../../../redux/slices/teacher";
import { TEACHER_ALL_STUDENT } from "../../../utils/apiUrlConstant";
import { PAGE_NO } from "../../../utils/localStorageConstant";
import { createInputField } from "../../../utils/formFieldConstant";
import { useApiRes } from "../../../form/hooks/useApiRes";
import { TEXT_TYPE } from "../../../utils/constant";
import { useHandleInput } from "../../../form/hooks/useHandleInput";

const keys = ["name", "email", "status"];

export const useAllStudent = () => {
  const dispatch = useDispatch();
  const {handleApiResponse} = useApiRes()
  const {handleInputChange} = useHandleInput()
  const allStudentData = useSelector((state) => state.teacher.allStudentData);
  const searchData = useSelector((state) => state.teacher.searchField);

  const searchField = {
    ...createInputField(TEXT_TYPE,"name","name","Name or Email"),
    value:searchData?.["name"],
    updateData: handleInputChange,
    dispatchAction:handleSearchField
  };

  useEffect(() => {
    const fetchAllStudentData = async () => {
      const config = {
        method: "get",
        url: TEACHER_ALL_STUDENT,
      };
      const res = await dispatch(fetchData(config));
      if(handleApiResponse({statusCode:res?.payload?.statusCode})){
        return
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
