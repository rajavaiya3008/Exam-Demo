import React, { useEffect } from 'react'
import { getCurrUserData} from '../../../Current User/currentUser';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../redux-toolkit/slices/api';
import { loadExamPaper } from '../../../redux-toolkit/slices/student';
import ShowExam from '../../teacher/childroutes/ShowExam';
import { useGiveExam } from '../studentdata/useGiveExam';

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
            localStorage.setItem('examPaper',JSON.stringify(examPaper))
            dispatch(loadExamPaper(examPaper));
        }
        const examPaper = JSON.parse(localStorage.getItem('examPaper'))
        if(JSON.parse(localStorage.getItem('examPaper'))?.subjectName === subject){
          dispatch(loadExamPaper(JSON.parse(localStorage.getItem('examPaper'))))
        }else{
          fetchExamPaper();
        }
    },[])

    // console.log('examPaper', examPaper)
    if(Object.keys(examData).length !== 0){
      localStorage.setItem('examPaper',JSON.stringify(examData));
    }
    // console.log('examData', examData);

  return (
    <div className='h-[100vh] flex items-center justify-center'>
        {
            status === 'loading' ?
              <div className='spinner'></div> :

                <div>
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