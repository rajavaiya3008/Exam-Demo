import { useDispatch, useSelector } from "react-redux";
import { validateData } from "../../../utils/validation";
import {
  handleStudentError,
  loadStudentProfile,
} from "../../../redux/slices/student";
import { cancelFetchData, currAbortController, fetchData } from "../../../redux/slices/api";
import { useEffect, useState } from "react";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../../../utils/localStorageFunction";
import { toastSuccess } from "../../../utils/toastFunction";
import { GET_STUDENT_PROFILE, SAVE_STUDENT_PROFILE } from "../../../utils/apiUrlConstant";
import { nameValidation } from "../../../utils/validationConstant";
import { hasObjectLength } from "../../../utils/commonFunction";
import { STUDENT } from "../../../utils/localStorageConstant";
import { useProfile } from "../../../form/hooks/useProfile";
import { EMAIL_TYPE, PROFILE_UPDATED, TEXT_TYPE } from "../../../utils/constant";
import { createInputField } from "../../../utils/formFieldConstant";
import { useApiRes } from "../../../form/hooks/useApiRes";

const validate = {
  name: nameValidation,
};

export const useStudentProfile = () => {
  const dispatch = useDispatch();
  const {handleApiResponse} = useApiRes()
  const {updateProfile} = useProfile()
  const [disable, setDisable] = useState(true);
  const studentProfile = useSelector((state) => state.student.studentProfile);

  const createStudentFields = [
    {
      ...createInputField(TEXT_TYPE,"name","name","Name"),
      data: studentProfile,
      updateData: updateProfile,
      disable: disable,
    },
    {
      ...createInputField(EMAIL_TYPE,"email","email","Email"),
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
        };
        const res = await dispatch(fetchData(config));
        if(handleApiResponse({statusCode:res?.payload?.statusCode})){
          return
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
      };
      const res = await dispatch(fetchData(config));
      setLocalStorageItem(STUDENT, res.payload.data);
      toastSuccess(PROFILE_UPDATED);
      setDisable(true);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleCancel = () => {
    setDisable(true);
    dispatch(handleStudentError({}))
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
