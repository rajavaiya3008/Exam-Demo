import React, { useEffect } from 'react'
import InputField from '../../components/InputField'
import { useDispatch, useSelector } from 'react-redux'
import { handleError, handleSignupData } from '../../redux-toolkit/slices/user'
import DropDown from '../../components/DropDown'
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

    <div className='border border-black h-[100vh] w-[100vw] flex justify-center items-center'>
        <div className='border h-[550px] w-[350px] flex flex-col justify-center items-center gap-[15px] rounded-lg border-black'>
            <h1 className='text-2xl mt-[10px] font-semibold'>SignUp Here</h1>

            <div>
              {
                signupField.map((field,i) => <InputField fieldData={field} key={i}/>)
              }
            </div>

            <DropDown dropDownOptions={dropDownOptions} name={'role'} updateData={handleSignupData}/>

            <button 
            onClick={handleSignup}
            disabled={status === 'loading'}
            className={`bg-[#7747ff] w-[270px] px-6 py-2 rounded text-white text-sm font-normal flex justify-center ${status === 'loading'?'opacity-50 cursor-not-allowed':''}`}>
                {
                  status === 'loading'? <span>Loading...</span> : <span>Sign Up</span>
                }
            </button>

            <div>
              <p>Do You have an Account? <Link to='/login' className='text-[#7747ff]'>Login</Link></p>
            </div>

        </div>
    </div>
    
  )
}

export default SignUp