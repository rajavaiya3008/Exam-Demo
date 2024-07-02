import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleError, handleForgetPassword } from '../redux-toolkit/slices/user'
import InputField from './InputField'
import { fetchData } from '../redux-toolkit/slices/api'
import { validateData } from '../Validation/validation'
import { toast } from 'react-toastify'

const ForgetPassword = () => {
    const dispatch = useDispatch();
    const forgetPassword = useSelector(state => state.user.forgetPassword)
    const error = useSelector(state => state.user.error);
    const fieldData = {
        type:'text',
        id:'email',
        name:'email',
        label:'Email:',
        data:forgetPassword,
        updateData:handleForgetPassword,
        error:error
      }
    
    const validate = {
        email: [{required:true,message:'Please Enter Email'},{pattern:'^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$',message:'Enter Valid Email'}]
    }

    const sendMail = async() => {
        try{
            const error = validateData(forgetPassword,validate)
            console.log('error', error)
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
            console.log('res in forget password', res);
            if(res.payload.statusCode === 500){
                toast.error('Email not Found Please SignUp');
                return;
            }
            toast.success('Mail send Successful Please Check Your Email');
        }catch(error){
            console.log('error', error)
        }
    }
    
  return (
    <div className='flex justify-center items-center flex-col h-[100vh]'>
        <InputField fieldData={fieldData}/>
        <button 
        onClick={sendMail}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
        >Verify</button>
    </div>
  )
}

export default ForgetPassword