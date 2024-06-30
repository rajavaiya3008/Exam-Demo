import React, { useEffect, useState } from 'react'
import { token } from '../../../Current User/currentUser';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../redux-toolkit/slices/api';
import { handleStudentAns, loadExamPaper } from '../../../redux-toolkit/slices/student';
import ShowExam from '../../teacher/childroutes/ShowExam';

const GiveExam = () => {

    const dispatch = useDispatch();
    const status = useSelector(state => state.api.status);
    const [currQuestion,setCurrQuestion] = useState(0);
    const examData = useSelector(state => state.student.examPaper);
    const error = {};

    const [searchParams,setSearchParams] = useSearchParams();
    const id = searchParams.get('id');
    const subject = searchParams.get('subject');

    const examPaper = {
        subjectName:subject,
        notes:['hello'],
    }

    useEffect(() => {
        const fetchExamPaper = async() => {
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
          error:error
        },
        {
          type:'text',
          id:'question',
          name:'question',
          label:'Question:',
          data:examData?.questions?.[currQuestion],
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
          ansIndex:0,
          error:error
        },
        {
          type:'text',
          id:'op1',
          name:'op1',
          label:'Option 1',
          data:Options,
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
          opIndex:1,
          error:error
        },
        {
          type:'text',
          id:'op2',
          name:'op2',
          label:'Option 2',
          data:Options,
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
          opIndex:2,
          error:error
        },
        {
          type:'text',
          id:'op3',
          name:'op3',
          label:'Option 3',
          data:Options,
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
          opIndex:3,
          error:error
        },
        {
          type:'text',
          id:'op4',
          name:'op4',
          label:'Option 4',
          data:Options,
          currQuestion:currQuestion,
          opIndex:3,
          error:error
        }
      ]


  return (
    <div>
        Give Exam
        {
            status === 'loading' ?
                <span>Loading...</span> :
                <ShowExam 
                createExamFields={createExamFields} 
                setCurrQuestion={setCurrQuestion} 
                currQuestion={currQuestion}
                validateExamData={validateExamData}
                totalQue={examData.questions.length - 1}
                />

        }

    </div>
  )
}

export default GiveExam