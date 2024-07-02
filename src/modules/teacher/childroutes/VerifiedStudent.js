import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../../../redux-toolkit/slices/api';
import { token } from '../../../Current User/currentUser';
import Pagination from '../../../components/Pagination';
import { loadVerifiedStudentData } from '../../../redux-toolkit/slices/teacher';

const VerifiedStudent = () => {
    console.log('token', token)

    const status = useSelector(state => state.api.status);
    const verifiedStudentData = useSelector(state => state.teacher.verifiedStudentData);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllStudentData = async() => {
            const config = {
                method:'get',
                url:'dashboard/Teachers/StudentForExam',
                headers: { "access-token":`${token}` }
            }
            const res = await dispatch(fetchData(config))
            console.log('res in Verifiedstudent', res);
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