import React, { useEffect } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import Pagination from '../../../components/Pagination';
import { getCurrUserData } from '../../../Current User/currentUser';
import { fetchData } from '../../../redux-toolkit/slices/api';
import { useDispatch } from 'react-redux';

const ShowResult = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const location = useLocation();
    const [searchParams,setSearchParams] = useSearchParams();

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
          const finalResult = allExams.filter((item) => {
            console.log('item', item)
            return item._id === id
            
          })
          console.log('finalResult', finalResult)
      }
      fetchAllExam()
      // if(allExamData.length === 0){
      //   dispatch(handlePrevVisitedPage(1))
      //   fetchAllExam();
      // }
  
      // return () => {
      //   dispatch(handleSearchField(''))
      // }
    },[]);

    const keys = ['subjectName','rank','score','resultStatus'];

    const handleBack = () => {
        navigate(-1);
    }

  return (
    <div className='h-[100vh] flex items-center flex-col mt-[30px]'>
      <p className='text-center text-4xl mb-4'>Results</p>
        <Pagination data={[]} keys={keys}/>
        <button 
        onClick={handleBack}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2 mt-[40px]"
        >Back</button>
    </div>
  )
}

export default ShowResult