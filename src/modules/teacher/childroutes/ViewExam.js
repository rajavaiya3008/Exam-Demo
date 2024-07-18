import React, { useEffect } from 'react'
import { getCurrUserData} from '../../../Current User/currentUser';
import { fetchData } from '../../../redux-toolkit/slices/api';
import { useDispatch, useSelector } from 'react-redux';
import { initiateExam, loadViewExamData } from '../../../redux-toolkit/slices/teacher';
import Pagination from '../../../shared/Pagination';
import { useNavigate } from 'react-router';
import { handlePrevVisitedPage } from '../../../redux-toolkit/slices/user';
import { IsRemoveItem, IsSetItem } from '../../../utils/IsFunction';
import { LOGIN_PAGE } from '../../../utils/constant';

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
      if(res?.payload?.statusCode === 401){
        IsRemoveItem('userData');
        IsSetItem('login',false);
        navigate(LOGIN_PAGE)
        return;
      }
      dispatch(loadViewExamData(res.payload.data));
      }catch(error){
        console.log('error', error)
      }
    }
    if(viewExam.length === 0){
      fetchViewExamData();
    }
    dispatch(handlePrevVisitedPage(1))
  },[])

  const keys = ['subjectName','email'];

  return (
    <div className='flex justify-center mt-[70px]'>
        <div className='overflow-hidden max-[900px]:w-[850px] max-[860px]:w-[800px] max-[800px]:w-[750px] max-[750px]:w-[700px] max-[700px]:w-[650px] max-[650px]:w-[600px] max-[590px]:w-[550px] max-[550px]:w-[500px] max-[500px]:w-[450px] max-[450px]:w-[400px] max-[400px]:w-[350px] max-[350px]:w-[310px] h-[100%] mb-[40px]'>
            {
                status === 'loading' ? 
                  <div className='spinner mt-[20px] mx-auto'></div> :
                    <div>
                      <p className='text-center text-4xl mb-4'>View Exams</p>
                      <Pagination data={viewExam} recodesPerPage={10} keys={keys} btn={btn}/>
                    </div>
            }
        </div>
    </div>
  )
}

export default ViewExam