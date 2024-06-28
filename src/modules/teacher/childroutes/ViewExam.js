import React, { useEffect } from 'react'
import { token } from '../../../Current User/currentUser';
import { fetchData } from '../../../redux-toolkit/slices/api';
import { useDispatch, useSelector } from 'react-redux';
import { initiateExam, loadViewExamData } from '../../../redux-toolkit/slices/teacher';
import Pagination from '../../../components/Pagination';

const ViewExam = () => {

  const dispatch = useDispatch();
  const status = useSelector(state => state.api.status);
  const viewExam = useSelector(state => state.teacher.viewExam);
  const btn = {
    editBtn:'/teacher/edit-exam',
    deleteBtn:'delete',
  }

  const initiateConfig = {
    subjectName:'math',
    questions:[
        {
            question:'question1',
            answer:'ans1',
            options:[
                'ans1',
                'ans2',
                'ans3',
                'ans4'
            ]
        }
    ],
    notes:['gffgdg']
}
  dispatch(initiateExam(initiateConfig));

  useEffect(() => {
    const fetchViewExamData = async() => {
      try{
        const config = {
          method:'get',
          url:'dashboard/Teachers/viewExam',
          headers: { "access-token":`${token}` }
      }
      const res = await dispatch(fetchData(config))
      console.log('res in viewExam', res);
      dispatch(loadViewExamData(res.payload.data));
      }catch(error){
        console.log('error', error)
      }
    }
    fetchViewExamData();
  },[])

  const keys = ['subjectName','email'];


  return (
    <div>
      <div>View Exam</div>
      <div>
            {
                status === 'loading' ? 
                    <span>Loading...</span> :
                        <Pagination data={viewExam} recodesPerPage={10} keys={keys} viewPath={''} btn={btn}/>
            }
        </div>
    </div>
  )
}

export default ViewExam