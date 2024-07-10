import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getCurrUserData} from '../../../Current User/currentUser';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../redux-toolkit/slices/api';
import { loadCurrStudentDetail } from '../../../redux-toolkit/slices/teacher';
import CurrStudentDetail from '../../../components/CurrStudentDetail';

const ViewStudentDetail = () => {

    const [searchParams,setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currStudentDetail = useSelector(state => state.teacher.currStudentDetail);
    const status = useSelector(state => state.api.status);
    const id = searchParams.get('id');

    useEffect(() => {
        try{
            const fetchStudentDetail = async() => {
                const config = {
                    method:'get',
                    url:`dashboard/Teachers/viewStudentDetail`,
                    headers: { "access-token":getCurrUserData().token },
                    params:{id}
                }
                const res = await dispatch(fetchData(config));
                if(res?.payload?.statusCode === 401){
                    localStorage.removeItem('userData');
                    localStorage.setItem('login',false);
                    navigate('/login')
                    return;
                  }
                dispatch(loadCurrStudentDetail(res.payload.data[0]));
            }
            fetchStudentDetail();
        }catch(error){
            console.log('error', error)
        }
    },[])

    const handleBack = () => {
        navigate(-1);
    }

  return (
    <div className='h-[100vh] flex justify-center mt-[30px] text-black'>
        <div>
            {
                status === 'loading' ? 
                    <div className='spinner mt-[250px]'></div> 
                        :
                            <div>
                                <p className='text-center mb-4 text-4xl'>Student Detail</p>
                                <CurrStudentDetail currStudentDetail={currStudentDetail}/>
                                <button
                                onClick={handleBack}
                                className='mt-[30px] ml-[45%] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                                >Back</button>
                            </div>
            }
            
        </div>
    </div>
  )
}

export default ViewStudentDetail