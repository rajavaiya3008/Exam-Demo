import { useDispatch, useSelector } from "react-redux";
import { validateData } from "../../../utils/validation";
import {
  handleStudentError,
  loadStudentProfile,
  // updateProfile,
} from "../../../redux/slices/student";
import { getCurrUserData } from "../../../utils/currentUser";
import { cancelFetchData, currAbortController, fetchData } from "../../../redux/slices/api";
import { useEffect, useState } from "react";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from "../../../utils/localStorageFunction";
import { toastSuccess } from "../../../utils/toastFunction";
import { useNavigate } from "react-router";
import { LOGIN_PAGE } from "../../../utils/routeConstant";
import { GET_STUDENT_PROFILE, SAVE_STUDENT_PROFILE } from "../../../utils/apiUrlConstant";
import { nameValidation } from "../../../utils/validationConstant";
import { hasObjectLength } from "../../../utils/commonFunction";
import { STUDENT, USER_DATA } from "../../../utils/localStorageConstant";
import { useProfile } from "../../../form/hooks/useProfile";

const validate = {
  name: nameValidation,
};

export const useStudentProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {updateProfile} = useProfile()
  const [disable, setDisable] = useState(true);
  const studentProfile = useSelector((state) => state.student.studentProfile);

  const createStudentFields = [
    {
      type: "text",
      id: "name",
      name: "name",
      label: "Name",
      data: studentProfile,
      updateData: updateProfile,
      disable: disable,
    },
    {
      type: "text",
      id: "email",
      name: "email",
      label: "Email",
      data: studentProfile,
      updateData: updateProfile,
      disable: true,
    },
  ];

  const updatedData = {
    name: studentProfile.name,
  };

  useEffect(() => {
    const fetchStudentDetail = async () => {
      try {
        const config = {
          method: "get",
          url: GET_STUDENT_PROFILE,
          headers: { "access-token": getCurrUserData().token },
        };
        const res = await dispatch(fetchData(config));
        if (res?.payload?.statusCode === 401) {
          removeLocalStorageItem(USER_DATA);
          navigate(LOGIN_PAGE);
          return;
        }
        dispatch(loadStudentProfile(res.payload.data));
        setLocalStorageItem(STUDENT, res.payload.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    const student = getLocalStorageItem(STUDENT);
    (!student ? fetchStudentDetail() : dispatch(loadStudentProfile(student)))

    return () => {
      cancelFetchData(currAbortController);
    }
  }, []);

  const saveProfile = async () => {
    try {
      const student = getLocalStorageItem(STUDENT);
      if (student.name === studentProfile.name) {
        setDisable(true);
        dispatch(loadStudentProfile(student));
        return;
      }
      const error = validateData(studentProfile, validate);
      if (hasObjectLength(error)) {
        dispatch(handleStudentError(error));
        return;
      }
      const config = {
        method: "put",
        url: SAVE_STUDENT_PROFILE,
        data: updatedData,
        headers: { "access-token": getCurrUserData().token },
      };
      const res = await dispatch(fetchData(config));
      setLocalStorageItem(STUDENT, res.payload.data);
      toastSuccess("Profile Updated Successfully");
      setDisable(true);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleCancel = () => {
    setDisable(true);
    dispatch(loadStudentProfile(getLocalStorageItem(STUDENT)));
  };

  return {
    createStudentFields,
    disable,
    saveProfile,
    handleCancel,
    setDisable,
  };
};
