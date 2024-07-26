import { useDispatch, useSelector } from "react-redux";
import { validateData } from "../../../utils/validation";
import {
  handleStudentError,
  loadStudentProfile,
  updateProfile,
} from "../../../redux/slices/student";
import { getCurrUserData } from "../../../utils/currentUser";
import { fetchData } from "../../../redux/slices/api";
import { useEffect, useState } from "react";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from "../../../utils/localStorageFunction";
import { toastSuccess } from "../../../utils/toastFunction";
import { useNavigate } from "react-router";
import { LOGIN_PAGE } from "../../../utils/routeConstant";
import { getStudentProfile, saveStudentProfile } from "../../../utils/apiUrlConstant";
import { nameValidation } from "../../../utils/validationConstant";

const validate = {
  name: nameValidation,
};

export const useStudentProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [disable, setDisable] = useState(true);
  const studentProfile = useSelector((state) => state.student.studentProfile);
  const error = useSelector((state) => state.student.error);

  const createStudentFields = [
    {
      type: "text",
      id: "name",
      name: "name",
      label: "Name",
      data: studentProfile,
      updateData: updateProfile,
      disable: disable,
      error: error,
    },
    {
      type: "text",
      id: "email",
      name: "email",
      label: "Email",
      data: studentProfile,
      updateData: updateProfile,
      disable: true,
      error: error,
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
          url: getStudentProfile,
          headers: { "access-token": getCurrUserData().token },
        };
        const res = await dispatch(fetchData(config));
        if (res?.payload?.statusCode === 401) {
          removeLocalStorageItem("userData");
          navigate(LOGIN_PAGE);
          return;
        }
        dispatch(loadStudentProfile(res.payload.data));
        setLocalStorageItem("student", res.payload.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    const student = getLocalStorageItem("student");
    if (!student) {
      fetchStudentDetail();
    } else {
      dispatch(loadStudentProfile(student));
    }
  }, []);

  const saveProfile = async () => {
    try {
      const student = getLocalStorageItem("student");
      if (student.name === studentProfile.name) {
        setDisable(true);
        dispatch(loadStudentProfile(student));
        return;
      }
      const error = validateData(studentProfile, validate);
      console.log("error", error);
      if (Object.keys(error).length !== 0) {
        dispatch(handleStudentError(error));
        return;
      }
      const config = {
        method: "put",
        url: saveStudentProfile,
        data: updatedData,
        headers: { "access-token": getCurrUserData().token },
      };
      const res = await dispatch(fetchData(config));
      setLocalStorageItem("student", res.payload.data);
      toastSuccess("Profile Updated Successfully");
      setDisable(true);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleCancel = () => {
    setDisable(true);
    dispatch(loadStudentProfile(getLocalStorageItem("student")));
  };

  return {
    createStudentFields,
    disable,
    saveProfile,
    handleCancel,
    setDisable,
  };
};
