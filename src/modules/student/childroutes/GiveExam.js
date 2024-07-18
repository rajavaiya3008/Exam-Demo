import React, { useEffect } from 'react'
import { getCurrUserData} from '../../../Current User/currentUser';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../redux-toolkit/slices/api';
import { initiateExamPaper, loadExamPaper } from '../../../redux-toolkit/slices/student';
import ShowExam from '../../teacher/childroutes/ShowExam';
import { useGiveExam } from '../studentdata/useGiveExam';
import { initiateAnsIndex } from '../../../redux-toolkit/slices/teacher';
import { IsGetItem, IsRemoveItem, IsSetItem } from '../../../utils/IsFunction';
import { ALL_EXAM, LOGIN_PAGE } from '../../../utils/constant';

const GiveExam = () => {

  const [searchParams,setSearchParams] = useSearchParams();
  const id = searchParams.get('id');

  const {
    createExamFields,
    currQuestion,
    setCurrQuestion,
    validateExamData,
    validate,
    handleSubmitExam,
    handleCancel,
    error
} = useGiveExam(id)

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const status = useSelector(state => state.api.status);
    const examData = useSelector(state => state.student.examPaper);
    const ansIndex = useSelector(state => state.teacher.ansIndex)
    const subject = searchParams.get('subject');

    useEffect(() => {
      console.log('above useEffect is running')
        const fetchExamPaper = async() => {
            const config = {
                method:'get',
                url:'student/examPaper',
                headers: { "access-token":getCurrUserData().token },
                params:{id}
            }
            const res = await dispatch(fetchData(config));
            if(res?.payload?.statusCode === 401){
              IsRemoveItem('userData');
              IsSetItem('login',false)
              navigate(LOGIN_PAGE)
              return;
            }
            let examPaper = {
              subjectName:subject,
              notes:['hello'],
          }
            examPaper.questions = res.payload.data;
            console.log('set examPaper')
            dispatch(loadExamPaper(examPaper))
            // localStorage.setItem('examPaper',JSON.stringify(examPaper))
        }
        const examPaper = IsGetItem('examPaper')
        if(examPaper){
          dispatch(loadExamPaper(IsGetItem('examPaper')))
          console.log('set ansIndx')
          const ansIndexLocal = IsGetItem('ansIndex')
          console.log('ansIndexLocal', ansIndexLocal)
            dispatch(initiateAnsIndex(ansIndexLocal))
          
        }else{
          fetchExamPaper();
        }
    },[])

    useEffect(() => {
      console.log('below useEffect is running');
      const handleStorageChange = () => {
        const examPaper = IsGetItem('examPaper')
        if(examPaper){
          dispatch(loadExamPaper(IsGetItem('examPaper')))
          console.log('set ansIndx')
          const ansIndexLocal = IsGetItem('ansIndex')
          console.log('ans updated at 92')
          // console.log('ansIndexLocal', ansIndexLocal)
          console.log('ansIndex', ansIndex)
          if(ansIndexLocal && ansIndex.length === 0){
            console.log('enter in to if block')
            console.log('ansIndexLocal', ansIndexLocal)
            dispatch(initiateAnsIndex(ansIndexLocal))
          }else{
            console.log('enter in to else block')
            dispatch(initiateExamPaper({}))
            dispatch(initiateAnsIndex(ansIndex))
            navigate(ALL_EXAM)
          }
        }
      }
    
      // Listen to 'storage' events
      window.addEventListener('storage', handleStorageChange);
    
      // Clean up event listener
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      }
    }, []); 

  return (
    <div className='flex justify-center mt-[70px] overflow-hidden'>
        {
            status === 'loading' ?
              <div className='spinner'></div> :

                <div>
                  <p className='text-center text-4xl mb-6'>Give Exam</p>
                  <ShowExam 
                  createExamFields={createExamFields} 
                  setCurrQuestion={setCurrQuestion} 
                  currQuestion={currQuestion}
                  validateExamData={validateExamData}
                  totalQue={examData?.questions?.length - 1}
                  validate={validate}
                  error={error}
                  role={'student'}
                  />

                  <div className='flex justify-center mt-2'>
                    <button 
                    onClick={handleSubmitExam}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded focus:outline-none focus:shadow-outline"
                    >Submit</button>
                    <button
                    onClick={handleCancel}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded focus:outline-none focus:shadow-outline"
                    >Cancel</button>
                  </div>
                </div>
                

        }

    </div>
  )
}

export default GiveExam