import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../redux-toolkit/slices/api';
import { getCurrUserData} from '../../../Current User/currentUser';
import { loadStudentProfile } from '../../../redux-toolkit/slices/student';
import InputField from '../../../shared/InputField';
import { useNavigate } from 'react-router';
import { useStudentProfile } from '../studentdata/useStudentProfile';
import { handlePrevVisitedPage } from '../../../redux-toolkit/slices/user';
import { IsGetItem, IsRemoveItem, IsSetItem } from '../../../utils/IsFunction';
import { LOGIN_PAGE } from '../../../utils/constant';

const StudentProfile = () => {

  const {
    createStudentFields,
    saveProfile,
    disable,
    setDisable
} = useStudentProfile();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentDetail = async() => {
      try{
        const config = {
          method:'get',
          url:'student/getStudentDetail',
          headers: { "access-token":getCurrUserData().token }
        }
        const res = await dispatch(fetchData(config));
        if(res?.payload?.statusCode === 401){
          IsRemoveItem('userData');
          IsSetItem('login',false);
          navigate(LOGIN_PAGE)
          return;
        }
        dispatch(loadStudentProfile(res.payload.data));
        IsSetItem('student',res.payload.data)
      }catch(error){
        console.log('error', error)
      }
    }
    const student = IsGetItem('student')
    if(!student){
      fetchStudentDetail();
    }else{
      dispatch(loadStudentProfile(student))
    }
    dispatch(handlePrevVisitedPage(1));
  },[]);

  const status = useSelector(state => state.api.status);

   const handleCancel = () => {
    setDisable(true);
    dispatch(loadStudentProfile(IsGetItem('student')));
  }
  
  return (
    <div className='flex justify-center mt-[70px] overflow-hidden'>
      <div>
        {
          status === 'loading' ?
            <div className='spinner'></div> :
              <div>
                <p className='text-center text-4xl mb-4'>Your Profile</p>
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
                          onClick={handleCancel}
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