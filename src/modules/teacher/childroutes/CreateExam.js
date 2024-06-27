import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InputField from '../../../components/InputField';
import { addNewQuestion, createExamData, handleAns, handleOptions, handleQuestion, handleSubject } from '../../../redux-toolkit/slices/teacher';

const CreateExam = () => {

  const examData = useSelector(state => state.teacher.createExam)
  const error = useSelector(state => state.teacher.error);
  const [currQuestion,setCurrQuestion] = useState(0);
  const totalQuestion = 15;

  const dispatch = useDispatch();

  console.log('answer in create exam',examData.questions[currQuestion].answer)

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
      data:Options,
      updateData:handleOptions,
      currQuestion:currQuestion,
      opIndex:3,
      error:error
    }
  ]

  // const createExamData = useSelector(state => state.teacher.createExam);
  
  const handlePrevQuestion = () => {
    if(currQuestion === 0){
      setCurrQuestion(totalQuestion);
    }else{
      setCurrQuestion(currQuestion -1)
    }
  }

  const handleNextQuestion = () => {
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
      <p>Create Exam</p>

      <div>
        {
          createExamFields.map((field,i) => <InputField fieldData={field} key={i}/>)
        }
      </div>

      <div>
        <button onClick={handlePrevQuestion}>Prev</button>
        <button onClick={handleNextQuestion}>Next</button>
      </div>
    </div>
  )
}

export default CreateExam