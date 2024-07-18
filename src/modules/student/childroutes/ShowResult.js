import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import Pagination from '../../../shared/Pagination';
import { getCurrUserData } from '../../../Current User/currentUser';
import { fetchData } from '../../../redux-toolkit/slices/api';
import { useDispatch, useSelector } from 'react-redux';
import { IsRemoveItem, IsSetItem } from '../../../utils/IsFunction';
import { ALL_EXAM, LOGIN_PAGE } from '../../../utils/constant';

const ShowResult = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const location = useLocation();
    const [searchParams,setSearchParams] = useSearchParams();
    const [result,setResult] = useState([]);
    const status = useSelector(state => state.api.status);
    const id = searchParams.get('id');

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
            IsRemoveItem('userData');
            IsSetItem('login',false);
            navigate(LOGIN_PAGE)
            return;
          }
          const allExams = res.payload.data;
          console.log('allExams', allExams)
          // dispatch(loadAllExamData(res?.payload?.data));
          const finalResult = allExams.find((item) => {
            return item._id === id
          })
          if(!finalResult){
            navigate(ALL_EXAM);
            return
          }
          console.log('finalResult', finalResult)
          setResult(finalResult.Result)
          console.log('result',finalResult.Result)
      }
      fetchAllExam()
    },[]);

    const keys = ['subjectName','rank','score','resultStatus'];

    const handleBack = () => {
      navigate(ALL_EXAM);
    }

  return (
    <div className='flex items-center flex-col mt-[70px] overflow-hidden'>
      {
        status === 'loading' ? 
          <div className='spinner'></div> :
          <div>
            <h2 className='text-4xl text-center'>Results</h2>

            <div className='text-2xl mt-[20px] max-[400px]:text-xl max-[350px]:text-lg'>
              <pre>Subject: {result[0]?.subjectName}</pre>
              <pre>Rank: {result[0]?.rank}</pre>
              <pre>Score: {result[0]?.score}</pre>

              <button 
                onClick={handleBack}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-[35%] mt-[40px]"
                >Back</button>
            </div>
          </div>
          
      }
      
    </div>
    
  )
}

// {
//   status === 'loading' ? 
//     <div className='spinner mt-[250px] w-[100%] left-[70%]'></div> :
//       <div className='max-[590px]:w-[550px] max-[550px]:w-[500px] max-[500px]:w-[450px] max-[450px]:w-[400px] max-[400px]:w-[350px] max-[350px]:w-[310px] overflow-auto h-[100vh] flex items-center flex-col mt-[30px]'>
//         <p className='text-center text-4xl mb-4'>Results</p>
//           <Pagination data={result} keys={keys}/>
//           <button 
//           onClick={handleBack}
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2 mt-[40px]"
//           >Back</button>
//       </div>
// }

export default ShowResult