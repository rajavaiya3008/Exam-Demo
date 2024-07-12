import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InputField from '../../../components/InputField';
import { addNewQuestion, handleError, handleSameQuestions, initiateAnsIndex, initiateCreateExam, initiateQuestions} from '../../../redux-toolkit/slices/teacher';
import { validateData } from '../../../Validation/validation';
import { handleStudentError, loadExamPaper } from '../../../redux-toolkit/slices/student';


const ShowExam = ({createExamFields,error,setCurrQuestion,currQuestion,validateExamData,totalQue,validate,role,Options}) => {
    const totalQuestion = totalQue || 14;
    const sameOptionError = useSelector(state => state.teacher.error);
    const sameQuestions = useSelector(state => state.teacher.questions);
    const examData = useSelector(state => state.teacher.createExam);
    const examPaper = useSelector(state => state.student.examPaper)
    const optionArr = examData?.questions?.[currQuestion]?.options;
    const [lastQueVisited,setLastQueVisited] = useState(false);

    const dispatch = useDispatch();
    
    const handlePrevQuestion = () => {
      // dispatch(initiateQuestions());
      // console.log('validateExamData.questions', validateExamData.question);
      // if(!sameQuestions.includes(validateExamData.question) || sameQuestions[currQuestion] !== validateExamData.question){
      //   validateExamData.questions = sameQuestions;
      // }
      // if(currQuestion === 14 && !lastQueVisited){
      //   setLastQueVisited(true);
      //   validateExamData.questions = sameQuestions;
      //   const error = validateData(validateExamData,validate);
      //   if(Object.keys(error).length !== 0){
      //     dispatch(handleError(error));
      //     return;
      //   }
      // }
      // const error = validateData(validateExamData,validate);
      // if(Object.keys(error).length !== 0){
      //   dispatch(handleError(error));
      //   return;
      // }
      // dispatch(handleSameQuestions({
      //   question:validateExamData.question,
      //   queIndex:currQuestion
      // }));
      // if(currQuestion === 1){
      //   dispatch(initiateQuestions());
      // }
          dispatch(handleError({}));

          const createExam = JSON.parse(localStorage.getItem('createExam'))
          if(createExam !== null && (examData.questions.length <= createExam.questions.length )){
            console.log('createExam', createExam)
            const ansIndex = JSON.parse(localStorage.getItem('ansIndex'))
            dispatch(initiateAnsIndex(ansIndex))
            dispatch(initiateCreateExam(createExam));
          }
          setCurrQuestion(currQuestion -1)
      }

    function hasDuplicates(array) {
        return (new Set(array)).size !== array.length;
    }
    
    const handleNextQuestion = () => {
      if((sameQuestions.includes(validateExamData.question) && 
        sameQuestions.length === currQuestion ) ||
          sameQuestions[currQuestion] !== validateExamData.question){
        validateExamData.questions = sameQuestions;
      }
        const error = validateData(validateExamData,validate);
        if(Object.keys(error).length !== 0){
          dispatch(handleError(error));
          return;
        }
        if(Object.keys(sameOptionError).length !== 0){
          return;
        }
        if(hasDuplicates(optionArr)){
          const error = {};
          error['sameOption'] = 'Two Options are Same Please Check';
          // dispatch(fieldData.updateData(data))
          dispatch(handleError(error));
          return;
      }
        dispatch(handleSameQuestions({
          question:validateExamData.question,
          queIndex:currQuestion
        }));
        if(currQuestion === totalQuestion){
          setCurrQuestion(0)
        }else{
          const question = {
              question:'',
              answer:' ',
              options:[
                '',
                '',
                '',
                ''
              ]
          }
          if(examData.questions.length !== 15 && examData.questions.length < currQuestion+2){
            dispatch(addNewQuestion(question));
          }
            const createExam = JSON.parse(localStorage.getItem('createExam'))
            if(createExam !== null && examData.questions.length < createExam.questions.length){
              console.log('createExam', createExam)
              const ansIndex = JSON.parse(localStorage.getItem('ansIndex'))
              dispatch(initiateAnsIndex(ansIndex))
              dispatch(initiateCreateExam(createExam));
            }
          setCurrQuestion(currQuestion+1);
        }
    }

    const handlePrev = () => {
        console.log('Enter in to prev if block');
        dispatch(handleStudentError({}));
        const ansIndex = JSON.parse(localStorage.getItem('ansIndex'))
        dispatch(initiateAnsIndex(ansIndex))

        const examPaper = JSON.parse(localStorage.getItem('examPaper'));
        dispatch(loadExamPaper(examPaper))
        setCurrQuestion(currQuestion-1);
    }

    const handleNext = () => {
          const ansIndex = JSON.parse(localStorage.getItem('ansIndex'))
          dispatch(initiateAnsIndex(ansIndex))

          const examPaper = JSON.parse(localStorage.getItem('examPaper'));
          dispatch(loadExamPaper(examPaper))

          if(ansIndex.length < currQuestion + 1){
            const error = validateData(validateExamData,validate);
            if(Object.keys(error).length !== 0){
                dispatch(handleStudentError(error));
                return;
              }
          }

          setCurrQuestion(currQuestion+1);
    }

  return (
    <div>
        <div>
        {
          createExamFields.map((field,i) => <InputField fieldData={field} key={i}/>)
        }
      </div>

      {/* {console.log('examData.error', examData.error)} */}
      {
        error?.answer !== undefined ? <span className='text-red-500 text-sm'>{error.answer}</span> : ''
      }

      {
        error?.sameOption !== undefined ? <span className='text-red-500 text-sm'>{error.sameOption}</span> : ''
      }

      <div className='mt-2 ml-[50px]'>
        <button 
        onClick={role === 'student'? handlePrev : handlePrevQuestion}
        disabled={currQuestion === 0}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${currQuestion === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >Prev</button>
        <button 
        disabled={currQuestion === 14 || (role === 'student' && currQuestion === 6)}
        onClick={role === 'student'? handleNext : handleNextQuestion}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded focus:outline-none focus:shadow-outline ${currQuestion === 14 || (role === 'student' && currQuestion === 6)? 'opacity-50 cursor-not-allowed' : ''}`}
        >Next</button>
      </div>
    </div>
  )
}

export default ShowExam