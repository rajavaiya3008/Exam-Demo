import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleError, handleForgetPassword, initiateForgetPassword } from '../redux-toolkit/slices/user'
import InputField from './InputField'
import { fetchData } from '../redux-toolkit/slices/api'
import { validateData } from '../Validation/validation'
import { Navigate, useNavigate } from 'react-router'
import { getCurrUserData } from '../Current User/currentUser'
import { toastError, toastSuccess } from '../utils/toastFunction'
import { LOGIN_PAGE } from '../utils/constant'

const ForgetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(handleError({}));
    },[])
    const forgetPassword = useSelector(state => state.user.forgetPassword)
    const error = useSelector(state => state.user.error);
    const status = useSelector(state => state.api.status);
    const login = JSON.parse(localStorage.getItem('login'));
    const role = getCurrUserData().role;
    const fieldData = {
        type:'email',
        id:'email',
        name:'email',
        label:'Email',
        data:forgetPassword,
        updateData:handleForgetPassword,
        error:error
    }
    
    const validate = {
        email: [{required:true,message:'Please Enter Email'},{pattern:/^[a-zA-Z0-9]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,message:'Enter Valid Email or space is not allowed'}]
    }

    const sendMail = async() => {
        try{
            const error = validateData(forgetPassword,validate)
            if(Object.keys(error).length !== 0){
                dispatch(handleError(error));
                return;
            }
            
            const config = {
                method:'post',
                url:'users/ForgotPassword',
                data:forgetPassword
            }
            const res = await dispatch(fetchData(config));
            if(res.payload.statusCode === 500){
                toastError('Email not Found Please SignUp');
                return;
            }
            if(res.payload.statusCode === 400){
                toastError('White space is not consider')
                return;
            }
            navigate(LOGIN_PAGE)
            dispatch(initiateForgetPassword({}));
            toastSuccess('Mail send Successful Please Check Your Email');
        }catch(error){
            console.log('error', error)
        }
    }

    if(login){
        return <Navigate to={`/${role}/dashboard`}/>
    }
    
  return (
    <>
        {
            !login && 
            <div className='flex items-center flex-col mt-[70px]'>
                <p className='text-center mb-4 text-4xl'>Forget Password</p>
                <InputField fieldData={fieldData}/>
                <button 
                onClick={sendMail}
                disabled={status === 'loading'}
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 ${status === 'loading'?'opacity-50 cursor-not-allowed':''}`}
                >
                    {
                        status === 'loading' ? <span>Loading...</span> : <span>Submit</span>
                    }
                </button>
            </div>
        }
    </>
  )
}

export default ForgetPassword