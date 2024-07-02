import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleError, handleNewPassword } from '../redux-toolkit/slices/user';
import InputField from './InputField';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchData } from '../redux-toolkit/slices/api';
import { toast } from 'react-toastify';
import { validateData } from '../Validation/validation';

const NewPassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const newPassword = useSelector(state => state.user.newPassword);
    const error = useSelector(state => state.user.error);
    const [searchParams,setSearchParams] = useSearchParams();
    const token = searchParams.get('token');

    const createNewPasswordField = [
        {
            type:'text',
            id:'Password',
            name:'Password',
            label:'Password:',
            data:newPassword,
            updateData:handleNewPassword,
            error:error
        },
        {
            type:'text',
            id:'ConfirmPassword',
            name:'ConfirmPassword',
            label:'Confirm Password:',
            data:newPassword,
            updateData:handleNewPassword,
            error:error
        },
    ]

    const validate = {
        Password:[{required:true,message:'Please Enter Password'},{length:6,message:'Password Must be 6 char'}],
        ConfirmPassword:[{required:true,message:'Please Enter Password'},{length:6,message:'Password Must be 6 char'},{match:true,comKey:newPassword.Password}],
    }

    const handleChangePassword = async() => {
        try{
            const error = validateData(newPassword,validate)
            console.log('error', error)
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
            console.log('res in new password', res);
            toast.success('Password Change Successfully');
            navigate('/login');
        }catch(error){
            console.log('error', error)
        }
    }

  return (
    <div className='flex justify-center items-center flex-col h-[100vh]'>
        {
            createNewPasswordField.map((field,i) => <InputField fieldData={field} key={i}/>)
        }
        <button 
        onClick={handleChangePassword}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
        >Change Password</button>
    </div>
  )
}

export default NewPassword