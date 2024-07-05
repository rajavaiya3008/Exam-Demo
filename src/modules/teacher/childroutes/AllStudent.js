import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../../../redux-toolkit/slices/api';
import { getCurrUserData} from '../../../Current User/currentUser';
import { loadAllStudentData } from '../../../redux-toolkit/slices/teacher';
import Pagination from '../../../components/Pagination';
import { useNavigate } from 'react-router';

const AllStudent = () => {

    const status = useSelector(state => state.api.status);
    const allStudentData = useSelector(state => state.teacher.allStudentData);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllStudentData = async() => {
            const config = {
                method:'get',
                url:'dashboard/Teachers',
                headers: { "access-token":getCurrUserData().token }
            }
            const res = await dispatch(fetchData(config))
            console.log('res in allstudent', res);
            if(res?.payload?.statusCode === 401){
                localStorage.removeItem('userData');
                localStorage.setItem('login',false);
                navigate('/login')
                return;
              }
            dispatch(loadAllStudentData(res?.payload?.data));

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
                        <Pagination data={allStudentData} recodesPerPage={10} keys={keys} viewPath={`/teacher/view-student-detail`}/>

            }
        </div>
    </div>
  )
}

export default AllStudent