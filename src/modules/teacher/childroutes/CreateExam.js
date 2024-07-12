import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initiateAnsIndex, initiateExam } from '../../../redux-toolkit/slices/teacher';
import ShowExam from './ShowExam';
import { useCreateExam } from '../teachetData/useCreateExam';
import { handlePrevVisitedPage } from '../../../redux-toolkit/slices/user';

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

// window.addEventListener('storage', () => {
//   const createExamData = JSON.parse(localStorage.getItem('createExam'))
//   const ansIndex = JSON.parse(localStorage.getItem('ansIndex'));
//   dispatch(initiateExam(createExamData));
//   dispatch(initiateAnsIndex(ansIndex));
// });

useEffect(() => {
  // localStorage.removeItem('createExam');
  const createExamData = JSON.parse(localStorage.getItem('createExam'))
  const ansIndex = JSON.parse(localStorage.getItem('ansIndex'));
  if(!createExamData || ansIndex === null){
    dispatch(initiateExam(initiateConfig));
    dispatch(initiateAnsIndex([]))
  }else{
    dispatch(initiateExam(createExamData))
      dispatch(initiateAnsIndex(ansIndex))
  }
  dispatch(handlePrevVisitedPage(1))

  return () => {
    localStorage.removeItem('createExam');
    localStorage.removeItem('ansIndex')
    
    // dispatch(initiateAnsIndex([]));
  }
},[]);

// useEffect(() => {
//   const handleStorageChange = () => {
//     const createExamData = JSON.parse(localStorage.getItem('createExam'));
//     const ansIndex = JSON.parse(localStorage.getItem('ansIndex'));

//     if (!createExamData) {
//       dispatch(initiateExam(initiateConfig));
//       dispatch(initiateAnsIndex([]));
//     } else {
//       dispatch(initiateExam(createExamData));
//       dispatch(initiateAnsIndex(ansIndex));
//     }
//   };

//   // Listen to 'storage' events
//   window.addEventListener('storage', handleStorageChange);

//   // Clean up event listener
//   return () => {
//     localStorage.removeItem('createExam');
//     localStorage.removeItem('ansIndex')
//     window.removeEventListener('storage', handleStorageChange);
//   };
// }, []); 


console.log('examData', examData)

if(examData.questions.length > 0 && examData.subjectName !== ''){
  localStorage.setItem('createExam',JSON.stringify(examData))
  console.log('reach ansIndex');
  if(ansIndex !== null){
    localStorage.setItem('ansIndex',JSON.stringify(ansIndex))
  }
  // const ansIndexLocal = JSON.parse(localStorage.getItem('ansIndex'));
  // if(ansIndexLocal && ansIndexLocal.length > 0 && ansIndexLocal.length === ansIndex.length){
  //   localStorage.setItem('ansIndex',JSON.stringify(ansIndexLocal))
  // }else{
  //   localStorage.setItem('ansIndex',JSON.stringify(ansIndex))
  // }
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