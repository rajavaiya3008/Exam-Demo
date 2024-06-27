import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../../../redux-toolkit/slices/api';
import { token } from '../../../Current User/currentUser';
import { loadAllStudentData } from '../../../redux-toolkit/slices/teacher';
import Pagination from '../../../components/Pagination';

const AllStudent = () => {
    console.log('token', token)

    const status = useSelector(state => state.api.status);
    const allStudentData = useSelector(state => state.teacher.allStudentData);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllStudentData = async() => {
            const config = {
                method:'get',
                url:'dashboard/Teachers',
                headers: { "access-token":`${token}` }
            }
            const res = await dispatch(fetchData(config))
            console.log('res in allstudent', res);
            dispatch(loadAllStudentData(res.payload.data));

        }
        fetchAllStudentData();
    },[]);



  return (
    <div>
        All Students
        <div>
            {
                status === 'loading' ? 
                    <span>Loading...</span> :
                        <Pagination data={allStudentData} recodesPerPage={10}/>

            }
        </div>
    </div>
  )
}

export default AllStudent