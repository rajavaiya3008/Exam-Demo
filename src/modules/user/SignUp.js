import React, { useEffect } from 'react'
import InputField from '../../shared/InputField'
import { useDispatch, useSelector } from 'react-redux'
import { handleError, handleSignupData } from '../../redux-toolkit/slices/user'
import DropDown from '../../shared/DropDown'
import { Link, Navigate} from 'react-router-dom'
import { useSignupData } from '../../form/hooks/useSignupData'
import { getCurrUserData } from '../../Current User/currentUser'

const SignUp = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleError({}));
  },[])

  const {signupField,handleSignup,disable} = useSignupData();

  const status = useSelector(state => state.api.status);
  const login = JSON.parse(localStorage.getItem('login'));
  const role = getCurrUserData().role;

  const dropDownOptions = ['student','teacher'];

  if(login){
    return <Navigate to={`/${role}/dashboard`}/>
  }

  return (

    <div className='w-[100vw] flex justify-center has-[660px]:mb-[50px]'>
        <div className='border border-black h-[550px] w-[320px] max-[360px]:w-[290px] mt-[70px] flex flex-col justify-center gap-[15px] mb-[10px] rounded-lg'>
            <h1 className='text-2xl text-center mt-[10px] font-semibold'>SignUp Here</h1>

            <div className='flex flex-col items-center'>
              {
                signupField.map((field,i) => <InputField fieldData={field} key={i}/>)
              }
            </div>

            <DropDown dropDownOptions={dropDownOptions} name={'role'} updateData={handleSignupData}/>

            <button 
            onClick={handleSignup}
            disabled={status === 'loading'}
            className={`bg-[#7747ff] w-[270px] mx-auto px-6 py-2 rounded text-white text-sm font-normal flex justify-center ${status === 'loading'?'opacity-50 cursor-not-allowed':''}`}>
                {
                  status === 'loading'? <span>Loading...</span> : <span>Sign Up</span>
                }
            </button>

            <div className='text-center'>
              <p>Do You have an Account? <Link to='/login' className='text-[#7747ff]'>Login</Link></p>
            </div>

        </div>
    </div>
    
  )
}

export default SignUp