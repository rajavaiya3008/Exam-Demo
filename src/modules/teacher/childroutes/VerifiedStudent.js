import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../../../redux-toolkit/slices/api';
import { getCurrUserData} from '../../../Current User/currentUser';
import Pagination from '../../../components/Pagination';
import { loadVerifiedStudentData } from '../../../redux-toolkit/slices/teacher';
import { useNavigate } from 'react-router';

const VerifiedStudent = () => {

    const status = useSelector(state => state.api.status);
    const verifiedStudentData = useSelector(state => state.teacher.verifiedStudentData);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllStudentData = async() => {
            const config = {
                method:'get',
                url:'dashboard/Teachers/StudentForExam',
                headers: { "access-token":getCurrUserData().token }
            }
            const res = await dispatch(fetchData(config))
            console.log('res in Verifiedstudent', res);
            if(res?.payload?.statusCode === 401){
                localStorage.removeItem('userData');
                localStorage.setItem('login',false);
                navigate('/login')
                return;
              }
            dispatch(loadVerifiedStudentData(res?.payload?.data));

        }
        fetchAllStudentData();
    },[]);

    const keys = ['name','email','status'];

  return (
    <div className='h-[100vh] flex items-center justify-center bg-gray-500'>
        <div>
            {
                status === 'loading' ? 
                    <div className='spinner'></div> :
                        <Pagination data={verifiedStudentData} recodesPerPage={10} keys={keys} viewPath={`/teacher/view-student-detail`}/>

            }
        </div>
    </div>
  )
}

export default VerifiedStudent;