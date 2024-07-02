import React, { useState } from 'react'
import InputField from '../../components/InputField'
import { useDispatch, useSelector } from 'react-redux'
import { axiosInstance } from '../../api/api'
import { fetchData } from '../../redux-toolkit/slices/api'
import { handleError, handleLogin, handleLoginData } from '../../redux-toolkit/slices/user'
import { validateData } from '../../Validation/validation'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { getCurrUserData } from '../../Current User/currentUser'



const Login = () => {

  const [disable,setDisable] = useState(false);

  const loginData = useSelector(state => state.user.loginData);
  console.log('loginData', loginData);

  const login = useSelector(state => state.user.login);

  const error = useSelector(state => state.user.error);
  console.log('error', error);

  const loginField = [
    {
      type:'email',
      id:'email',
      name:'email',
      label:'Enter Email:',
      data:loginData,
      error:error,
      updateData:handleLoginData
    },
    {
      type:'password',
      id:'password',
      name:'password',
      label:'Enter Password:',
      data:loginData,
      error:error,
      updateData:handleLoginData
    }
  ]

  const validate = {
    email: [{required:true,message:'Please Enter Email'},{pattern:'^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$',message:'Enter Valid Email'}],
    password:[{required:true,message:'Please Enter Password'},{length:6,message:'Password Must be 6 char'}],
  }


  let status = useSelector(state => state.api.status);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  

  const handleSubmit = async() => {
    try{
      const error = validateData(loginData,validate)
      console.log('error', error)
      if(Object.keys(error).length !== 0){
        dispatch(handleError(error));
        return;
      }
      setDisable(true);
      const config = {
        method:'post',
        url:'users/Login',
        data:loginData
      }
      const res = await dispatch(fetchData(config))
      console.log('res', res);
      if(res.payload.statusCode === 500){
        toast.error(res.payload.message);
        setDisable(false);
        return;
      }
      toast.success('Login Successful');
      localStorage.setItem('userData',JSON.stringify(res.payload.data));
      // getCurrUserData(res.payload.data.token,res.payload.data.role);
      dispatch(handleLogin(true));
      navigate(`/${res.payload.data.role}`,{replace:true});
    }catch(error){
      setDisable(false);
      console.log('error', error);
    }
  }



  return (
    <>
      {!login ?
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
      </div> : ""
          }
    
    </>
    
  )
}

export default Login