import React, { useEffect } from 'react'
import InputField from '../../components/InputField'
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
      <div className='border border-black h-[100vh] w-[100vw] flex justify-center items-center'>

        <div className='border h-[400px] w-[350px] flex flex-col justify-center items-center gap-[20px] rounded-lg border-black'>

        
          <h1 className='text-2xl mt-[10px] font-semibold'>Login Here</h1>

          <div className='mb-[10px] relative gap-4'>
            {
              loginField.map((field,i) => <InputField fieldData={field} key={i}/>)
            }
            <div className='absolute bottom-[-25px] right-0'>
              <p><Link to='/forget-password' className='text-[#7747ff]'>forget password?</Link></p>
            </div>
          </div>


          <button 
          onClick={handleSubmit}
          disabled={status === 'loading'}
          className={`bg-[#7747ff] w-[270px] px-6 py-2 rounded text-white text-sm font-normal flex justify-center ${status === 'loading'?'opacity-50 cursor-not-allowed':''}`}>
            {
              status === 'loading'? <span>Loading...</span> : <span>Login</span>
            }
          </button>

          <div>
            <p>Don't have an account yet? <Link to='/signup' className='text-[#7747ff]'>Sign Up</Link></p>
          </div>

        </div>
      </div>
      
    </>
    
  )
}

export default Login