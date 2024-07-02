import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleError, handleResetPassword, initiateResetPassword } from '../redux-toolkit/slices/user';
import InputField from './InputField';
import { token } from '../Current User/currentUser';
import { fetchData } from '../redux-toolkit/slices/api';
import { validateData } from '../Validation/validation';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { currUserRole } from '../Current User/currentUser';

const ResetPassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const resetPassword = useSelector(state => state.user.resetPassword);
    const error = useSelector(state => state.user.error);

    const ResetPasswordFields = [
        {
            type:'text',
            id:'oldPassword',
            name:'oldPassword',
            label:'Old Password:',
            data:resetPassword,
            updateData:handleResetPassword,
            error:error
        },
        {
            type:'text',
            id:'Password',
            name:'Password',
            label:'Password:',
            data:resetPassword,
            updateData:handleResetPassword,
            error:error
        },
        {
            type:'text',
            id:'ConfirmPassword',
            name:'ConfirmPassword',
            label:'Confirm Password:',
            data:resetPassword,
            updateData:handleResetPassword,
            error:error
        },
    ]

    const validate = {
        oldPassword:[{required:true,message:'Please Enter Password'},{length:6,message:'Password Must be 6 char'}],
        Password:[{required:true,message:'Please Enter Password'},{length:6,message:'Password Must be 6 char'}],
        ConfirmPassword:[{required:true,message:'Please Enter Password'},{length:6,message:'Password Must be 6 char'},{match:true,comKey:resetPassword.Password}],
      }

    const handleReset = async() => {

        try{
            const error = validateData(resetPassword,validate)
            console.log('error', error)
            if(Object.keys(error).length !== 0){
                dispatch(handleError(error));
                return;
            }
            const config = {
                method:'post',
                url:'users/ResetPassword',
                data:resetPassword,
                headers: { "access-token":`${token}` }
            }
            const res = await dispatch(fetchData(config));
            console.log('res in reset password', res);
            if(res.payload.statusCode !== 200){
                toast.error('Please check old password');
                return;
            }
            toast.success('Password Reset Successfully');
            dispatch(initiateResetPassword());
            navigate(`/${currUserRole}`);
        }catch(error){
            console.log('error', error)
        }
    }

    const handleCancel = () => {
        dispatch(initiateResetPassword());
        navigate(`/${currUserRole}`);
    }

  return (
    <div className='h-[100vh] flex items-center justify-center flex-col'>
        {
            ResetPasswordFields.map((field,i) => <InputField fieldData={field} key={i}/>)
        }

        <div>
            <button 
            onClick={handleReset}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
            >Reset</button>
            <button
            onClick={handleCancel}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 ml-2"
            >Cancel</button>
        </div>
        
    </div>
  )
}

export default ResetPassword