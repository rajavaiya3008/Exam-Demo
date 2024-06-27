import React from 'react'
import InputField from '../../components/InputField'
import { useDispatch, useSelector } from 'react-redux'
import { handleError, handleSignupData } from '../../redux-toolkit/slices/user'
import DropDown from '../../components/DropDown'
import { fetchData } from '../../redux-toolkit/slices/api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { validateData } from '../../Validation/validation'

const SignUp = () => {

  const signupData = useSelector(state => state.user.signupData);
  console.log('signupData', signupData)

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
    const error = validateData(signupData,validate);
    if(Object.keys(error).length !== 0){
      dispatch(handleError(error));
      return;
    }
    const config = {
      method:'post',
      url:'users/SignUp',
      data:signupData
    }
    const res = await dispatch(fetchData(config))
    console.log('res', res);
    if(res.payload.statusCode === 500){
      toast.error('Email Already Exist Please Login');
      return;
    }
    toast.success('Signup Successful');
    navigate('/login');

  }


  return (
    <div>
      <h1>SignUp here</h1>

      <div>
        {
          signupField.map((field,i) => <InputField fieldData={field} key={i}/>)
        }
      </div>

      <DropDown dropDownOptions={dropDownOptions} name={'role'} updateData={handleSignupData}/>

      <button onClick={handleSignup}>
          {
            status === 'loading'? <span>Loading...</span> : <span>Sign Up</span>
          }
      </button>

    </div>
  )
}

export default SignUp