import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../redux-toolkit/slices/api';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getCurrUserData } from '../../../Current User/currentUser';
import { initiateAnsIndex, initiateExam, initiateQuestions} from '../../../redux-toolkit/slices/teacher';
import ShowExam from './ShowExam';
import { useEditExam } from '../teachetData/useEditExam';
import { IsRemoveItem, IsSetItem } from '../../../utils/IsFunction';


const EditExam = () => {

  const [searchParams,setSearchParams] = useSearchParams();
  const id = searchParams.get('id');

    const {
      createExamFields,
      currQuestion,
      setCurrQuestion,
      validateExamData,
      validate,
      examData,
      handleEditExam,
      handleDeleteExam,
      handleCancel
  } = useEditExam(id);

    const dispatch = useDispatch();
    const status = useSelector(state => state.api.status);
    const error = useSelector(state => state.teacher.error);
    const navigate = useNavigate();
    const subjectName = searchParams.get('subject');
    let editData = {};

    useEffect(() => {
        try{
            const fetchEditExamData = async() => {
                const config = {
                    method:'get',
                    url:'dashboard/Teachers/examDetail',
                    headers: { "access-token":getCurrUserData().token },
                    params:{id}
                }
                const res = await dispatch(fetchData(config));
                if(res?.payload?.statusCode === 401){
                  IsRemoveItem('userData');
                  IsSetItem('login',false);
                  navigate('/login')
                  return;
                }
                editData.subjectName = subjectName;
                editData.notes = ['hello'];
                editData.questions = res.payload?.data?.questions;
                dispatch(initiateExam(editData));
                console.log('editData', editData)
                const ansArr = editData.questions.reduce((acc,curr) => {
                  const ansIndex = curr.options.findIndex(option => option === curr.answer)
                  acc.push(ansIndex)
                  return acc;
                },[])
  
                // localStorage.setItem('ansIndex',JSON.stringify(ansArr));
                dispatch(initiateAnsIndex(ansArr))
            }
              fetchEditExamData();
              // console.log('reach ansArr')
              // const ansArr = examData.questions.reduce((acc,curr) => {
              //   const ansIndex = curr.options.findIndex(option => option === curr.answer)
              //   acc.push(ansIndex)
              //   return acc;
              // },[])

              // localStorage.setItem('ansIndex',JSON.stringify(ansArr));
              // dispatch(initiateAnsIndex(ansArr))

              // if(!JSON.parse(localStorage.getItem('ansIndex'))){
              //   dispatch(initiateAnsIndex(ansArr))
              // }else{
              //   dispatch(initiateAnsIndex(JSON.parse(localStorage.getItem('ansIndex'))))
              // }
          
              // console.log('ansArr', ansArr)

        }catch(error){
           console.log('error', error) 
        }

        return () => {
          IsRemoveItem('createExam');
          IsRemoveItem('ansIndex');
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
        dispatch(initiateExam(initiateConfig))
        dispatch(initiateAnsIndex([]));
        dispatch(initiateQuestions([]));
        }
    },[])

  return (
    <div className='flex flex-col items-center mt-[70px] overflow-hidden'>

      {
        status === 'loading' ?
          <div className='spinner'></div> :
            <>
            <p className='text-center mb-4 text-4xl'>Edit Exam</p>
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
                disabled={currQuestion !== 14}
                onClick={handleEditExam}
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${currQuestion !== 14 ? 'opacity-50 cursor-not-allowed':''}`}
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
    </div>
  )
}

export default EditExam;