import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import Pagination from '../../../components/Pagination';
import { getCurrUserData } from '../../../Current User/currentUser';
import { fetchData } from '../../../redux-toolkit/slices/api';
import { useDispatch, useSelector } from 'react-redux';

const ShowResult = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const location = useLocation();
    const [searchParams,setSearchParams] = useSearchParams();
    const [result,setResult] = useState([]);
    const status = useSelector(state => state.api.status);

    const id = searchParams.get('id');

    // const result = location.state;
    // const result = JSON.parse(searchParams.get('result'))

    useEffect(() => {
      console.log('enter in to useEffect')
      const fetchAllExam = async() => {
          const config = {
              method:'get',
              url:'student/studentExam',
              headers: { "access-token":getCurrUserData().token }
          }
          const res = await dispatch(fetchData(config));
          console.log('res', res)
          if(res?.payload?.statusCode === 401){
            localStorage.removeItem('userData');
            localStorage.setItem('login',false);
            navigate('/login')
            return;
          }
          const allExams = res.payload.data;
          console.log('allExams', allExams)
          // dispatch(loadAllExamData(res?.payload?.data));
          const finalResult = allExams.find((item) => {
            return item._id === id
          })
          console.log('finalResult', finalResult)
          setResult(finalResult.Result)
          console.log('result',finalResult.Result)
      }
      fetchAllExam()
    },[]);

    const keys = ['subjectName','rank','score','resultStatus'];

    const handleBack = () => {
        navigate('/student/dashboard');
    }

  return (
    <>
      {
        status === 'loading' ? 
          <div className='spinner'></div> :
            <div className='h-[100vh] flex items-center flex-col mt-[30px]'>
              <p className='text-center text-4xl mb-4'>Results</p>
                <Pagination data={result} keys={keys}/>
                <button 
                onClick={handleBack}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2 mt-[40px]"
                >Back</button>
            </div>
      }
    </>
    
  )
}

export default ShowResult