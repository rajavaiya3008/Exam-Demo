import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../../../redux-toolkit/slices/api';
import { getCurrUserData} from '../../../Current User/currentUser';
import { handleSearchField, loadAllStudentData } from '../../../redux-toolkit/slices/teacher';
import Pagination from '../../../shared/Pagination';
import { useNavigate } from 'react-router';
import InputField from '../../../shared/InputField';
import { handlePrevVisitedPage } from '../../../redux-toolkit/slices/user';
import { IsRemoveItem, IsSetItem } from '../../../utils/IsFunction';

const AllStudent = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const status = useSelector(state => state.api.status);
    const allStudentData = useSelector(state => state.teacher.allStudentData);
    const searchData = useSelector(state => state.teacher.searchField)
    const lastVisitedPage = useSelector(state => state.user.prevVisitedPage);

    useEffect(() => {
        const fetchAllStudentData = async() => {
            const config = {
                method:'get',
                url:'dashboard/Teachers',
                headers: { "access-token":getCurrUserData().token }
            }
            const res = await dispatch(fetchData(config))
            if(res?.payload?.statusCode === 401){
                IsRemoveItem('userData');
                IsSetItem('login',false);
                navigate('/login')
                return;
              }
            dispatch(loadAllStudentData(res?.payload?.data));
        }
        if(allStudentData.length === 0){
            dispatch(handlePrevVisitedPage(1));
            fetchAllStudentData();
        }
        return () => {
            dispatch(handleSearchField(''));
        }
    },[]);

    const keys = ['name','email','status'];

    const searchField = {
        type:'text',
        id:'name',
        name:'name',
        label:'Name or Email',
        data:searchData,
        updateData:handleSearchField,
        // error:error
    }

  return (
    <div className='flex items-center flex-col mt-[70px]'>
       {
        status !== 'loading' && 
        <div className='mb-[20px] text-white'>
          <InputField fieldData={searchField}/>
        </div>
        }
        <div className='overflow-hidden max-[900px]:w-[850px] max-[860px]:w-[800px] max-[800px]:w-[750px] max-[750px]:w-[700px] max-[700px]:w-[650px] max-[650px]:w-[600px] max-[590px]:w-[550px] max-[550px]:w-[500px] max-[500px]:w-[450px] max-[450px]:w-[400px] max-[400px]:w-[350px] max-[350px]:w-[310px] h-[100%] mb-[40px]'>
            {
                status === 'loading' ? 
                    <div className='spinner mt-[20px] mx-auto overflow-hidden'></div> :

                    <div>
                        <p className='text-center text-4xl mb-4'>All Students</p>
                        <Pagination data={allStudentData} recodesPerPage={10} keys={keys} viewPath={`/teacher/view-student-detail`} searchKey={['name','email','status']} searchVal={searchData.name} lastVisitedPage={lastVisitedPage}/>
                    </div>
            }
        </div>
    </div>
  )
}

export default AllStudent