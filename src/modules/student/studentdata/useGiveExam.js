import { useDispatch, useSelector } from "react-redux";
import { getCurrUserData } from "../../../Current User/currentUser";
import { cancelExam, handleStudentAns, handleStudentError, initiateExamPaper, loadAllExamData } from "../../../redux-toolkit/slices/student";
import { fetchData } from "../../../redux-toolkit/slices/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useState } from "react";
import { initiateAnsIndex } from "../../../redux-toolkit/slices/teacher";



export const useGiveExam = (id) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [currQuestion,setCurrQuestion] = useState(0);
    const examData = useSelector(state => state.student.examPaper);
    const error = useSelector(state => state.student.error);
    const {role} = getCurrUserData()

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
          label:'Subject Name',
          data:examData,
          disable:true,
          error:error
        },
        {
          type:'text',
          id:'question',
          name:'question',
          label:`Question ${currQuestion+1}`,
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
          opIndex:0,
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
        if(ansArr.length === 7){
          const submitExam = async() => {
            try{
              const config = {
                method:'post',
                url:'student/giveExam',
                data:ansArr,
                headers: { "access-token":getCurrUserData().token },
                params:{id}
              }
              dispatch(loadAllExamData([]));
              const res = await dispatch(fetchData(config));
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
        dispatch(initiateAnsIndex([]))
        localStorage.removeItem('ansIndex')
        localStorage.removeItem('examPaper');
        navigate(`/${role}/dashboard`);
      }

    return {
        createExamFields,
        currQuestion,
        setCurrQuestion,
        validateExamData,
        validate,
        handleSubmitExam,
        handleCancel,
        error
        
    }
}