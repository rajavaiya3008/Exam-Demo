import React, { useState } from 'react'
import InputField from '../../components/InputField'
import { useDispatch, useSelector } from 'react-redux'
import { handleError, handleSignupData } from '../../redux-toolkit/slices/user'
import DropDown from '../../components/DropDown'
import { fetchData } from '../../redux-toolkit/slices/api'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { validateData } from '../../Validation/validation'

const SignUp = () => {

  const signupData = useSelector(state => state.user.signupData);
  console.log('signupData', signupData)
  const [disable,setDisable] = useState(false);

  const error = useSelector(state => state.user.error);

  const signupField = [
    {
      type:'text',
      id:'name',
      name:'name',
      label:'Enter Name:',
      data:signupData,
      error:error,
      updateData:handleSignupData
    },
    {
      type:'email',
      id:'email',
      name:'email',
      label:'Enter Email:',
      data:signupData,
      error:error,
      updateData:handleSignupData
    },
    {
      type:'password',
      id:'password',
      name:'password',
      label:'Enter Password:',
      data:signupData,
      error:error,
      updateData:handleSignupData
    }
  ]

  const validate = {
    name:[{required:true,message:'Please Enter Name'},{length:3,message:'username Must be 3 char'}],
    email: [{required:true,message:'Please Enter Email'},{pattern:'^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$',message:'Enter Valid Email'}],
    password:[{required:true,message:'Please Enter Password'},{length:6,message:'Password Must be 6 char'}],

  }

  const dropDownOptions = ['student','teacher'];

  const navigate = useNavigate();


  const status = useSelector(state => state.api.status);


  const dispatch = useDispatch();

  const handleSignup = async() => {
    try{
      const error = validateData(signupData,validate);
      if(Object.keys(error).length !== 0){
        dispatch(handleError(error));
        return;
      }
      setDisable(!disable);
      const config = {
        method:'post',
        url:'users/SignUp',
        data:signupData
      }
      const res = await dispatch(fetchData(config))
      console.log('res', res);
      if(res?.payload?.statusCode !== 200){
        toast.error('Email Already Exist Please Login');
        return;
      }
      toast.success('Signup Successful');
      navigate('/login',{replace:true});
    }catch(error){
      setDisable(false);
      console.log('error', error)
    }
    

  }


  return (

    <div className='border border-black h-[100vh] w-[100vw] flex justify-center items-center'>
        <div className='border h-[450px] w-[350px] flex flex-col justify-center items-center gap-[15px] rounded-lg border-black'>
            <h1 className='text-2xl mt-[10px] font-semibold'>SignUp here</h1>

            <div>
              {
                signupField.map((field,i) => <InputField fieldData={field} key={i}/>)
              }
            </div>

            <DropDown dropDownOptions={dropDownOptions} name={'Role'} updateData={handleSignupData}/>

            <button 
            onClick={handleSignup}
            disabled={disable}
            className='bg-[#7747ff] w-[270px] px-6 py-2 rounded text-white text-sm font-normal flex justify-center'>
                {
                  status === 'loading'? <div className='spinner'></div> : <span>Sign Up</span>
                }
            </button>

            <div>
              <p>Do You have an account? <Link to='/login' className='text-[#7747ff]'>Login</Link></p>
            </div>

        </div>
    </div>
    
  )
}

export default SignUp