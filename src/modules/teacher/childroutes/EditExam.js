import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../redux-toolkit/slices/api';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { token } from '../../../Current User/currentUser';
import { addNewQuestion, createExamData, handleAns, handleError, handleOptions, handleQuestion, handleSubject, initiateExam } from '../../../redux-toolkit/slices/teacher';
import ShowExam from './ShowExam';
import { toast } from 'react-toastify';
import { validateData } from '../../../Validation/validation';


const EditExam = () => {

    const [currQuestion,setCurrQuestion] = useState(0);
    const dispatch = useDispatch();
    const [searchParams,setSearchParams] = useSearchParams();
    const examData = useSelector(state => state.teacher.createExam);
    const status = useSelector(state => state.api.status);
    const error = useSelector(state => state.teacher.error);
    const navigate = useNavigate();
    const id = searchParams.get('id');
    const subjectName = searchParams.get('subject');


    let editData = {};

    useEffect(() => {
        try{
            const fetchEditExamData = async() => {
                const config = {
                    method:'get',
                    url:'dashboard/Teachers/examDetail',
                    headers: { "access-token":`${token}` },
                    params:{id}
                }
                const res = await dispatch(fetchData(config));
                console.log('res in edit exam', res)
                editData.subjectName = subjectName;
                editData.notes = ['hello'];
                console.log('res.data.questions', res?.payload?.data?.questions);
                editData.questions = res.payload.data.questions;
                dispatch(initiateExam(editData));
            }
            fetchEditExamData();
        }catch(error){
           console.log('error', error) 
        }
    },[])

    const Options = {
        op1:examData.questions[currQuestion].options[0],
        op2:examData.questions[currQuestion].options[1],
        op3:examData.questions[currQuestion].options[2],
        op4:examData.questions[currQuestion].options[3],
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

    const optionArr = examData.questions[currQuestion].options;

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
          data:examData.questions[currQuestion],
          updateData:handleQuestion,
          currQuestion:currQuestion,
          error:error
        },
        {
          type:'radio',
          name:'ans',
          id:'op1',
          data:Options,
          updateData:handleAns,
          currQuestion:currQuestion,
          ans:examData.questions[currQuestion].answer,
          ansIndex:0,
          error:error
        },
        {
          type:'text',
          id:'op1',
          name:'op1',
          label:'Option 1',
          data:Options,
          updateData:handleOptions,
          optionArr:optionArr,
          currQuestion:currQuestion,
          opIndex:0,
          error:error
        },
        {
          type:'radio',
          name:'ans',
          id:'op2',
          data:Options,
          updateData:handleAns,
          currQuestion:currQuestion,
          ans:examData.questions[currQuestion].answer,
          opIndex:1,
          error:error
        },
        {
          type:'text',
          id:'op2',
          name:'op2',
          label:'Option 2',
          data:Options,
          updateData:handleOptions,
          optionArr:optionArr,
          currQuestion:currQuestion,
          opIndex:1,
          error:error
        },
        {
          type:'radio',
          name:'ans',
          id:'op3',
          data:Options,
          updateData:handleAns,
          currQuestion:currQuestion,
          ans:examData.questions[currQuestion].answer,
          opIndex:2,
          error:error
        },
        {
          type:'text',
          id:'op3',
          name:'op3',
          label:'Option 3',
          data:Options,
          updateData:handleOptions,
          optionArr:optionArr,
          currQuestion:currQuestion,
          opIndex:2,
          error:error
        },
        {
          type:'radio',
          name:'ans',
          id:'op4',
          data:Options,
          updateData:handleAns,
          currQuestion:currQuestion,
          ans:examData.questions[currQuestion].answer,
          opIndex:3,
          error:error
        },
        {
          type:'text',
          id:'op4',
          name:'op4',
          label:'Option 4',
          data:Options,
          updateData:handleOptions,
          optionArr:optionArr,
          currQuestion:currQuestion,
          opIndex:3,
          error:error
        }
      ]
    
    
    
    const validateExamData = {
        subjectName:examData.subjectName,
        question:examData.questions[currQuestion].question,
        op1:examData.questions[currQuestion].options[0],
        op2:examData.questions[currQuestion].options[1],
        op3:examData.questions[currQuestion].options[2],
        op4:examData.questions[currQuestion].options[3],
        answer:examData.questions[currQuestion].answer.trim(),
    }

    const handleEditExam = async() => {
      try{
        const error = validateData(validateExamData,validate);
        if(Object.keys(error).length !== 0){
            dispatch(handleError(error));
            return;
          }
        const config = {
          method:'put',
          url:'dashboard/Teachers/editExam',
          data:examData,
          headers: { "access-token":`${token}` },
          params:{id}
        }
        const res = await dispatch(fetchData(config));
        console.log('res of edit exam', res);
        toast.success("Exam Edited Successfully");
        navigate('/teacher/view-exam');
      }catch(error){
        console.log('error', error)
      }
    }

    const handleDeleteExam = () => {
      try{
         const deleteExam = async() => {
          const config = {
            method:'delete',
            url:'dashboard/Teachers/deleteExam',
            headers: { "access-token":`${token}` },
            params:{id}
          }
          const res = await dispatch(fetchData(config));
          console.log('resin delete exam', res)
          toast.success("exam deleted successfully");
          navigate('/teacher/view-exam');
        }
        deleteExam();
        
      }catch(error){
        console.log('error', error)
      }
    }
    
    const handleCancel = () => {
      navigate(-1);
    }
    



  return (
    <div className='h-[100vh] flex flex-col items-center justify-center'>

      {
        status === 'loading' ?
          <div className='spinner'></div> :
            <>
              <ShowExam 
              createExamFields={createExamFields} 
              error={error} 
              setCurrQuestion={setCurrQuestion} 
              currQuestion={currQuestion}
              validateExamData={validateExamData}
              validate={validate}
              />

              <div>
                <button 
                onClick={handleEditExam}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >Submit</button>
                <button 
                onClick={handleDeleteExam}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 mt-2 rounded focus:outline-none focus:shadow-outline"
                >Delete</button>
                <button
                onClick={handleCancel}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 mt-2 rounded focus:outline-none focus:shadow-outline"
                >Cancel</button>
              </div>
            </>
      }
        {/* <ShowExam 
        createExamFields={createExamFields} 
        error={error} 
        setCurrQuestion={setCurrQuestion} 
        currQuestion={currQuestion}
        validateExamData={validateExamData}
        validate={validate}
        />

        <div>
          <button 
          onClick={handleEditExam}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >Edit</button>
          <button 
          onClick={handleDeleteExam}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 mt-2 rounded focus:outline-none focus:shadow-outline"
          >Delete</button>
        </div> */}
    </div>
  )
}

export default EditExam;