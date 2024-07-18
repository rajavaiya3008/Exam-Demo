import React, { useEffect } from 'react'
import InputField from '../../shared/InputField'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { useLoginData } from '../../form/hooks/useLoginData'
import { handleError } from '../../redux-toolkit/slices/user'
import { getCurrUserData } from '../../Current User/currentUser'


const Login = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(handleError({}));
  },[])

  const {loginField,handleSubmit,disable} = useLoginData();

  let status = useSelector(state => state.api.status);
  const role = getCurrUserData().role;
  const Login = JSON.parse(localStorage.getItem('login'));

  if(Login){
    return <Navigate to={`/${role}/dashboard`}/>
  }


  return (
  
    <>
      <div className='w-[100vw] flex justify-center '>

        <div className='border h-[400px] w-[320px] max-[360px]:w-[290px] mt-[70px] flex flex-col justify-center gap-[20px] mb-[10px] rounded-lg border-black login-container'>

        
          <h1 className='text-2xl mt-[10px] font-semibold text-center'>Login Here</h1>

          <div className='mb-[10px] relative gap-4 flex flex-col items-center'>
            {
              loginField.map((field,i) => <InputField fieldData={field} key={i}/>)
            }
            <div className='absolute bottom-[-25px] right-[45px]'>
              <p><Link to='/forget-password' className='text-[#7747ff]'>forget password?</Link></p>
            </div>
          </div>


          <button 
          onClick={handleSubmit}
          disabled={status === 'loading'}
          className={`bg-[#7747ff] w-[270px] mx-auto px-6 py-2 rounded text-white text-sm font-normal flex justify-center ${status === 'loading'?'opacity-50 cursor-not-allowed':''}`}>
            {
              status === 'loading'? <span>Loading...</span> : <span>Login</span>
            }
          </button>

          <div className='text-center'>
            <p>Don't have an account yet? <Link to='/signup' className='text-[#7747ff]'>Sign Up</Link></p>
          </div>

        </div>
      </div>
      
    </>
    
  )
}

export default Login