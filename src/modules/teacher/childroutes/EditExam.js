import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../redux-toolkit/slices/api';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { token } from '../../../Current User/currentUser';
import { addNewQuestion, createExamData, handleAns, handleError, handleOptions, handleQuestion, handleSubject, initiateExam } from '../../../redux-toolkit/slices/teacher';
import ShowExam from './ShowExam';
import { toast } from 'react-toastify';


const EditExam = () => {

    const [currQuestion,setCurrQuestion] = useState(0);
    const dispatch = useDispatch();
    const [searchParams,setSearchParams] = useSearchParams();
    const examData = useSelector(state => state.teacher.createExam);
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
                console.log('res.data.questions', res.payload.data.questions);
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
    
    



  return (
    <div>
        <p>Edit Exam</p>
        <ShowExam 
        createExamFields={createExamFields} 
        error={error} 
        setCurrQuestion={setCurrQuestion} 
        currQuestion={currQuestion}
        validateExamData={validateExamData}/>

        <div>
          <button onClick={handleEditExam}>Edit</button>
          <button onClick={handleDeleteExam}>Delete</button>
        </div>
    </div>
  )
}

export default EditExam;