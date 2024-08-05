import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelFetchData, currAbortController, fetchData } from "../../../redux/slices/api";
import { loadViewExamData } from "../../../redux/slices/teacher";
import { EDIT_EXAM } from "../../../utils/routeConstant";
import { TEACHER_VIEW_EXAM } from "../../../utils/apiUrlConstant";
import { useApiRes } from "../../../hooks/useApiRes";

const keys = ["subjectName", "email"];
const newBtn = [{
  path: EDIT_EXAM,
  text:'Edit'
}];

export const useViewExam = () => {
  const dispatch = useDispatch();
  const {handleApiResponse} = useApiRes()
  const viewExam = useSelector((state) => state.teacher.viewExam);

  useEffect(() => {
    const fetchViewExamData = async () => {
      try {
        const config = {
          method: "get",
          url: TEACHER_VIEW_EXAM,
        };
        const res = await dispatch(fetchData(config));
        if(handleApiResponse({statusCode:res?.payload?.statusCode})){
          return
        }
        dispatch(loadViewExamData(res.payload.data));
      } catch (error) {
        console.log("error", error);
      }
    };
    (!viewExam.length && fetchViewExamData())
    return () => {
      cancelFetchData(currAbortController)
    }
  }, []);

  return {
    viewExam,
    keys,
    newBtn,
  };
};
