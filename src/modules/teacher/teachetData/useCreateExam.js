import { useDispatch, useSelector } from "react-redux"
import { handleAns, handleError, handleOptions, handleQuestion, handleSubject, initiateAnsIndex, initiateExam, initiateQuestions } from "../../../redux-toolkit/slices/teacher";
import { useState } from "react";
import { validateData } from "../../../Validation/validation";
import { getCurrUserData } from "../../../Current User/currentUser";
import { fetchData } from "../../../redux-toolkit/slices/api";
import { useNavigate } from "react-router";
import { VIEW_EXAM } from "../../../utils/constant";
import { toastSuccess } from "../../../utils/toastFunction";
import { IsRemoveItem } from "../../../utils/IsFunction";




export const useCreateExam = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const examData = useSelector(state => state.teacher.createExam)
    const [currQuestion,setCurrQuestion] = useState(0);
    const error = useSelector(state => state.teacher.error);
    const sameQuestions = useSelector(state => state.teacher.questions);
    const totalQuestion = 14;
    const sameOptionError = useSelector(state => state.teacher.error);

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
        subjectName:[{required:true,message:'Please Enter Subject'},{pattern:/^\S[a-zA-Z0-9 ]+\S$/,message:'Enter Valid Option'}],
        question:[{required:true,message:'Please Enter Question'},{pattern:/^\S[a-zA-Z0-9 ]+\S$/,message:'Enter Valid Option'}],
        op1:[{required:true,message:'Option Required'}],
        op2:[{required:true,message:'Option Required'}],
        op3:[{required:true,message:'Option Required'}],
        op4:[{required:true,message:'Option Required'}],
        answer:[{required:true,message:'Answer Required'}]
    }
    
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
          label:'Subject Name',
          data:examData,
          updateData:handleSubject,
          error:error
        },
        {
          type:'text',
          id:'question',
          name:'question',
          label:`Question ${currQuestion+1}`,
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

    const initiateConfig = {
        subjectName:'',
        questions:[
            {
                question:'',
                options:[
                    '',
                    '',
                    '',
                    ''
                ]
            }
        ],
        notes:['gffgdg']
    }

    const handleCreateExam = () => {

        if((sameQuestions.includes(validateExamData.question) && 
        sameQuestions.length === currQuestion ) ||
          sameQuestions[currQuestion] !== validateExamData.question){
        validateExamData.questions = sameQuestions;
      }

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
              headers: { "access-token":getCurrUserData().token }
            }
            const res = await dispatch(fetchData(config))
            toastSuccess('Exam Created Successfully');
            setCurrQuestion(0);
            dispatch(initiateQuestions());
            // dispatch(initiateExam(initiateConfig));
            navigate(VIEW_EXAM);
          }catch(e){
            console.log('e', e)
          }
        }
        createExam();
    }

    const handleCancel = () => {
        dispatch(initiateExam(initiateConfig));
        dispatch(initiateQuestions());
        dispatch(initiateAnsIndex([]));
        IsRemoveItem('ansIndex')
        IsRemoveItem('createExam')
        setCurrQuestion(0);
      }

    return {
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
    }
}