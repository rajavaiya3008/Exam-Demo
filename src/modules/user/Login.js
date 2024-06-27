import React from 'react'
import InputField from '../../components/InputField'
import { useDispatch, useSelector } from 'react-redux'
import { axiosInstance } from '../../api/api'
import { fetchData } from '../../redux-toolkit/slices/api'
import { handleError, handleLoginData } from '../../redux-toolkit/slices/user'
import { validateData } from '../../Validation/validation'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'



const Login = () => {

  const loginData = useSelector(state => state.user.loginData);
  console.log('loginData', loginData);

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
    const error = validateData(loginData,validate)
    console.log('error', error)
    if(Object.keys(error).length !== 0){
      dispatch(handleError(error));
      return;
    }
    const config = {
      method:'post',
      url:'users/Login',
      data:loginData
    }
    const res = await dispatch(fetchData(config))
    console.log('res', res);
    if(res.payload.statusCode === 500){
      toast.error(res.payload.message);
      return;
    }
    toast.success('Login Successful');
    localStorage.setItem('userData',JSON.stringify(res.payload.data));
    navigate(`/${res.payload.data.role}`);

  }

  return (
    <div className='border border-black h-[100vh] w-[100vw] flex justify-center items-center'>

      <div className='border h-[40%] w-[30%] flex flex-col justify-center items-center gap-7'>

      
        <h1 className='text-lg'>Login Here</h1>

        <div className='border mb-5'>
          {
            loginField.map((field,i) => <InputField fieldData={field} key={i}/>)
          }
        </div>

        <button onClick={handleSubmit}>
          {
            status === 'loading'? <span>Loading...</span> : <span>Sign Up</span>
          }
        </button>

      </div>
    </div>
  )
}

export default Login