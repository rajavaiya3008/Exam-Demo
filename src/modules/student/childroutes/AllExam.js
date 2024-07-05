import React, { useEffect } from 'react'
import { getCurrUserData} from '../../../Current User/currentUser';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../redux-toolkit/slices/api';
import Pagination from '../../../components/Pagination';
import { loadAllExamData } from '../../../redux-toolkit/slices/student';
import { useNavigate } from 'react-router';

const AllExam = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const status = useSelector(state => state.api.status);
    const allExamData = useSelector(state => state.student.allExamData);


  useEffect(() => {
    const fetchAllExam = async() => {
        const config = {
            method:'get',
            url:'student/studentExam',
            headers: { "access-token":getCurrUserData().token }
        }
        const res = await dispatch(fetchData(config));
        console.log('res in all exam for student', res)
        if(res?.payload?.statusCode === 401){
          localStorage.removeItem('userData');
          localStorage.setItem('login',false);
          navigate('/login')
          return;
        }
        dispatch(loadAllExamData(res?.payload?.data));
    }
    fetchAllExam();
  },[]);

  const keys = ['subjectName','email'];
  const btn = {
    giveExamBtn:'/student/give-exam',
    showResultBtn:'/student/show-result',
  }

  // const btn = [
  //   {
  //     name:'Give Exam',
  //     path:'/student/give-exam'
  //   },
  //   {
  //     name:'Show Result',
  //     path:'/student/show-result'
  //   }
  // ]


  return (
    <div className='h-[100vh] flex items-center justify-center bg-gray-500'>
        <div>
            {
                status === 'loading' ?
                  <div className='spinner'></div> :
                     <Pagination data={allExamData} keys={keys} btn={btn}/>
            }
        </div>
    </div>
  )
}

export default AllExam