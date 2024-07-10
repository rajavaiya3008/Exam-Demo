import { useDispatch, useSelector } from "react-redux";
import { validateData } from "../../../Validation/validation";
import { handleStudentError, loadStudentProfile, updateProfile } from "../../../redux-toolkit/slices/student";
import { getCurrUserData } from "../../../Current User/currentUser";
import { fetchData } from "../../../redux-toolkit/slices/api";
import { toast } from "react-toastify";
import { useState } from "react";



export const useStudentProfile = () => {

    const dispatch = useDispatch();

    const [disable,setDisable] = useState(true);
    const studentProfile = useSelector(state => state.student.studentProfile);
    const error = useSelector(state => state.student.error);

    const createStudentFields = [
        {
          type:'text',
          id:'name',
          name:'name',
          label:'Name',
          data:studentProfile,
          updateData:updateProfile,
          disable:disable,
          error:error
        },
        {
          type:'text',
          id:'email',
          name:'email',
          label:'Email',
          data:studentProfile,
          updateData:updateProfile,
          disable:true,
          error:error
        }
      ]
    
      const validate = {
        name:[{required:true,message:'Please Enter Name'},{length:3,message:'username Must be 3 char'},{pattern:/^[a-zA-Z]+$/,message:'Enter Valid Name'}],
      }
    
      const updatedData = {
        name:studentProfile.name
      }
    
      const saveProfile = async() => {
        try{
          const student = JSON.parse(localStorage.getItem('student'));
          if(student.name === studentProfile.name){
            setDisable(true);
            dispatch(loadStudentProfile(student));
            return
          }
          const error = validateData(studentProfile,validate)
                console.log('error', error)
                if(Object.keys(error).length !== 0){
                    dispatch(handleStudentError(error));
                    return;
                }
          const config = {
            method:'put',
            url:'student/studentProfile',
            data:updatedData,
            headers: { "access-token":getCurrUserData().token }
        }
        const res = await dispatch(fetchData(config));
        localStorage.setItem('student',JSON.stringify(res.payload.data));
        toast.success('Profile Updated Successfully');
        setDisable(true);
        }catch(error){
          console.log('error', error);
        }
      }

    return {
        createStudentFields,
        saveProfile,
        disable,
        setDisable
    }
}