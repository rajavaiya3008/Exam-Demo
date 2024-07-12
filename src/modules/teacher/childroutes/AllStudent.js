import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../../../redux-toolkit/slices/api';
import { getCurrUserData} from '../../../Current User/currentUser';
import { handleSearchField, loadAllStudentData } from '../../../redux-toolkit/slices/teacher';
import Pagination from '../../../components/Pagination';
import { useNavigate } from 'react-router';
import InputField from '../../../components/InputField';
import { handlePrevVisitedPage } from '../../../redux-toolkit/slices/user';

const AllStudent = () => {

    const status = useSelector(state => state.api.status);
    const allStudentData = useSelector(state => state.teacher.allStudentData);
    const searchData = useSelector(state => state.teacher.searchField)
    const lastVisitedPage = useSelector(state => state.user.prevVisitedPage);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllStudentData = async() => {
            const config = {
                method:'get',
                url:'dashboard/Teachers',
                headers: { "access-token":getCurrUserData().token }
            }
            const res = await dispatch(fetchData(config))
            if(res?.payload?.statusCode === 401){
                localStorage.removeItem('userData');
                localStorage.setItem('login',false);
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
    <div className='h-[100vh] flex items-center flex-col mt-[30px]'>
       {
        status !== 'loading' && 
        <div className='mb-[20px] text-white'>
          <InputField fieldData={searchField}/>
        </div>
        }
        <div className='table-container'>
            {
                status === 'loading' ? 
                    <div className='spinner mt-[250px]'></div> :

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