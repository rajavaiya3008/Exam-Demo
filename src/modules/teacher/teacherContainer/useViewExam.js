import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getCurrUserData } from "../../../utils/currentUser";
import { fetchData } from "../../../redux/slices/api";
import { removeLocalStorageItem } from "../../../utils/localStorageFunction";
import { loadViewExamData } from "../../../redux/slices/teacher";
import { EDIT_EXAM, LOGIN_PAGE } from "../../../utils/routeConstant";
import { teacherViewExam } from "../../../utils/apiUrlConstant";

const keys = ["subjectName", "email"];
const newBtn = [{
  path: EDIT_EXAM,
  text:'Edit'
}];

export const useViewExam = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const viewExam = useSelector((state) => state.teacher.viewExam);

  useEffect(() => {
    const fetchViewExamData = async () => {
      try {
        const config = {
          method: "get",
          url: teacherViewExam,
          headers: { "access-token": getCurrUserData().token },
        };
        const res = await dispatch(fetchData(config));
        if (res?.payload?.statusCode === 401) {
          removeLocalStorageItem("userData");
          navigate(LOGIN_PAGE);
          return;
        }
        dispatch(loadViewExamData(res.payload.data));
      } catch (error) {
        console.log("error", error);
      }
    };
    (!viewExam.length && fetchViewExamData())
  }, []);

  return {
    viewExam,
    keys,
    newBtn,
  };
};
