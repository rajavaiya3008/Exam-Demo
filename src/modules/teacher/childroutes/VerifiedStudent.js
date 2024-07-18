import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../../../redux-toolkit/slices/api';
import { getCurrUserData} from '../../../Current User/currentUser';
import Pagination from '../../../shared/Pagination';
import { handleSearchField, loadVerifiedStudentData } from '../../../redux-toolkit/slices/teacher';
import { useNavigate } from 'react-router';
import InputField from '../../../shared/InputField';
import { IsRemoveItem, IsSetItem } from '../../../utils/IsFunction';

const VerifiedStudent = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const status = useSelector(state => state.api.status);
    const verifiedStudentData = useSelector(state => state.teacher.verifiedStudentData);
    const searchData = useSelector(state => state.teacher.searchField)
    const lastVisitedPage = useSelector(state => state.user.prevVisitedPage);

    useEffect(() => {
        const fetchAllStudentData = async() => {
            const config = {
                method:'get',
                url:'dashboard/Teachers/StudentForExam',
                headers: { "access-token":getCurrUserData().token }
            }
            const res = await dispatch(fetchData(config))
            if(res?.payload?.statusCode === 401){
                IsRemoveItem('userData');
                IsSetItem('login',false);
                navigate('/login')
                return;
              }
            dispatch(loadVerifiedStudentData(res?.payload?.data));

        }
        if(verifiedStudentData.length === 0){
            fetchAllStudentData();
        }
    },[]);

    const keys = ['name','email','status'];

    const searchField = {
        type:'text',
        id:'name',
        name:'name',
        label:'Name of Email',
        data:searchData,
        updateData:handleSearchField,
        // error:error
    }

  return (
    <div className='h-[100vh] flex items-center flex-col mt-[70px]'>
        {
            status !== 'loading' && 
            <div className='mb-[20px] text-white'>
            <InputField fieldData={searchField}/>
            </div>
        }
        <div>
            {
                status === 'loading' ? 
                    <div className='spinner mt-[250px]'></div> :

                        <div>
                            <p className='text-center text-4xl mb-4'>Verified Students</p>
                            <Pagination data={verifiedStudentData} recodesPerPage={10} keys={keys} viewPath={`/teacher/view-student-detail`} searchKey={['name','email','status']} searchVal={searchData.name} lastVisitedPage={lastVisitedPage}/>
                        </div>
                        
            }
        </div>
    </div>
  )
}

export default VerifiedStudent;