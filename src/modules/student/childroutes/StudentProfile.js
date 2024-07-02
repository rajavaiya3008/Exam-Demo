import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../redux-toolkit/slices/api';
import { token } from '../../../Current User/currentUser';
import { handleStudentError, loadStudentProfile, updateProfile } from '../../../redux-toolkit/slices/student';
import InputField from '../../../components/InputField';
import { toast } from 'react-toastify';
import { validateData } from '../../../Validation/validation';

const StudentProfile = () => {

  const dispatch = useDispatch();
  const status = useSelector(state => state.api.status);
  const studentProfile = useSelector(state => state.student.studentProfile);
  const error = useSelector(state => state.student.error);
  const [disable,setDisable] = useState(true);

  const createStudentFields = [
    {
      type:'text',
      id:'name',
      name:'name',
      label:'Name:',
      data:studentProfile,
      updateData:updateProfile,
      disable:disable,
      error:error
    },
    {
      type:'text',
      id:'email',
      name:'email',
      label:'Email:',
      data:studentProfile,
      updateData:updateProfile,
      disable:true,
      error:error
    }
  ]

  const validate = {
    name:[{required:true,message:'Please Enter Name'},{length:3,message:'username Must be 3 char'}],
  }

  useEffect(() => {
    const fetchStudentDetail = async() => {
      try{
        const config = {
          method:'get',
          url:'student/getStudentDetail',
          headers: { "access-token":`${token}` }
        }
        const res = await dispatch(fetchData(config));
        console.log('res in student profile', res)
        dispatch(loadStudentProfile(res.payload.data));
      }catch(error){
        console.log('error', error)
      }
    }
    fetchStudentDetail();
  },[disable]);

  const updatedData = {
    name:studentProfile.name
  }

  const saveProfile = async() => {
    try{
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
        headers: { "access-token":`${token}` }
    }
    const res = await dispatch(fetchData(config));
    console.log('res in student updated profile', res)
    toast.success('Profile Updated Successfully');
    setDisable(true);
    }catch(error){
      console.log('error', error);
    }
  }

  return (
    <div className='h-[100vh] flex items-center justify-center'>
      <div>
        {
          status === 'loading' ?
            <div className='spinner'></div> :
              <div>
                {
                  createStudentFields.map((field,i) => <InputField fieldData={field} key={i}/>)
                }
                <div className='flex justify-center mt-2'>
                  {
                    disable ? 
                      <button 
                      onClick={() => setDisable(!disable)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >Edit</button> :
                        <div>
                          <button 
                          onClick={saveProfile}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          >Save</button>
                          <button 
                          onClick={() => setDisable(true)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded focus:outline-none focus:shadow-outline"
                          >Cancel</button>
                        </div>
                  }
                </div>
              </div>
        }
      </div>
    </div>
  )
}

export default StudentProfile