import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initiateExam } from '../../../redux-toolkit/slices/teacher';
import ShowExam from './ShowExam';
import { useCreateExam } from '../teachetData/useCreateExam';
import { handlePrevVisitedPage } from '../../../redux-toolkit/slices/user';

const CreateExam = () => {

  const dispatch = useDispatch();
  const status = useSelector(state => state.api.status);

  const {
    createExamFields,
    validateExamData,
    validate,
    error,
    currQuestion,
    Options,
    examData,
    setCurrQuestion,
    handleCreateExam,
    initiateConfig,
    handleCancel
} = useCreateExam();

useEffect(() => {
  // localStorage.removeItem('createExam');
  const createExamData = JSON.parse(localStorage.getItem('createExam'))
  if(!createExamData){
    dispatch(initiateExam(initiateConfig));
  }else{
    dispatch(initiateExam(createExamData))
  }
  dispatch(handlePrevVisitedPage(1))

  return () => {
    localStorage.removeItem('createExam');
  }
},[]);

if(examData.questions.length > 1 ){
  localStorage.setItem('createExam',JSON.stringify(examData))
}


  return (
    <div className='h-[100vh] flex items-center justify-center flex-col'>

      <p className='text-center text-4xl mb-4'>Create Exam</p>

      <ShowExam 
      createExamFields={createExamFields} 
      error={error} 
      setCurrQuestion={setCurrQuestion} 
      currQuestion={currQuestion}
      validateExamData={validateExamData}
      validate={validate}
      Options={Options}/>

      <div className='pt-2'>
            <button 
            disabled={status === 'loading' || currQuestion !== 14}
            onClick={handleCreateExam}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${status === 'loading' || currQuestion !== 14 ? 'opacity-50 cursor-not-allowed':''}`}
            >
              {
                status === 'loading'? <span>Loading...</span> : <span>Create Exam</span>
              }
            </button> 
        <button
        onClick={handleCancel}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2`}
        >Clear</button>
      </div>
    </div>
  )
}

export default CreateExam