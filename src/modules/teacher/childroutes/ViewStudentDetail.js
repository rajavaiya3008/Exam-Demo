import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { token } from '../../../Current User/currentUser';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../redux-toolkit/slices/api';
import { loadCurrStudentDetail } from '../../../redux-toolkit/slices/teacher';
import CurrStudentDetail from '../../../components/CurrStudentDetail';

const ViewStudentDetail = () => {

    const [searchParams,setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const currStudentDetail = useSelector(state => state.teacher.currStudentDetail);
    const status = useSelector(state => state.api.status);
    const id = searchParams.get('id');
    console.log('id', id);

    useEffect(() => {
        try{
            const fetchStudentDetail = async() => {
                const config = {
                    method:'get',
                    url:`dashboard/Teachers/viewStudentDetail`,
                    headers: { "access-token":`${token}` },
                    params:{id}
                }
                const res = await dispatch(fetchData(config));
                console.log('response on view student detail', res);
                dispatch(loadCurrStudentDetail(res.payload.data[0]));
            }
            fetchStudentDetail();
        }catch(error){
            console.log('error', error)
        }
    },[])

  return (
    <div className='h-[100vh] flex items-center justify-center bg-gray-500'>
        <div>
            {
                status === 'loading' ? 
                    <div className='spinner'></div> 
                        :<CurrStudentDetail currStudentDetail={currStudentDetail}/>
            }
        </div>
    </div>
  )
}

export default ViewStudentDetail