import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InputField from '../../../components/InputField';
import { addNewQuestion, createExamData, handleAns, handleError, handleOptions, handleQuestion, handleSubject, initiateExam } from '../../../redux-toolkit/slices/teacher';
import { validateData } from '../../../Validation/validation';
import { fetchData } from '../../../redux-toolkit/slices/api';
import { token } from '../../../Current User/currentUser';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ShowExam from './ShowExam';

const CreateExam = () => {

  const dispatch = useDispatch();
  const examData = useSelector(state => state.teacher.createExam)
  const error = useSelector(state => state.teacher.error);
  const [currQuestion,setCurrQuestion] = useState(0);
  const navigate = useNavigate();
  const sameOptionError = useSelector(state => state.teacher.error);
  const totalQuestion = 14;

  const initiateConfig = {
    subjectName:'math',
    questions:[
        {
            question:'question1',
            answer:'ans1',
            options:[
                'ans1',
                'ans2',
                'ans3',
                'ans4'
            ]
        }
    ],
    notes:['gffgdg']
}

useEffect(() => {
  dispatch(initiateExam(initiateConfig));
},[]);
  //dispatch(initiateExam(initiateConfig));

  const validateExamData = {
    subjectName:examData?.subjectName,
    question:examData?.questions?.[currQuestion]?.question,
    op1:examData?.questions?.[currQuestion]?.options[0],
    op2:examData?.questions?.[currQuestion]?.options[1],
    op3:examData?.questions?.[currQuestion]?.options[2],
    op4:examData?.questions?.[currQuestion]?.options[3],
    answer:examData?.questions?.[currQuestion]?.answer?.trim(),
  }

  const validate = {
    subjectName:[{required:true,message:'Please Enter Subject'}],
    question:[{required:true,message:'Please Enter Question'}],
    op1:[{required:true,message:'Option Required'}],
    op2:[{required:true,message:'Option Required'}],
    op3:[{required:true,message:'Option Required'}],
    op4:[{required:true,message:'Option Required'}],
    answer:[{required:true,message:'Answer Required'}]
  }


  console.log('answer in create exam',examData?.questions?.[currQuestion]?.answer)

  const Options = {
    op1:examData?.questions?.[currQuestion]?.options?.[0],
    op2:examData?.questions?.[currQuestion]?.options?.[1],
    op3:examData?.questions?.[currQuestion]?.options?.[2],
    op4:examData?.questions?.[currQuestion]?.options?.[3],
  }

  const optionArr = examData?.questions?.[currQuestion]?.options;

  const createExamFields = [
    {
      type:'text',
      id:'subject',
      name:'subjectName',
      label:'Subject Name:',
      data:examData,
      updateData:handleSubject,
      error:error
    },
    {
      type:'text',
      id:'question',
      name:'question',
      label:'Question:',
      data:examData?.questions?.[currQuestion],
      updateData:handleQuestion,
      currQuestion:currQuestion,
      error:error
    },
    {
      type:'radio',
      name:'ans',
      id:'op1',
      data:Options,
      examData:examData,
      updateData:handleAns,
      currQuestion:currQuestion,
      ans:examData?.questions?.[currQuestion]?.answer,
      opIndex:0,
      error:error
    },
    {
      type:'text',
      id:'op1',
      name:'op1',
      label:'Option 1',
      data:Options,
      optionArr:optionArr,
      updateData:handleOptions,
      currQuestion:currQuestion,
      opIndex:0,
      error:error
    },
    {
      type:'radio',
      name:'ans',
      id:'op2',
      data:Options,
      examData:examData,
      updateData:handleAns,
      currQuestion:currQuestion,
      ans:examData?.questions?.[currQuestion]?.answer,
      opIndex:1,
      error:error
    },
    {
      type:'text',
      id:'op2',
      name:'op2',
      label:'Option 2',
      data:Options,
      optionArr:optionArr,
      updateData:handleOptions,
      currQuestion:currQuestion,
      opIndex:1,
      error:error
    },
    {
      type:'radio',
      name:'ans',
      id:'op3',
      data:Options,
      examData:examData,
      updateData:handleAns,
      currQuestion:currQuestion,
      ans:examData?.questions?.[currQuestion]?.answer,
      opIndex:2,
      error:error
    },
    {
      type:'text',
      id:'op3',
      name:'op3',
      label:'Option 3',
      data:Options,
      optionArr:optionArr,
      updateData:handleOptions,
      currQuestion:currQuestion,
      opIndex:2,
      error:error
    },
    {
      type:'radio',
      name:'ans',
      id:'op4',
      data:Options,
      examData:examData,
      updateData:handleAns,
      currQuestion:currQuestion,
      ans:examData?.questions?.[currQuestion]?.answer,
      opIndex:3,
      error:error
    },
    {
      type:'text',
      id:'op4',
      name:'op4',
      label:'Option 4',
      data:Options,
      optionArr:optionArr,
      updateData:handleOptions,
      currQuestion:currQuestion,
      opIndex:3,
      error:error
    }
  ]

  // const createExamData = useSelector(state => state.teacher.createExam);
  
  // const handlePrevQuestion = () => {
  //   if(currQuestion === 0){
  //     setCurrQuestion(totalQuestion);
  //   }else{
  //     setCurrQuestion(currQuestion -1)
  //   }
  // }

  // const handleNextQuestion = () => {
  //   const error = validateData(validateExamData,validate);
  //   if(Object.keys(error).length !== 0){
  //     dispatch(handleError(error));
  //     return;
  //   }
  //   if(currQuestion === totalQuestion){
  //     setCurrQuestion(0)
  //   }else{
  //     const question = {
  //         question:'',
  //         answer:' ',
  //         options:[
  //           '',
  //           '',
  //           '',
  //           ''
  //         ]
  //     }
  //     dispatch(addNewQuestion(question));
  //     setCurrQuestion(currQuestion+1);
  //   }
  // }

  
  const handleCreateExam = () => {

    const error = validateData(validateExamData,validate);
    if(Object.keys(error).length !== 0){
      dispatch(handleError(error));
      return;
    }
    if(Object.keys(sameOptionError).length !== 0){
      return;
    }
    const createExam = async() => {
      try{
        const config = {
          method:'post',
          url:'dashboard/Teachers/Exam',
          data:examData,
          headers: { "access-token":token }
        }
        const res = await dispatch(fetchData(config))
        console.log('res', res)
        toast.success('Exam Created Successfully');
        setCurrQuestion(0);
        // dispatch(initiateExam(initiateConfig));
        navigate('/teacher/view-exam');
      }catch(e){
        console.log('e', e)
      }
    }
    createExam();
  }
  
  const handleCancel = () => {
    dispatch(initiateExam(initiateConfig));
    navigate(-1);
  }

  return (
    <div className='h-[100vh] flex items-center justify-center flex-col'>

      {/* <div>
        {
          createExamFields.map((field,i) => <InputField fieldData={field} key={i}/>)
        }
      </div>

      {console.log('examData.error', examData.error)}
      {
        error?.answer !== undefined ? <span>{error.answer}</span> : ''
      }

      <div>
        <button onClick={handlePrevQuestion}>Prev</button>
        <button onClick={handleNextQuestion}>Next</button>
      </div> */}

      <ShowExam 
      createExamFields={createExamFields} 
      error={error} 
      setCurrQuestion={setCurrQuestion} 
      currQuestion={currQuestion}
      validateExamData={validateExamData}
      validate={validate}/>

      <div className='pt-2'>
        {
          examData?.questions?.length === 15 ? 
            <button 
            onClick={handleCreateExam}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >Create Exam</button> 
              : ''
        }
        <button
        onClick={handleCancel}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
        >Cancel</button>
      </div>
    </div>
  )
}

export default CreateExam