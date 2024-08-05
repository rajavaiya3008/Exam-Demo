import { useDispatch, useSelector } from "react-redux";
import { cancelFetchData, currAbortController, fetchData } from "../../../redux/slices/api";
import { removeLocalStorageItem } from "../../../utils/localStorageFunction";
import {
  handleSearchField,
  loadAllExamData,
} from "../../../redux/slices/student";
import { useEffect } from "react";
import {
  GIVE_EXAM,
  SHOW_RESULT,
} from "../../../utils/routeConstant";
import { STUDENT_ALL_EXAM } from "../../../utils/apiUrlConstant";
import { PAGE_NO } from "../../../utils/localStorageConstant";
import { createInputField } from "../../../utils/formFieldConstant";
import { useApiRes } from "../../../hooks/useApiRes";
import { TEXT_TYPE } from "../../../utils/constant";
import { useHandleInput } from "../../../hooks/useHandleInput";

const keys = ["subjectName", "email"];
const btn = {
  giveExamBtn: GIVE_EXAM,
  showResultBtn: SHOW_RESULT,
};

export const useAllExam = () => {
  const dispatch = useDispatch();
  const {handleApiResponse} = useApiRes()
  const {handleInputChange} = useHandleInput()
  const allExamData = useSelector((state) => state.student.allExamData);
  const searchData = useSelector((state) => state.student.searchField);

  const searchField = {
    ...createInputField(TEXT_TYPE,"subjectName","subjectName","Subject Name or Email"),
    value:searchData?.["subjectName"],
    updateData: handleInputChange,
    dispatchAction:handleSearchField
  };

  useEffect(() => {
    const fetchAllExam = async () => {
      const config = {
        method: "get",
        url: STUDENT_ALL_EXAM,
      };
      const res = await dispatch(fetchData(config));
      if(handleApiResponse({statusCode:res?.payload?.statusCode})){
        return
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
