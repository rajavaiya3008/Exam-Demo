import React, { useEffect } from 'react'
import { getCurrUserData} from '../../../Current User/currentUser';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../redux-toolkit/slices/api';
import Pagination from '../../../components/Pagination';
import { handleSearchField, loadAllExamData } from '../../../redux-toolkit/slices/student';
import { useNavigate } from 'react-router';
import InputField from '../../../components/InputField';
import { handlePrevVisitedPage } from '../../../redux-toolkit/slices/user';

const AllExam = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const status = useSelector(state => state.api.status);
    const allExamData = useSelector(state => state.student.allExamData);
    const searchData = useSelector(state => state.student.searchField)
    const lastVisitedPage = useSelector(state => state.user.prevVisitedPage);
    const error = useSelector(state => state.student.error);


  useEffect(() => {
    const fetchAllExam = async() => {
        const config = {
            method:'get',
            url:'student/studentExam',
            headers: { "access-token":getCurrUserData().token }
        }
        const res = await dispatch(fetchData(config));
        if(res?.payload?.statusCode === 401){
          localStorage.removeItem('userData');
          localStorage.setItem('login',false);
          navigate('/login')
          return;
        }
        dispatch(loadAllExamData(res?.payload?.data));
    }
    if(allExamData.length === 0){
      dispatch(handlePrevVisitedPage(1))
      fetchAllExam();
    }

    return () => {
      dispatch(handleSearchField(''))
    }
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

  const searchField = {
      type:'text',
      id:'subjectName',
      name:'subjectName',
      label:'Subject Name or Email',
      data:searchData,
      updateData:handleSearchField,
      // error:error
  }



  return (
    <div className='h-[100vh] flex items-center flex-col mt-[30px]'>
      {
        status !== 'loading' && 
        <div className='mb-[20px] text-white'>
          <InputField fieldData={searchField}/>
        </div>
      }
        <div>
            {
                status === 'loading' ?
                  <div className='spinner mt-[250px]'></div> :

                    <div>
                      <p className='text-center text-4xl mb-4'>All Exams</p>
                      <Pagination data={allExamData} keys={keys} btn={btn} searchKey={['subjectName','email']} searchVal={searchData.subjectName} lastVisitedPage={lastVisitedPage}/>
                    </div>
                     
            }
        </div>
    </div>
  )
}

export default AllExam