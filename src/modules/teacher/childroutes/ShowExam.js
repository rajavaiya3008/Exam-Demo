import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InputField from '../../../components/InputField';
import { addNewQuestion, createExamData, handleAns, handleError, handleOptions, handleQuestion, handleSubject, initiateExam } from '../../../redux-toolkit/slices/teacher';
import { validateData } from '../../../Validation/validation';
import { fetchData } from '../../../redux-toolkit/slices/api';
import { token } from '../../../Current User/currentUser';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const ShowExam = ({createExamFields,error,setCurrQuestion,currQuestion,validateExamData,totalQue}) => {

    const totalQuestion = totalQue || 14;
    const sameOptionError = useSelector(state => state.teacher.error);

    const dispatch = useDispatch();
    
      const validate = {
        subjectName:[{required:true,message:'Please Enter Subject'}],
        question:[{required:true,message:'Please Enter Question'}],
        op1:[{required:true,message:'Option Required'}],
        op2:[{required:true,message:'Option Required'}],
        op3:[{required:true,message:'Option Required'}],
        op4:[{required:true,message:'Option Required'}],
        answer:[{required:true,message:'Answer Required'}]
      }

    const handlePrevQuestion = () => {
        if(currQuestion === 0){
          setCurrQuestion(totalQuestion);
        }else{
          setCurrQuestion(currQuestion -1)
        }
      }
    
    const handleNextQuestion = () => {
        const error = validateData(validateExamData,validate);
        if(Object.keys(error).length !== 0){
          dispatch(handleError(error));
          return;
        }
        if(Object.keys(sameOptionError).length !== 0){
          return;
        }
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
          dispatch(addNewQuestion(question));
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
        error?.answer !== undefined ? <span>{error.answer}</span> : ''
      }

      <div>
        <button onClick={handlePrevQuestion}>Prev</button>
        <button onClick={handleNextQuestion}>Next</button>
      </div>

    </div>
  )
}

export default ShowExam