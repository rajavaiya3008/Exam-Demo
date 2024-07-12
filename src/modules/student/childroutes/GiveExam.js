import React, { useEffect } from 'react'
import { getCurrUserData} from '../../../Current User/currentUser';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../redux-toolkit/slices/api';
import { initiateExamPaper, loadExamPaper } from '../../../redux-toolkit/slices/student';
import ShowExam from '../../teacher/childroutes/ShowExam';
import { useGiveExam } from '../studentdata/useGiveExam';
import { initiateAnsIndex } from '../../../redux-toolkit/slices/teacher';

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
        const fetchExamPaper = async() => {
            const config = {
                method:'get',
                url:'student/examPaper',
                headers: { "access-token":getCurrUserData().token },
                params:{id}
            }
            const res = await dispatch(fetchData(config));
            if(res?.payload?.statusCode === 401){
              localStorage.removeItem('userData');
              localStorage.setItem('login',false)
              navigate('/login')
              return;
            }
            let examPaper = {
              subjectName:subject,
              notes:['hello'],
          }
            examPaper.questions = res.payload.data;
            console.log('set examPaper')
            dispatch(loadExamPaper(examPaper))
            localStorage.setItem('examPaper',JSON.stringify(examPaper))
        }
        const examPaper = JSON.parse(localStorage.getItem('examPaper'))
        if(examPaper){
          dispatch(loadExamPaper(JSON.parse(localStorage.getItem('examPaper'))))
          console.log('set ansIndx')
          const ansIndexLocal = JSON.parse(localStorage.getItem('ansIndex'))
          if(ansIndexLocal){
            dispatch(initiateAnsIndex(ansIndexLocal))
          }
          // const ansArr = examPaper.questions.reduce((acc,curr) => {
          //   const ans = curr.options.findIndex(option => option === curr.answer)
          //   acc.push(ans)
          //   return acc;
          // },[])
        }else{
          fetchExamPaper();
        }


        return () => {
          console.log('enter in to return')
          localStorage.removeItem('examPaper')
          dispatch(initiateAnsIndex([]));
          dispatch(initiateExamPaper({}))
          // localStorage.removeItem('ansIndex')
        }
    },[])

    // useEffect(() => {
    //   const handleStorageChange = () => {
    //     const examPaper = JSON.parse(localStorage.getItem('examPaper'))
    //     if(examPaper){
    //       dispatch(loadExamPaper(JSON.parse(localStorage.getItem('examPaper'))))
    //       console.log('set ansIndx')
    //       const ansIndexLocal = JSON.parse(localStorage.getItem('ansIndex'))
    //       console.log('ans updated at 92')
    //       // console.log('ansIndexLocal', ansIndexLocal)
    //       console.log('ansIndex', ansIndex)
    //       if(ansIndexLocal && ansIndex.length === 0){
    //         dispatch(initiateAnsIndex(ansIndexLocal))
    //       }else{
    //         dispatch(initiateAnsIndex(ansIndex))
    //       }
    //       // if(ansIndexLocal.length === ansIndex.length || ansIndex.length === 0){
    //       //   console.log('ans updated at 92 if')
    //       //   dispatch(initiateAnsIndex(ansIndexLocal))
    //       // }
    //     }
    //   }
    
    //   // Listen to 'storage' events
    //   window.addEventListener('storage', handleStorageChange);
    
    //   // Clean up event listener
    //   return () => {
    //     // localStorage.removeItem('createExam');
    //     // localStorage.removeItem('ansIndex')
    //     window.removeEventListener('storage', handleStorageChange);
    //   }
    // }, []); 

    // console.log('examPaper', examPaper)
    if(Object.keys(examData).length !== 0){
      localStorage.setItem('examPaper',JSON.stringify(examData));
      localStorage.setItem('ansIndex',JSON.stringify(ansIndex))
    }
    // if(!JSON.parse(localStorage.getItem('ansIndex'))){
    //   localStorage.setItem('ansIndex',JSON.stringify(ansIndex))
    // }
    // console.log('examData', examData);

  return (
    <div className='h-[100vh] flex items-center justify-center'>
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