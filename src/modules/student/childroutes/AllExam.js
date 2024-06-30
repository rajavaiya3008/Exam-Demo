import React, { useEffect } from 'react'
import { token } from '../../../Current User/currentUser';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../redux-toolkit/slices/api';
import Pagination from '../../../components/Pagination';
import { loadAllExamData } from '../../../redux-toolkit/slices/student';

const AllExam = () => {

    const dispatch = useDispatch();
    const status = useSelector(state => state.api.status);
    const allExamData = useSelector(state => state.student.allExamData);


  useEffect(() => {
    const fetchAllExam = async() => {
        const config = {
            method:'get',
            url:'student/studentExam',
            headers: { "access-token":`${token}` }
        }
        const res = await dispatch(fetchData(config));
        console.log('res in all exam for student', res)
        dispatch(loadAllExamData(res.payload.data));
    }
    fetchAllExam();
  },[]);

  const keys = ['subjectName','email'];
  const btn = {
    giveExamBtn:'/student/give-exam',
  }

  return (
    <div>
        All Exam
        <div>
            {
                status === 'loading' ?
                    <span>Loading...</span> :
                     <Pagination data={allExamData} keys={keys} btn={btn}/>
            }
        </div>
    </div>
  )
}

export default AllExam