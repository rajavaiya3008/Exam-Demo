import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleError, handleNewPassword } from '../redux-toolkit/slices/user';
import InputField from './InputField';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { fetchData } from '../redux-toolkit/slices/api';
import { validateData } from '../Validation/validation';
import { getCurrUserData } from '../Current User/currentUser';
import { IsGetItem } from '../utils/IsFunction';
import { toastSuccess } from '../utils/toastFunction';
import { LOGIN_PAGE } from '../utils/constant';

const NewPassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const newPassword = useSelector(state => state.user.newPassword);
    const error = useSelector(state => state.user.error);
    const status = useSelector(state => state.api.status);
    const [searchParams,setSearchParams] = useSearchParams();
    const token = searchParams.get('token');
    const login = IsGetItem('login')
    const role = getCurrUserData().role;

    const createNewPasswordField = [
        {
            type:'password',
            id:'Password',
            name:'Password',
            label:'Password:',
            data:newPassword,
            updateData:handleNewPassword,
            error:error
        },
        {
            type:'password',
            id:'ConfirmPassword',
            name:'ConfirmPassword',
            label:'Confirm Password:',
            data:newPassword,
            updateData:handleNewPassword,
            error:error
        },
    ]

    const validate = {
        Password:[{required:true,message:'Please Enter Password'},{length:6,message:'Password Must be 6 char'},{pattern:/^[a-zA-Z0-9!@#$%^&*]{6,16}$/,message:'Enter Valid Password'}],
        ConfirmPassword:[{required:true,message:'Please Enter Password'},{length:6,message:'Password Must be 6 char'},{match:true,comKey:newPassword.Password}],
    }

    const handleChangePassword = async() => {
        try{
            const error = validateData(newPassword,validate)
            if(Object.keys(error).length !== 0){
                dispatch(handleError(error));
                return;
            }
            const config = {
                method:'post',
                url:'users/ForgotPassword/Verify',
                data:newPassword,
                params:{token}
            }
            const res = await dispatch(fetchData(config));
            toastSuccess('Password Change Successfully');
            navigate(LOGIN_PAGE);
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
            <p className='text-center text-4xl mb-4'>New Password</p>
            {
                createNewPasswordField.map((field,i) => <InputField fieldData={field} key={i}/>)
            }
            <button 
            disabled={status === 'loading'}
            onClick={handleChangePassword}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 ${status === 'loading' ? 'opacity-50 cursor-not-allowed':''}`}
            >Submit</button>
        </div>
        }
    </>
    
  )
}

export default NewPassword