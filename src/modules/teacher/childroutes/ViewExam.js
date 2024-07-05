import React, { useEffect } from 'react'
import { getCurrUserData} from '../../../Current User/currentUser';
import { fetchData } from '../../../redux-toolkit/slices/api';
import { useDispatch, useSelector } from 'react-redux';
import { initiateExam, loadViewExamData } from '../../../redux-toolkit/slices/teacher';
import Pagination from '../../../components/Pagination';
import { useNavigate } from 'react-router';

const ViewExam = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(state => state.api.status);
  const viewExam = useSelector(state => state.teacher.viewExam);
  const btn = {
    editBtn:'/teacher/edit-exam',
    deleteBtn:'delete',
  }

//   const initiateConfig = {
//     subjectName:'math',
//     questions:[
//         {
//             question:'question1',
//             answer:'ans1',
//             options:[
//                 'ans1',
//                 'ans2',
//                 'ans3',
//                 'ans4'
//             ]
//         }
//     ],
//     notes:['gffgdg']
// }
//   dispatch(initiateExam(initiateConfig));

  useEffect(() => {
    const fetchViewExamData = async() => {
      try{
        const config = {
          method:'get',
          url:'dashboard/Teachers/viewExam',
          headers: { "access-token":getCurrUserData().token }
      }
      const res = await dispatch(fetchData(config))
      console.log('res in viewExam', res);
      if(res?.payload?.statusCode === 401){
        localStorage.removeItem('userData');
        localStorage.setItem('login',false);
        navigate('/login')
        return;
      }
      dispatch(loadViewExamData(res.payload.data));
      }catch(error){
        console.log('error', error)
      }
    }
    fetchViewExamData();
  },[])

  const keys = ['subjectName','email'];

  return (
    <div className='h-[100vh] flex items-center justify-center bg-gray-500'>
        <div>
            {
                status === 'loading' ? 
                  <div className='spinner'></div> :
                        <Pagination data={viewExam} recodesPerPage={10} keys={keys} btn={btn}/>
            }
        </div>
    </div>
  )
}

export default ViewExam