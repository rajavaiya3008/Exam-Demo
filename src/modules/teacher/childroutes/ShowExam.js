import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InputField from '../../../components/InputField';
import { addNewQuestion, handleError, handleSameQuestions, initiateQuestions} from '../../../redux-toolkit/slices/teacher';
import { validateData } from '../../../Validation/validation';
import { handleStudentError } from '../../../redux-toolkit/slices/student';


const ShowExam = ({createExamFields,error,setCurrQuestion,currQuestion,validateExamData,totalQue,validate,role}) => {

    const totalQuestion = totalQue || 14;
    const sameOptionError = useSelector(state => state.teacher.error);
    const sameQuestions = useSelector(state => state.teacher.questions);
    const examData = useSelector(state => state.teacher.createExam);
    const [lastQueVisited,setLastQueVisited] = useState(false);

    const dispatch = useDispatch();
    
    const handlePrevQuestion = () => {
      // dispatch(initiateQuestions());
      console.log('validateExamData.questions', validateExamData.question);
      if(!sameQuestions.includes(validateExamData.question) || sameQuestions[currQuestion] !== validateExamData.question){
        validateExamData.questions = sameQuestions;
      }
      if(currQuestion === 14 && !lastQueVisited){
        setLastQueVisited(true);
        validateExamData.questions = sameQuestions;
        const error = validateData(validateExamData,validate);
        if(Object.keys(error).length !== 0){
          dispatch(handleError(error));
          return;
        }
      }
      const error = validateData(validateExamData,validate);
      if(Object.keys(error).length !== 0){
        dispatch(handleError(error));
        return;
      }
      dispatch(handleSameQuestions({
        question:validateExamData.question,
        queIndex:currQuestion
      }));
      if(currQuestion === 1){
        dispatch(initiateQuestions());
      }
        if(currQuestion === 0){
          setCurrQuestion(totalQuestion);
        }else{
          setCurrQuestion(currQuestion -1)
        }
      }
    
    const handleNextQuestion = () => {
      console.log('validateExamData.questions', validateExamData.question);
      console.log('sameQuestions.length', sameQuestions.length)
      console.log('currQuestion', currQuestion);
      if((sameQuestions.includes(validateExamData.question) && 
        sameQuestions.length === currQuestion ) ||
          sameQuestions[currQuestion] !== validateExamData.question){
        validateExamData.questions = sameQuestions;
      }
        const error = validateData(validateExamData,validate);
        console.log('error in give exam', error);
        if(Object.keys(error).length !== 0){
          dispatch(handleError(error));
          return;
        }
        if(Object.keys(sameOptionError).length !== 0){
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
          if(examData.questions.length !== 15){
            dispatch(addNewQuestion(question));
          }
          setCurrQuestion(currQuestion+1);
        }
    }

    const handlePrev = () => {
      const error = validateData(validateExamData,validate);
      if(Object.keys(error).length !== 0){
        dispatch(handleStudentError(error));
        return;
      }
        setCurrQuestion(currQuestion-1);
    }

    const handleNext = () => {
        const error = validateData(validateExamData,validate);
        console.log('error in give exam', error);
        console.log('currQuestion', currQuestion)
        console.log('setCurrQuestion', setCurrQuestion);
        if(Object.keys(error).length !== 0){
            dispatch(handleStudentError(error));
            return;
          }
          if(currQuestion === totalQuestion){
            console.log('enter in to if part')
            setCurrQuestion(0)
          }else{
            console.log('enter into else part')
            setCurrQuestion(currQuestion+1);
          }
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
        error?.answer !== undefined ? <span className='text-red-500 text-sm'>{error.answer}<sup>*</sup></span> : ''
      }

      <div className='mt-2 ml-[50px]'>
        <button 
        onClick={role === 'student'? handlePrev : handlePrevQuestion}
        disabled={currQuestion === 0 || Object.keys(error).length !== 0}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >Prev</button>
        <button 
        disabled={currQuestion === 14}
        onClick={role === 'student'? handleNext : handleNextQuestion}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded focus:outline-none focus:shadow-outline"
        >Next</button>
      </div>
    </div>
  )
}

export default ShowExam