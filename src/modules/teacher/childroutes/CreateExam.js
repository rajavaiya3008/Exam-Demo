import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initiateAnsIndex, initiateExam } from '../../../redux-toolkit/slices/teacher';
import ShowExam from './ShowExam';
import { useCreateExam } from '../teachetData/useCreateExam';
import { handlePrevVisitedPage } from '../../../redux-toolkit/slices/user';
import { IsGetItem } from '../../../utils/IsFunction';

const CreateExam = () => {

  const dispatch = useDispatch();
  const status = useSelector(state => state.api.status);
  const ansIndex = useSelector(state => state.teacher.ansIndex);

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
  console.log('above useEffect is running');
  // localStorage.removeItem('createExam');
  const createExamData = IsGetItem('createExam')
  const ansIndex = IsGetItem('ansIndex');
  console.log('createExamData', createExamData)
  console.log('ansIndex', ansIndex)
  if(!createExamData){
    console.log('reach 41 line')
    dispatch(initiateExam(initiateConfig));
    dispatch(initiateAnsIndex([]))
  }else{
    console.log('reach 45 line')
    dispatch(initiateExam(createExamData))
    if(ansIndex !== null){
      dispatch(initiateAnsIndex(ansIndex))
    }
  }
  dispatch(handlePrevVisitedPage(1))

  // return () => {
  //   localStorage.removeItem('createExam');
  //   localStorage.removeItem('ansIndex')
    
  //   // dispatch(initiateAnsIndex([]));
  // }
},[]);

useEffect(() => {
  console.log('below useEffect is running')
  const handleStorageChange = () => {
    const createExamData = IsGetItem('createExam');
    const ansIndex = IsGetItem('ansIndex');

    if (!createExamData) {
      console.log('reach 63 line')
      dispatch(initiateExam(initiateConfig));
      dispatch(initiateAnsIndex([]));
      setCurrQuestion(0);
    } else {
      console.log('reach 68 line')
      dispatch(initiateExam(createExamData));
      if(ansIndex !== null){
        dispatch(initiateAnsIndex(ansIndex));
      }
    }
  };

  // Listen to 'storage' events
  window.addEventListener('storage', handleStorageChange);

  // Clean up event listener
  return () => {
    // localStorage.removeItem('createExam');
    // localStorage.removeItem('ansIndex')
    window.removeEventListener('storage', handleStorageChange);
  };
}, []); 


  return (
    <div className='flex items-center flex-col mt-[70px]'>

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