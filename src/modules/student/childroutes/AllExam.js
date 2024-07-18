import React, { useEffect } from 'react'
import { getCurrUserData} from '../../../Current User/currentUser';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../redux-toolkit/slices/api';
import Pagination from '../../../shared/Pagination';
import { handleSearchField, loadAllExamData } from '../../../redux-toolkit/slices/student';
import { useNavigate } from 'react-router';
import InputField from '../../../shared/InputField';
import { handlePrevVisitedPage } from '../../../redux-toolkit/slices/user';
import { IsRemoveItem, IsSetItem } from '../../../utils/IsFunction';

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
          IsRemoveItem('userData');
          IsSetItem('login',false);
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
    <div className='flex items-center flex-col mt-[70px] overflow-hidden all-exam'>
      {
        status !== 'loading' && 
        <div className='mb-[20px] flex justify-center text-white'>
          <InputField fieldData={searchField}/>
        </div>
      }
        <div className='max-[900px]:w-[850px] max-[860px]:w-[800px] max-[800px]:w-[750px] max-[750px]:w-[700px] max-[700px]:w-[650px] max-[650px]:w-[600px] max-[590px]:w-[550px] max-[550px]:w-[500px] max-[500px]:w-[450px] max-[450px]:w-[400px] max-[400px]:w-[350px] max-[350px]:w-[310px] all-exam'>
            {
                status === 'loading' ?
                  <div className='spinner mx-auto'></div> :

                    <div className=''>
                      <p className='text-center text-4xl mb-4'>All Exams</p>
                      <Pagination data={allExamData} keys={keys} btn={btn} searchKey={['subjectName','email']} searchVal={searchData.subjectName} lastVisitedPage={lastVisitedPage}/>
                    </div>
                     
            }
        </div>
    </div>
  )
}

export default AllExam