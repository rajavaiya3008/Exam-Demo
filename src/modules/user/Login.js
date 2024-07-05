import React from 'react'
import InputField from '../../components/InputField'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useLoginData } from '../../form/hooks/useLoginData'


const Login = () => {

  const {loginField,handleSubmit,disable} = useLoginData();

  let status = useSelector(state => state.api.status);
  const login = localStorage.getItem('login');
  const Login = JSON.parse(login);

  return (
  
    <>
      {!Login && <div className='border border-black h-[100vh] w-[100vw] flex justify-center items-center'>

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
          disabled={disable}
          className='bg-[#7747ff] w-[270px] px-6 py-2 rounded text-white text-sm font-normal flex justify-center'>
            {
              status === 'loading'? <div className='spinner'></div> : <span>Login</span>
            }
          </button>

          <div>
            <p>Don't have an account yet? <Link to='/signup' className='text-[#7747ff]'>Sign Up</Link></p>
          </div>

        </div>
      </div>
      }
    </>
    
  )
}

export default Login