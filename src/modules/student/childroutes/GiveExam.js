import React, { useEffect, useState } from 'react'
import { token } from '../../../Current User/currentUser';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../redux-toolkit/slices/api';
import { cancelExam, handleStudentAns, loadExamPaper } from '../../../redux-toolkit/slices/student';
import ShowExam from '../../teacher/childroutes/ShowExam';
import { toast } from 'react-toastify';

const GiveExam = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const status = useSelector(state => state.api.status);
    const [currQuestion,setCurrQuestion] = useState(0);
    const examData = useSelector(state => state.student.examPaper);
    const error = useSelector(state => state.student.error);

    const [searchParams,setSearchParams] = useSearchParams();
    const id = searchParams.get('id');
    console.log('subject id', id);
    const subject = searchParams.get('subject');

    const examPaper = {
        subjectName:subject,
        notes:['hello'],
    }

    useEffect(() => {
        const fetchExamPaper = async() => {
          console.log('id in fetch exampaper', id)
            const config = {
                method:'get',
                url:'student/examPaper',
                headers: { "access-token":`${token}` },
                params:{id}
            }
            const res = await dispatch(fetchData(config));
            console.log('res in exam paper', res)
            examPaper.questions = res.payload.data;
            dispatch(loadExamPaper(examPaper));
        }
        fetchExamPaper();
    },[])

    const Options = {
        op1:examData?.questions?.[currQuestion]?.options[0],
        op2:examData?.questions?.[currQuestion]?.options[1],
        op3:examData?.questions?.[currQuestion]?.options[2],
        op4:examData?.questions?.[currQuestion]?.options[3],
    }

    const validate = {
      answer:[{required:true,message:'Answer Required'}]
    }

    const validateExamData = {
        answer:examData?.questions?.[currQuestion]?.answer?.trim(),
    }

    const createExamFields = [
        {
          type:'text',
          id:'subject',
          name:'subjectName',
          label:'Subject Name:',
          data:examData,
          disable:true,
          error:error
        },
        {
          type:'text',
          id:'question',
          name:'question',
          label:'Question:',
          data:examData?.questions?.[currQuestion],
          disable:true,
          currQuestion:currQuestion,
          error:error
        },
        {
          type:'radio',
          name:'ans',
          id:'op1',
          data:Options,
          examData:examData,
          updateData:handleStudentAns,
          currQuestion:currQuestion,
          ans:examData?.questions?.[currQuestion]?.answer,
          ansIndex:0,
          error:error
        },
        {
          type:'text',
          id:'op1',
          name:'op1',
          label:'Option 1',
          data:Options,
          disable:true,
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
          updateData:handleStudentAns,
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
          disable:true,
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
          updateData:handleStudentAns,
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
          disable:true,
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
          updateData:handleStudentAns,
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
          disable:true,
          currQuestion:currQuestion,
          opIndex:3,
          error:error
        }
      ]
    
    const ansArr = examData?.questions?.reduce((acc,curr) => {
      const obj = {
        question:curr._id,
        answer:curr.answer
      }
      if(curr.answer !== undefined){
        acc.push(obj)
      }
      return acc;
    },[])

    const handleSubmitExam = () => {
      console.log('ansArr', ansArr);
      if(ansArr.length === 7){
        const submitExam = async() => {
          try{
            const config = {
              method:'post',
              url:'student/giveExam',
              data:ansArr,
              headers: { "access-token":token },
              params:{id}
            }
            const res = await dispatch(fetchData(config));
            console.log('res in submit exam', res);
            toast.success('Exam Submitted Successfully');
            navigate('/student/all-exam');
          }catch(error){
            console.log('error', error)
          }
        }
        submitExam();
      }else{
        toast.error('Please Fill all Questions');
      }
    }

    const handleCancel = () => {
      dispatch(cancelExam());
      navigate(-1);
    }


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